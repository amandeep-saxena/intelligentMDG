const express = require("express");
const ContactUs = require("../models/contact");
const smtp = require("../config/main");
const nodemailer = require("nodemailer");

const path = require("path");
// smtpAuth = {
//   user: smtp.smtpuser,
//   pass: smtp.smtppass,
// };
// let smtpConfig = {
//   host: smtp.smtphost,
//   port: smtp.smtpport,
//   secure: false,
//   auth: smtpAuth,
// };

// let transporter = nodemailer.createTransport(smtpConfig);

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// function sendMail(transporter, email, subject, message) {
//   // console.log(email, subject, message)
//   transporter.sendMail({
//     from: {
//       name: "Rezzumy",
//       address: "support@timesofpeople.com",
//     },
//     to: email,
//     subject: `${subject}`,
//     html: `${message}`,
//   });
// }

let smtpAuth = {
  user: smtp.smtpuser,
  pass: smtp.smtppass,
};
let smtpConfig = {
  host: smtp.smtphost,
  port: smtp.smtpport,
  secure: false,
  auth: smtpAuth,
  //auth:cram_md5
};

let transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

function mailer(transporter, email, subject, message) {
  // console.log(email, subject, message)
  transporter.sendMail({
    from: {
      name: "Rezzumy",
      address: "support@timesofpeople.com",
    },
    to: email,
    subject: `${subject}`,
    html: `${message}`,
  });
}


module.exports = function (app) {
  const apiRoutes = express.Router();

  apiRoutes.post("/contactUs", async (req, res) => {
    try {
      console.log("Request body:", req.body);

      const newContact = new ContactUs(req.body);
      const savedContact = await newContact.save();

   
      const email = req.body.emailId;
      const subject = "New Contact Form Submission";
      const message = `
        <p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.emailId}</p>
        <p>Phone Number: ${req.body.phoneNumber}</p>
        <p>Message: ${req.body.messages}</p>
      `;

  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        mailer(transporter, email, subject, message);
      } else {
        console.log("Invalid email address:", req.body.emailId);
      }

      res.status(201).json(savedContact);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }

  });

  app.use("/", apiRoutes);
};
