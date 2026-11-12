const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  requestTimeout: 120000,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    requestTimeout: 120000,
  },
  pool: {
    max: 50,
    min: 5,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 15000,
  },
};

let pool = null;

const connectDB = async (retries = 10, delayMs = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      pool = await sql.connect(config);
      
      // Catch asynchronous background pool errors so they do not crash the process
      pool.on("error", (err) => {
        console.error("❌ MSSQL Pool Background Error:", err.message);
      });

      console.log("✅ MSSQL Connected Successfully");
      return pool;
    } catch (err) {
      console.error(
        `❌ DB Connection attempt ${attempt}/${retries} failed:`,
        err.message
      );
      if (attempt === retries) {
        console.error("❌ Exhausted all database connection attempts. Exiting...");
        process.exit(1);
      }
      console.log(`⏳ Retrying DB connection in ${delayMs / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database pool is not initialized. Please ensure connectDB() has resolved.");
  }
  return pool;
};

const closeDB = async () => {
  if (pool) {
    try {
      await pool.close();
      pool = null;
      console.log("🔒 MSSQL Pool closed gracefully");
    } catch (err) {
      console.error("Error closing MSSQL Pool:", err.message);
    }
  }
};

module.exports = { connectDB, getPool, closeDB, sql };
