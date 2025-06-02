const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("Please SignUp");
  }
  if(!subject || !message) {
    res.status(400);
    throw new Error("Subject/Message not provided");
  }
  const to=process.env.EMAIL_USER;
  const from=process.env.EMAIL_USER;
  const rply=user.email;
  try {
    await sendEmail(subject, message, to, from, rply);
    res.status(200).json({success: true, message: "Sent Successfully"});
  } catch (error) {
    res.status(500);
    throw new Error("Please try again");
  }
});
module.exports = {
  contactUs,
};
