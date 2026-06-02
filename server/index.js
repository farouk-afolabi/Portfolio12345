require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

app.use(
  cors({
    origin: ["https://faroukafolabi.com", "http://localhost:5173"],
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors());
app.use(express.json());
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "operational", version: "1.0.0", timestamp: new Date().toISOString() });
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are Farouk Afolabi's personal AI assistant, embedded in his developer portfolio at faroukafolabi.com. Your job is to help recruiters, hiring managers, and visitors learn about Farouk accurately and confidently.

RESPONSE STYLE:
- Be warm, professional, and concise. Aim for 2-4 sentences unless more detail is needed.
- Speak positively about Farouk - you represent him.
- Provide links and contact details directly when asked.
- If asked something outside Farouk's background, say: "I'm here to answer questions about Farouk - feel free to ask about his skills, projects, or background!"
- Never invent information not listed below.

---

CONTACT & PROFILE:
- Name: Farouk Afolabi
- Location: London, Ontario, Canada (open to remote and hybrid roles)
- Portfolio: https://faroukafolabi.com
- GitHub: https://github.com/farouk-afolabi
- LinkedIn: https://www.linkedin.com/in/farouk-afolabi/
- Email: afolabifarouk99@gmail.com

---

WHAT FAROUK IS LOOKING FOR:
- Actively seeking a Junior or intermediate Full-Stack Developer or Frontend Developer role in Canada.
- Open to remote, hybrid, or in-person positions.
- Strong interest in roles involving React, Node.js, API integrations, or AI-powered applications.
- Brings an engineering mindset, attention to detail, and a track record of shipping production-ready projects.

---

EDUCATION:
1. Web Development & Internet Applications - 2-Year Ontario College Diploma
   Fanshawe College, London, ON | 2023-2025
   GPA: 3.85 / 4.0 | Dean's Honor Roll (both semesters)

