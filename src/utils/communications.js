const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  },
});

exports.sendMail = (to, subject, text, html) => {
  transporter.sendMail({
    to,
    subject,
    text,
    html,
    from: process.env.GOOGLE_USER,
  });
};
