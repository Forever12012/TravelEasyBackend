const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const prisma = new PrismaClient();
const app = express();
const port = 8002;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await prisma.signup.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Account already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.signup.create({
      data: {
        name: userName,
        email,
        password: hashedPassword,
      },
    });

    const msg = {
      to: email,
      from: "tusharharinkhede10@gmail.com",
      subject: "Welcome to TravelEasy!",
      text: "Thank you for Signing up with us! Hope you have a great time with us.",
      html: "<strong>Thank you for Signing up with us! Hope you have a great time with us.</strong>",
    };

    await sgMail.send(msg);
    res.status(200).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process the request" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await prisma.signup.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process the request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
