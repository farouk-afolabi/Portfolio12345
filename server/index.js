// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Restrict CORS to your frontend domain for security
app.use(cors({
  origin: 'https://faroukafolabi.com', // change if your frontend URL differs
}));

app.use(express.json());

// Health check route — test your backend is live
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/contact', async (req, res) => {
  console.log('Received contact data:', req.body); // for debugging

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your Gmail app password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
