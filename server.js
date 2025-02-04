// Server code for testing locally
/*
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mailchimp API Configuration
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER;

// Endpoint for email subscription
app.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    try {
      console.log("Received request for email:", email); // Log incoming request

      const response = await fetch(
        `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `apikey ${MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
          }),
        }
      );

      const data = await response.json();
      console.log("Mailchimp response:", data); // Log full Mailchimp response

      if (response.ok) {
        res.status(200).json({ message: "Email successfully subscribed!" });
      } else {
        console.error("Mailchimp error:", data); // Log Mailchimp error details
        res.status(400).json({ error: data.detail || "Subscription failed" });
      }
    } catch (error) {
      console.error("Server error:", error); // Log server-side errors
      res.status(500).json({ error: "Internal server error" });
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/