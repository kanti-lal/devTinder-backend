const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

// Schedule a cron job to run every day at 08:00
cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const startOfYesterday = startOfDay(yesterday);
    const endOfYesterday = endOfDay(yesterday);

    const pendingRequest = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: startOfYesterday,
        $lte: endOfYesterday,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequest.map((req) => req.toUserId.emailId)),
    ];
    console.log(listOfEmails);

    for (const email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email,
          "There are so many connection requests pending for you. please login to DevTinder and check them out."
        );
        console.log("🚀 ~ cron.schedule ~ res:", res);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching connection requests:", error);
  }
});
