
const nodemailer = require("nodemailer");
const smtp = require("../config/main");

let smtpAuth = {
  user: smtp.smtpuser,
  pass: smtp.smtppass,
};

let smtpConfig = {
  host: smtp.smtphost,
  port: smtp.smtpport,
  secure: false,
  auth: smtpAuth,
};

let transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

function mailer(email, subject, message) {
  transporter.sendMail(
    {
      from: {
        name: "intelligentMDG",
        address: "partner.alliances@Neuvays.com",
      },
      to: email,
      subject: subject,
      html: message,
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
}

module.exports = mailer;

