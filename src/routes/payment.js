const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorPayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const Razorpay = require("razorpay");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;

    const { firstName, lastName, emailId } = req.user;

    var options = {
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    };
    const order = await razorPayInstance.orders.create(options);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Error creating payment order:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers("X-Razorpay-Signature");
    console.log("🚀 ~ webhookSignature:", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    const paymentDetails = req.body.payload.payment.entity;

    // update my payment status in the database
    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findById(payment.userId);
    if (paymentDetails.status === "captured") {
      user.isPremium = true;
      user.membershipType = paymentDetails.notes.membershipType;
      await user.save();
    }

    console.log("🚀 ~ paymentRouter.post ~ payment:", paymentDetails);

    // if (req.body.event === "payment.captured") {
    // }

    // if (req.body.event === "payment.failed") {
    // }

    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (error) {
    console.error("Error in payment webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = paymentRouter;
