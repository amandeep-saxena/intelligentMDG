const express = require("express");
const FormData = require("../models/partner");
const mailer = require("../utils/mailSender");

module.exports = function (app) {
  const apiRoutes = express.Router();

  apiRoutes.post("/submit", async (req, res) => {
    try {
      console.log(req.body);
      const formData = await FormData.create(req.body);
      const attachmentPath = "./image/w5zidhsb2bh4f3qnlwke.png";
      const emailSubject = "Thank you for your message!";

      const emailHtml = `
          <p>Hi ${formData.firstName},</p>
          <p>Thank you for reaching out. We received your message:</p>
          <ul>
              <li><strong>First Name:</strong> ${formData.firstName}</li>
              <li><strong>Last Name:</strong> ${formData.lastName}</li>
              <li><strong>Email:</strong> ${formData.email}</li>
              <li><strong>Country:</strong> ${formData.country}</li>
              <li><strong>Phone:</strong> ${formData.phone}</li>
              <li><strong>Company:</strong> ${formData.company}</li>
              <li><strong>WritingAbout:</strong> ${formData.writingAbout}</li>
         </ul>
          <p>We will get back to you shortly.</p>
          <src> </src>
          <p>Best regards,</p>
      `;

      mailer(formData.email, emailSubject, emailHtml, attachmentPath);
      res
        .status(201)
        .json({ response: formData, message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error submitting form:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the form" });
    }
  });

  app.use("/", apiRoutes);
};
