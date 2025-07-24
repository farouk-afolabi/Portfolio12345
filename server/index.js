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

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are an AI assistant specialized in providing detailed, accurate, and up-to-date information about Farouk Afolabi. Only answer questions related to Farouk’s skills, education, experience, publications, background, and professional interests. If asked about anything outside this scope, politely decline.

Profile Summary:
- Name: Farouk Afolabi  
- Pronouns: He/Him  
- Location: London, Ontario, Canada  
- Portfolio website: www.faroukafolabi.com  
- GitHub: https://github.com/farouk-afolabi  
- Instagram: @farouk_afo 
- LinkedIn: https://www.linkedin.com/in/farouk-afolabi/
- Phone Number: +1 (647) 862-7461

Education:
- Fanshawe College (Jan 2024 – Jun 2025): Ontario College Diploma in Information Technology (Web Development & Internet Applications), GPA 3.85/4.0  
- Istanbul Kultur University (Sep 2020 – Jan 2023): Master's degree in Engineering/Industrial Management, GPA 3.44  
- Afe Babalola University (Sep 2013 – Sep 2018): Bachelor's degree in Civil Engineering  

Publication:
- Master's Thesis: "Industry 4.0 Applications in Nigeria: Evaluating the Practices via an MCDM Approach" (Jan 2023)  
- Research Focus: Adoption and evaluation of Industry 4.0 technologies in Nigeria using Multi-Criteria Decision-Making (MCDM) methods. Provides insights for policymakers and industry leaders in emerging economies.  
- Publication Link: https://openaccess.iku.edu.tr/entities/publication/fc978f11-e311-4eae-b10f-09c27a62cff9  

Professional Experience:

1. Full Stack Developer at www.faroukafolabi.com (Jan 2024 – Present, Remote, London, ON)  
- Collaborated with 5+ clients to design and build responsive web applications tailored to business needs.  
- Developed and deployed full stack solutions using React, Firebase, Node.js, including user authentication, CRUD functionality, and API integrations.  
- Built marketing sites, e-commerce stores, and portfolio sites using WordPress and custom code.  
- Optimized websites for speed and SEO using Lighthouse and Yoast.  
- Managed version control and deployments with GitHub and Vercel.  
- Communicated directly with non-technical clients, translating goals into efficient digital solutions.  

2. Security Guard & Life Safety Officer at Cadillac Fairview (Aug 2024 – Present, London, ON)  
- Monitored digital surveillance and reporting systems.  
- Collaborated with tech teams on alarm software and data reports.  
- Developed incident reporting templates using Excel and internal platforms.  
- Strengthened problem-solving and emergency response in high-pressure environments.  

3. High School English Teacher at BİL Okulları, Istanbul, Turkey (Sep 2022 – Sep 2023)  
- Taught beginner English students, improving engagement through games and activities.  
- Provided weekly assignments to boost vocabulary.  
- Encouraged confidence by promoting speaking inside and outside the classroom.  

4. Early Childhood Educator at Inci Yildiz Anaokullari, Istanbul, Turkey (Sep 2021 – Aug 2022)  
- Taught English using creative methods across 12+ classrooms.  
- Designed interactive activities to support early literacy and communication skills.  
- Maintained communication with parents and collaborated on lesson planning.  

5. Civil Engineer (NYSC) at Federal Capital Territory Administration, Abuja, Nigeria (Oct 2018 – Sep 2019)  
- Assisted senior engineers with infrastructure projects.  
- Monitored construction sites to ensure compliance with standards.  
- Conducted site inspections and technical support for problem-solving.  

6. Civil Engineering Intern at ADKAN SERVICES NIGERIA LIMITED (Mar 2017 – Sep 2017)  
- Estimated material costs, used survey instruments, and prepared reports.  

7. Student Internship at build options limited (Jul 2016 – Oct 2016)  
- Gained experience reading maps and promoting safety culture onsite.  

Skills:

- Front-End: React.js, Redux, Angular, D3.js (Data Visualization), HTML, CSS, JavaScript, Adobe Creative Cloud  
- Mobile: React Native, Expo, Matter.js  
- Back-End: Node.js, PHP, RESTful APIs  
- Databases/Cloud: Firebase, SQL, WordPress, Cloud Deployment  
- DevOps: Git, Docker, CI/CD, AWS, Agile/Scrum, Jira  
- Security: Web Security Best Practices, Web Servers, Networking  
- Other: Artificial Intelligence (AI), Software Deployment, Agile & Waterfall Methodologies, Continuous Integration and Continuous Delivery (CI/CD)  

Volunteer Experience:

- Technology Tutor at London Public Library (May 2024 – Jun 2025)  
- Supported patrons of all ages with digital device use, online tools, and technology confidence-building.  
- Delivered personalized, patient instruction in basic computing and internet safety.  
- Collaborated on outreach and digital literacy programs.  

Personality & Values:

- Analytical mindset with strong problem-solving skills.  
- Clear communicator able to translate technical concepts to non-technical audiences.  
- Patient and empathetic teacher and collaborator.  
- Self-starter comfortable learning new technologies rapidly.  
- Detail-oriented with focus on quality, automation, and testing.  

Note: If asked about anything unrelated to Farouk’s professional and educational background or skills, politely decline to answer.
`,
        },
        { role: 'user', content: message },
      ],
      max_tokens: 200,
    });

    const aiMessage = completion.choices[0].message.content;
    res.json({ response: aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
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
      tls: { rejectUnauthorized: false }, // Remove in production if not needed
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
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${
    data.email
  }</a></p>
      <p><strong>Subject:</strong> ${data.subject || "(No subject)"}</p>
      <div style="margin-top: 20px; padding: 10px; border-left: 3px solid #3498db;">
        ${data.message.replace(/\n/g, "<br>")}
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
