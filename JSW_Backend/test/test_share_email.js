/**
 * test_share_email.js — Tests POST /api/reports/share-email
 * Run: node test/test_share_email.js
 * Run with email: node test/test_share_email.js ritwik@jsw.in
 */
const http = require("http");

const RECIPIENT = process.argv[2] || "ritwikjain232@gmail.com";
const HOST = "localhost";
const PORT = 5050;
const today = new Date().toISOString().split("T")[0];

// Minimal valid 1-page PDF in Base64
const PDF_B64 =
  "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIK" +
  "Pj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0K" +
  "L0NvdW50IDEKPJ4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVu" +
  "dCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKeHJlZgowIDQK" +
  "MDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTgg" +
  "MDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDQKL1Jv" +
  "b3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjE5MAolJUVPRgo=";

const payload = JSON.stringify({
  email: RECIPIENT,
  cadence: ["Immediate Share"],
  dateRange: { start: today, end: today },
  files: [{ name: `Test_OEE_${today}.pdf`, fileType: "pdf", contentBase64: PDF_B64 }],
  filters: { area: "1", line: "2", shifts: ["A"] }
});

(async () => {
  process.stdout.write("=".repeat(55) + "\n");
  process.stdout.write("  SHARE EMAIL API TEST\n");
  process.stdout.write("=".repeat(55) + "\n");
  process.stdout.write(`  Recipient : ${RECIPIENT}\n`);
  process.stdout.write(`  Date      : ${today}\n`);
  process.stdout.write("=".repeat(55) + "\n\n");

  process.stdout.write("[1] Sending POST /api/reports/share-email...\n");

  const result = await new Promise((resolve, reject) => {
    const opts = {
      hostname: HOST, port: PORT,
      path: "/api/reports/share-email",
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) }
    };
    const req = http.request(opts, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, body: d }); }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });

  process.stdout.write(`\n    HTTP Status : ${result.status}\n`);
  process.stdout.write(`    Success     : ${result.body?.success}\n`);
  process.stdout.write(`    Message     : ${result.body?.message}\n`);

  if (result.body?.details?.messageId) {
    process.stdout.write(`    MessageId   : ${result.body.details.messageId}\n`);
    process.stdout.write(`    Accepted    : ${result.body.details.accepted}\n`);
  }

  if (result.body?.success) {
    process.stdout.write(`\n✅  Email sent to ${RECIPIENT}! Check inbox.\n\n`);
  } else {
    process.stdout.write(`\n❌  Failed: ${result.body?.message}\n\n`);
  }
})().catch(e => {
  process.stdout.write(`\n❌  Network error: ${e.message}\n   → Is backend running? npm run dev\n\n`);
});
