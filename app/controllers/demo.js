const express = require("express");
const Demo = require("../models/demo");
const mailSender = require("../utils/mailSender");
const request = require("request");
const axios = require("axios");

const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

module.exports = function (app) {
  const apiRoutes = express.Router();

  apiRoutes.post("/CreateDemo", async (req, res) => {
    try {
      const { name, company, email, phone, Date, time } = req.body;
      console.log(req.body);
      const newDemo = await Demo.create({
        name,
        company,
        email,
        phone,
        Date,
        time,
      });

      await mailSender(
        email,
        "Hello from Nodemailer",
        "User Register Successful."
      );

      console.log("New demo created:", newDemo.toJSON());
      res.status(201).json(newDemo);
    } catch (error) {
      console.error("Error creating demo:", error);
      res.status(400).json({ message: error.message });
    }
  });

  // apiRoutes.post("/CreateDemo", async (req, res) => {
  //   try {
  //     const {
  //       name,
  //       company,
  //       email,
  //       countryName,
  //       countryCode,
  //       phone,
  //       Date,
  //       time,
  //     } = req.body;
  //     const newDemo = new Demo({
  //       name,
  //       company,
  //       email,
  //       countryName,
  //       countryCode,
  //       phone,
  //       Date,
  //       time,
  //     });
  //     const savedDemo = await newDemo.save();
  //     console.log(savedDemo);

  //     mailSender(email, "Hello from Nodemailer", "User Register Successful.");
  //     res.status(201).json(savedDemo);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // });

  apiRoutes.get("/countries", async (req, res) => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data.map((country) => ({
        flag: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
        dial_code:
          country.idd.root +
          (country.idd.suffixes ? country.idd.suffixes[0] : ""),
      }));
      console.log("Fetched countries:", countries);
      res.json(countries);
    } catch (error) {
      console.error("Error fetching country data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching country data" });
    }
  });

  // apiRoutes.get("/countries", async (req, res) => {
  //   await axios
  //     .get("https://restcountries.com/v3.1/all")
  //     .then((response) => {
  //       const countries = response.data.map((country) => ({
  //         name: country.name.common,
  //         dial_code:
  //           country.idd.root +
  //           (country.idd.suffixes ? country.idd.suffixes[0] : ""),
  //         flag: country.flags.png,
  //       }));
  //       console.log(countries);

  //       res.json(countries);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching countries:", error);
  //       res
  //         .status(500)
  //         .json({ error: "An error occurred while fetching country data" });
  //     });
  // });

  apiRoutes.get("/contriesName", async (req, res) => {
    await axios
      .get("https://country.io/names.json")
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  apiRoutes.get("/countries23", async (req, res) => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data.map(async (country) => {
        const flagUrl = `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;
        const flagBase64 = await getBase64FromUrl(flagUrl);
        return {
          flag: flagBase64,
          dial_code:
            country.idd.root +
            (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        };
      });
      const countriesWithData = await Promise.all(countries);
      console.log("Fetched countries:", countriesWithData);
      res.json(countriesWithData);
    } catch (error) {
      console.error("Error fetching country data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching country data" });
    }
  });

  async function getBase64FromUrl(url) {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });
      const base64 = Buffer.from(response.data, "binary").toString("base64");
      return `data:image/png;base64,${base64}`;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  }

  app.use("/", apiRoutes);
};
