require("dotenv").config();
const OpenAI = require('openai');
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();

// Rate limiting (10 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// Middleware
app.use(
  cors({
    origin: ["https://faroukafolabi.com", "http://localhost:5173"],
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors()); // Handle all OPTIONS requests
app.use(express.json());
app.use(limiter);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "operational",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

//Chatbot AI route
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post(‘/api/chat’, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: ‘No message provided’ });

  try {
    const completion = await openai.chat.completions.create({
      model: ‘gpt-3.5-turbo’,
      messages: [
        {
          role: ‘system’,
          content: `You are an AI assistant for Farouk Afolabi’s portfolio website. Answer questions about Farouk’s background, skills, projects, and experience in a friendly and professional tone. Keep answers concise (2-4 sentences). If asked about anything unrelated to Farouk, politely redirect the conversation.

PROFILE:
- Name: Farouk Afolabi
- Location: London, Ontario, Canada
- Portfolio: faroukafolabi.com
- GitHub: github.com/farouk-afolabi
- LinkedIn: linkedin.com/in/farouk-afolabi
- Email: afolabifarouk99@gmail.com

EDUCATION:
- Web Development & Internet Applications Diploma — Fanshawe College, London ON (2023–2025). GPA 3.85/4.0, Dean’s Honor Roll both semesters.
- M.Eng. Engineering Management / Industrial Engineering — Istanbul Kultur University (2020–2023). WES-certified Canadian equivalency (Ref #6816699).
- B.Sc. Civil Engineering — Afe Babalola University, Nigeria (2013–2018).
- Master’s Thesis: "Industry 4.0 Applications in Nigeria: Evaluating the Practices via an MCDM Approach" (Jan 2023).

TECHNICAL SKILLS:
- Frontend: React 19, React Router v7, Angular 9, Material UI, Bootstrap, Framer Motion, JavaScript (ES6+), TypeScript, HTML5, CSS3, Sass/SCSS
- Backend: Node.js, Express.js, REST API design, JWT authentication, bcryptjs, node-cron, Nodemailer
- Databases: MongoDB Atlas, Mongoose, Firebase Firestore, Firebase Realtime Database, SQL
- DevOps: Docker, GitHub Actions, Render, GitHub Pages, Vercel, Git
- APIs: Anthropic Claude API, Adzuna Jobs API, Jooble API, Firebase Auth, Google Analytics

PROJECTS:
1. Job-Tracker App — Full-stack job application tracker. Aggregates live job listings from Adzuna and Jooble APIs, uses Anthropic Claude API to score how well each job matches the user’s background, JWT auth, automated email digests with node-cron. React 19 frontend on GitHub Pages, Node/Express backend on Render, MongoDB Atlas. GitHub: github.com/farouk-afolabi/Job-Tracker
2. Sociable — Full-stack social media platform with real-time posts, comments, likes, follow system, and private messaging. React + Firebase Firestore. Live: farouk-afolabi.github.io/Sociable
3. Farouk’s Sports Store — E-commerce app with Angular 9, JWT auth, Docker, GitHub Actions CI/CD. Live: farouk-afolabi.github.io/sports-store
4. TrainLinkIT — Platform connecting users with tech training programs, job boards, and real-time messaging. React + Firebase.
5. Todo App — React + Firebase Firestore task manager with real-time sync and Sass styling.

WORK EXPERIENCE:
1. Security Guard / Life Safety Officer — Cadillac Fairview, London ON (Aug 2024–Present). Monitors building systems, responds to incidents under pressure, maintains detailed incident logs and compliance reports.
2. Technology Tutor (Volunteer) — London Public Library, London ON (May 2024–Jul 2025). Delivered 91+ hours of one-on-one and group technology support to patrons; translated complex technical concepts into accessible language.
3. IT Support Technician — BİL Okulları, Istanbul Turkey (Sep 2022–Aug 2023). Provided helpdesk support for 200+ staff and students: hardware/software troubleshooting, OS reinstallation, network connectivity, Windows domain user account management.
4. IT Support Technician — Inci Yildiz Anaokullari, Istanbul Turkey (Sep 2021–Sep 2022). Configured and maintained workstations, printers, and network devices across 12+ classrooms; delivered end-user training and first-level technical support.

PERSONALITY & VALUES:
- Engineering background brings strong analytical and problem-solving skills to web development.
- Clear communicator — able to explain technical concepts to non-technical audiences.
- Self-starter who picks up new technologies quickly.
- Detail-oriented, focused on building production-quality applications.`,
        },
        { role: ‘user’, content: message },
      ],
      max_tokens: 400,
    });

    const aiMessage = completion.choices[0].message.content;
    res.json({ response: aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ‘Failed to get response from OpenAI’ });
  }
});


// Contact endpoint
app.post("/api/contact", async (req, res) => {
  console.log("Contact request received", req.body);

  try {
    // Validate required fields
    const requiredFields = ["name", "email", "message"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: req.body.subject || "New message from portfolio",
      text: formatPlainText(req.body),
      html: formatHtmlEmail(req.body),
    });

    console.log(" Email sent successfully");
    res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error(" Email error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
});

// Escape user input before injecting into HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Email formatting functions
function formatPlainText(data) {
  return `
    New contact form submission:
    Name: ${data.name}
    Email: ${data.email}
    Subject: ${data.subject || "(No subject)"}
    Message:
    ${data.message}
  `;
}

function formatHtmlEmail(data) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject || "(No subject)");
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="margin-top: 20px; padding: 10px; border-left: 3px solid #3498db;">
        ${message}
      </div>
    </div>
  `;
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email user: ${process.env.EMAIL_USER}`);
  console.log(
    `🌐 Allowed origins: https://faroukafolabi.com, http://localhost:5173`
  );
});
