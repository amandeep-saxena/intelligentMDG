const express = require("express");
const FormData = require("../models/partner");
const mailer = require("../utils/mailSender")

module.exports = function (app) {
  const apiRoutes = express.Router();

  apiRoutes.post("/submit", async (req, res) => {
    try {
      console.log(req.body);
      const formData = await FormData.create(req.body);

      mailer(
        formData.email,
        "Form Submission",
        `<p>Form data submitted:</p>
        <p>${JSON.stringify(formData)}</p>`
      );

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
