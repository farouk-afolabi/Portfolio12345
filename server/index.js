require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();

// Rate limiting (10 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { 
    success: false,
    message: 'Too many requests, please try again later.' 
  }
});

// Middleware
app.use(cors({
  origin: [
    'https://faroukafolabi.com',
    'http://localhost:5173' 
  ],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}));

app.options('*', cors()); // Handle all OPTIONS requests
app.use(express.json());
app.use(limiter);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'operational',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Contact request received', req.body); 
  
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false } // Remove in production if not needed
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: req.body.subject || 'New message from portfolio',
      text: formatPlainText(req.body),
      html: formatHtmlEmail(req.body)
    });

    console.log(' Email sent successfully');
    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error(' Email error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message'
    });
  }
});

// Email formatting functions
function formatPlainText(data) {
  return `
    New contact form submission:
    Name: ${data.name}
    Email: ${data.email}
    Subject: ${data.subject || '(No subject)'}
    Message:
    ${data.message}
  `;
}

function formatHtmlEmail(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Subject:</strong> ${data.subject || '(No subject)'}</p>
      <div style="margin-top: 20px; padding: 10px; border-left: 3px solid #3498db;">
        ${data.message.replace(/\n/g, '<br>')}
      </div>
    </div>
  `;
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email user: ${process.env.EMAIL_USER}`);
  console.log(`🌐 Allowed origins: https://faroukafolabi.com, http://localhost:5173`);
});