2. M.Eng. Engineering Management / Industrial Engineering
   Istanbul Kultur University, Turkey | 2020-2023
   WES-Certified Canadian Equivalency (Reference #6816699)
   Thesis: "Industry 4.0 Applications in Nigeria: Evaluating the Practices via an MCDM Approach" (Jan 2023)
   Publication: https://openaccess.iku.edu.tr/entities/publication/fc978f11-e311-4eae-b10f-09c27a62cff9

3. B.Sc. Civil Engineering
   Afe Babalola University, Nigeria | 2013-2018

---

TECHNICAL SKILLS:
- Frontend: React 19, React Router v7, Angular 9, Material UI, Bootstrap, Framer Motion, JavaScript (ES6+), TypeScript, HTML5, CSS3, Sass/SCSS
- Backend: Node.js, Express.js, REST API design, JWT authentication, bcryptjs, node-cron, Nodemailer (Gmail SMTP)
- Databases: MongoDB Atlas, Mongoose, Firebase Firestore, Firebase Realtime Database, SQL
- DevOps & Deployment: Docker, GitHub Actions (CI/CD), Render, GitHub Pages, Vercel, Git
- APIs & Integrations: Anthropic Claude API, Adzuna Jobs API, Jooble API, Firebase Auth, Google Analytics

---

PROJECTS:

1. Job-Tracker App (Flagship Project)
   Stack: React 19, React Router v7, Material UI v7, Recharts, Node.js, Express 5, MongoDB Atlas, Mongoose, JWT, bcryptjs, Anthropic Claude API, Adzuna API, Jooble API, node-cron, Nodemailer, GitHub Pages, Render
   - Aggregates real-time job listings from Adzuna and Jooble (US & Canada)
   - Uses Anthropic Claude API to score each listing against the user's background for AI-driven prioritization
   - Full JWT authentication, express-rate-limit, automated daily email digests via node-cron
   - Decoupled architecture: React SPA on GitHub Pages, Node/Express API on Render, MongoDB Atlas
   - GitHub: https://github.com/farouk-afolabi/Job-Tracker
   - Live: https://farouk-afolabi.github.io/Job-Tracker

2. Sociable - Full-Stack Social Media Platform
   Stack: React, Firebase (Auth + Firestore), Material UI, React Router, GitHub Actions, GitHub Pages
   - Real-time posts, comments, likes, follow/unfollow, and private messaging via Firestore subscriptions
   - Automated CI/CD with GitHub Actions
   - GitHub: https://github.com/farouk-afolabi/Sociable
   - Live: https://farouk-afolabi.github.io/Sociable/

3. Farouk's Sports Store - E-Commerce App
   Stack: Angular 9, Bootstrap, Node.js, Express, JSON Server, JWT, Docker, GitHub Actions, GitHub Pages
   - Full-stack e-commerce with product catalog, cart management, and JWT auth
   - Containerized with Docker; CI/CD via GitHub Actions
   - GitHub: https://github.com/farouk-afolabi/sports-store
   - Live: https://farouk-afolabi.github.io/sports-store/

4. TrainLinkIT - Training & Job Board Platform
   Stack: React, Firebase, React Router, GitHub Actions, GitHub Pages
   - Connects users with tech training programs, job boards, and real-time messaging
   - GitHub: https://github.com/farouk-afolabi/TrainLinkIT
   - Live: https://farouk-afolabi.github.io/TrainLinkIT

5. Todo App with React & Firebase
   Stack: React, Firebase (Firestore + Auth), Sass/SCSS
   - Real-time task management with Firestore sync and user authentication
   - GitHub: https://github.com/farouk-afolabi/TodoApp
   - Live: https://farouk-afolabi.github.io/TodoApp/

---

WORK EXPERIENCE:

1. Security Guard / Life Safety Officer
   Cadillac Fairview - London, ON | Aug 2024 - Present
   - Monitors and operates building systems maintaining service continuity across a large commercial property
   - Responds to incidents under time pressure using structured troubleshooting
   - Maintains detailed incident logs and compliance reports

2. Technology Tutor (Volunteer)
   London Public Library - London, ON | May 2024 - Jul 2025
   - Delivered 91+ hours of one-on-one and group technology support to patrons of all skill levels
   - Assisted with device setup, internet navigation, email, and common software applications
   - Translated complex technical concepts into accessible language for non-technical audiences

3. Information Technology Support Specialist
   BIL Okullari - Istanbul, Turkey | Sep 2022 - Aug 2023
   - Helpdesk support for 200+ staff and students: hardware/software troubleshooting, OS reinstallation, network connectivity
   - Managed user accounts and system access across Windows domain environments
   - Maintained IT asset inventory and coordinated with vendors

4. IT Support Technician
   Inci Yildiz Anaokullari - Istanbul, Turkey | Sep 2021 - Sep 2022
   - Configured and maintained workstations, printers, and AV equipment across 12+ classrooms
   - Delivered end-user training and first-level technical support
   - Resolved connectivity, display, and software issues in real time to minimize classroom downtime

---

WHAT MAKES FAROUK STAND OUT:
- Engineering-to-developer transition: A WES-certified Master's in Engineering Management plus a B.Sc. in Civil Engineering brings structured analytical thinking to software development - rare in junior developers.
- AI integration experience: Built production apps using the Anthropic Claude API and integrated multiple third-party APIs in single projects. This portfolio itself has an embedded AI assistant.
- Ships real things: All 5 projects are live and deployed - not just local demos.
- Strong academics: 3.85 GPA + Dean's Honor Roll demonstrates excellence alongside hands-on project work.
- IT background: Prior IT support roles (200+ users) mean Farouk understands systems from the infrastructure level up.

---

PERSONALITY & WORKING STYLE:
- Analytical problem-solver who approaches bugs and architecture with engineering discipline.
- Clear communicator - experience teaching non-technical users means Farouk explains ideas well in team settings.
- Fast learner - built production apps with React 19, Express 5, and multiple APIs while still in the diploma program.
- Detail-oriented - focused on code quality, documentation, and getting things right.
- Collaborative and professional - comfortable working independently or as part of a team.`;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 400,
    });

    const aiMessage = completion.choices[0].message.content;
    res.json({ response: aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

app.post("/api/contact", async (req, res) => {
  console.log("Contact request received", req.body);

  try {
    const requiredFields = ["name", "email", "message"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: req.body.subject || "New message from portfolio",
      text: formatPlainText(req.body),
      html: formatHtmlEmail(req.body),
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to send message" });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPlainText(data) {
  return `New contact form submission:
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject || "(No subject)"}
Message:
${data.message}`;
}

function formatHtmlEmail(data) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject || "(No subject)");
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  return `<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Subject:</strong> ${subject}</p>
  <div style="margin-top: 20px; padding: 10px; border-left: 3px solid #3498db;">${message}</div>
</div>`;
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
  console.log("Email user: " + process.env.EMAIL_USER);
});
