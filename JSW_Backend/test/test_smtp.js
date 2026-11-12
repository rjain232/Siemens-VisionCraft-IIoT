/**
 * test_smtp.js
 * Tests SMTP connection to hMailServer
 * Run: node test/test_smtp.js
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST || "127.0.0.1";
const port = parseInt(process.env.SMTP_PORT || "25", 10);
const from = process.env.SMTP_FROM || "JSW Reports <juned.khan@dacpl.in>";

console.log("=".repeat(50));
console.log("SMTP CONNECTION TEST");
console.log("=".repeat(50));
console.log(`Host : ${host}`);
console.log(`Port : ${port}`);
console.log(`From : ${from}`);
console.log("=".repeat(50));

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10000,
});

(async () => {
  try {
    console.log("\n[1] Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅  SMTP connected successfully!\n");
  } catch (err) {
    console.error("❌  SMTP connection failed:", err.message);
    console.error("    Code:", err.code);
    console.log("\n  → Is hMailServer running? Check Windows Services.");
    console.log("  → Is port 25 open? Check Windows Firewall.");
    process.exit(1);
  }
})();
