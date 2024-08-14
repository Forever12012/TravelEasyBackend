const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const { PrismaClient } = require("@prisma/client");

sgMail.setApiKey(
  "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"
);
const prisma = new PrismaClient();
const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
  })
);

app.post("/contact", async (req, res) => {
  const { name, email, question, comment } = req.body;

  if (!name || !email || !question || !comment) {
    return res.status(400).send("All fields are required");
  }

  try {
    // Store the contact information in the database
    await prisma.contact.create({
      data: {
        name,
        email,
        question,
        comment,
      },
    });

    // Send a confirmation email
    const msg = {
      to: email,
      from: "tusharharinkhede10@gmail.com",
      subject: "Welcome to TravelEasy!",
      text: "Thank you for contacting us! We will get back to you soon.",
      html: "<strong>Thank you for contacting us! We will get back to you soon.</strong>",
    };

    await sgMail.send(msg);
    res
      .status(200)
      .send("Email sent and contact information saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to process the request");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
