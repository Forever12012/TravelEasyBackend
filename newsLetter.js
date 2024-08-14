const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
  })
);

app.post("/newsletter", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const msg = {
    to: email,
    from: "tusharharinkhede10@gmail.com",
    subject: "Welcome to TravelEasy!",
    text: "Thank you for subscribing to our newsletter!",
    html: "<strong>Thank you for subscribing to our newsletter!</strong>",
  };

  try {
    await sgMail.send(msg);
    await prisma.newsLetter.create({
      data: { email },
    });
    res.status(200).send("Email sent successfully and subscription saved");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email or save subscription");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
