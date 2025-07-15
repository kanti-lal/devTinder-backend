const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Handle socket events here

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = getSecretRoomId(userId, targetUserId);
      console.log(`${firstName}Joining Room : ${room}`);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        //   save message to database here
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " + text);

          // TODO: Check if userId & targetedUserId are  friends

          const friends = await ConnectionRequest.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                fromUserId: targetUserId,
                toUserId: userId,
                status: "accepted",
              },
            ],
          });

          if (!friends) {
            socket.emit("error", {
              message: "You are not friends with this user",
            });
            return;
          }

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();

          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected with socket id:", socket.id);
    });
  });
};

module.exports = initializeSocket;
