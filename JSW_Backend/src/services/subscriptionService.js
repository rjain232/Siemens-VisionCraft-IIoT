const { getPool, sql } = require("../config/db");

const ensureSubscriptionTable = async () => {
  const pool = getPool();
  await pool.request().query(`
    IF OBJECT_ID('dbo.ReportSubscriptions', 'U') IS NULL
    BEGIN
      CREATE TABLE dbo.ReportSubscriptions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        RecipientName NVARCHAR(150) NULL,
        Email NVARCHAR(250) NOT NULL,
        Reports NVARCHAR(MAX) NOT NULL,
        ReportFilters NVARCHAR(MAX) NULL,
        Cadence NVARCHAR(50) NOT NULL,
        Formats NVARCHAR(50) NOT NULL DEFAULT 'Both',
        IsActive BIT NOT NULL DEFAULT 1,
        LastSentAt DATETIME2 NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
      );
    END;

    IF COL_LENGTH('dbo.ReportSubscriptions', 'ReportFilters') IS NULL
    BEGIN
      ALTER TABLE dbo.ReportSubscriptions ADD ReportFilters NVARCHAR(MAX) NULL;
    END;
  `);
};

const parseReports = (raw) => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return String(raw).split(",").map((s) => s.trim()).filter(Boolean);
  }
};

const parseJsonSafe = (raw, fallback = {}) => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const formatRow = (row) => ({
  id: row.Id,
  recipientName: row.RecipientName || "",
  email: row.Email,
  reports: parseReports(row.Reports),
  reportFilters: parseJsonSafe(row.ReportFilters, {}),
  cadence: row.Cadence,
  formats: row.Formats || "Both",
  isActive: Boolean(row.IsActive),
  lastSentAt: row.LastSentAt || null,
  createdAt: row.CreatedAt,
  updatedAt: row.UpdatedAt,
});

const getAllSubscriptions = async () => {
  const pool = getPool();
  const result = await pool.request().query(`
    SELECT Id, RecipientName, Email, Reports, ReportFilters, Cadence, Formats, IsActive, LastSentAt, CreatedAt, UpdatedAt
    FROM dbo.ReportSubscriptions
    ORDER BY CreatedAt DESC;
  `);
  return result.recordset.map(formatRow);
};

const getSubscriptionById = async (id) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(`
      SELECT Id, RecipientName, Email, Reports, ReportFilters, Cadence, Formats, IsActive, LastSentAt, CreatedAt, UpdatedAt
      FROM dbo.ReportSubscriptions
      WHERE Id = @id;
    `);
  if (result.recordset.length === 0) return null;
  return formatRow(result.recordset[0]);
};

const createSubscription = async ({
  recipientName = "",
  email,
  reports = [],
  reportFilters = {},
  cadence = "Daily",
  formats = "Both",
  isActive = true,
}) => {
  const pool = getPool();
  const serializedReports = JSON.stringify(Array.isArray(reports) ? reports : [reports]);
  const serializedFilters = JSON.stringify(reportFilters || {});

  const result = await pool
    .request()
    .input("recipientName", sql.NVarChar(150), recipientName.trim())
    .input("email", sql.NVarChar(250), email.trim().toLowerCase())
    .input("reports", sql.NVarChar(sql.MAX), serializedReports)
    .input("reportFilters", sql.NVarChar(sql.MAX), serializedFilters)
    .input("cadence", sql.NVarChar(50), cadence.trim())
    .input("formats", sql.NVarChar(50), formats.trim())
    .input("isActive", sql.Bit, isActive ? 1 : 0)
    .query(`
      INSERT INTO dbo.ReportSubscriptions (RecipientName, Email, Reports, ReportFilters, Cadence, Formats, IsActive, CreatedAt, UpdatedAt)
      OUTPUT INSERTED.Id, INSERTED.RecipientName, INSERTED.Email, INSERTED.Reports, INSERTED.ReportFilters, INSERTED.Cadence, INSERTED.Formats, INSERTED.IsActive, INSERTED.LastSentAt, INSERTED.CreatedAt, INSERTED.UpdatedAt
      VALUES (@recipientName, @email, @reports, @reportFilters, @cadence, @formats, @isActive, SYSUTCDATETIME(), SYSUTCDATETIME());
    `);

  return formatRow(result.recordset[0]);
};

const updateSubscription = async (id, data) => {
  const pool = getPool();
  const existing = await getSubscriptionById(id);
  if (!existing) {
    throw new Error(`Subscription with ID ${id} not found.`);
  }

  const recipientName = data.recipientName !== undefined ? String(data.recipientName).trim() : existing.recipientName;
  const email = data.email !== undefined ? String(data.email).trim().toLowerCase() : existing.email;
  const reports = data.reports !== undefined ? (Array.isArray(data.reports) ? data.reports : [data.reports]) : existing.reports;
  const reportFilters = data.reportFilters !== undefined ? data.reportFilters : existing.reportFilters;
  const cadence = data.cadence !== undefined ? String(data.cadence).trim() : existing.cadence;
  const formats = data.formats !== undefined ? String(data.formats).trim() : existing.formats;
  const isActive = data.isActive !== undefined ? Boolean(data.isActive) : existing.isActive;

  const serializedReports = JSON.stringify(reports);
  const serializedFilters = JSON.stringify(reportFilters || {});

  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("recipientName", sql.NVarChar(150), recipientName)
    .input("email", sql.NVarChar(250), email)
    .input("reports", sql.NVarChar(sql.MAX), serializedReports)
    .input("reportFilters", sql.NVarChar(sql.MAX), serializedFilters)
    .input("cadence", sql.NVarChar(50), cadence)
    .input("formats", sql.NVarChar(50), formats)
    .input("isActive", sql.Bit, isActive ? 1 : 0)
    .query(`
      UPDATE dbo.ReportSubscriptions
      SET RecipientName = @recipientName,
          Email = @email,
          Reports = @reports,
          ReportFilters = @reportFilters,
          Cadence = @cadence,
          Formats = @formats,
          IsActive = @isActive,
          UpdatedAt = SYSUTCDATETIME()
      OUTPUT INSERTED.Id, INSERTED.RecipientName, INSERTED.Email, INSERTED.Reports, INSERTED.ReportFilters, INSERTED.Cadence, INSERTED.Formats, INSERTED.IsActive, INSERTED.LastSentAt, INSERTED.CreatedAt, INSERTED.UpdatedAt
      WHERE Id = @id;
    `);

  return formatRow(result.recordset[0]);
};

const deleteSubscription = async (id) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(`DELETE FROM dbo.ReportSubscriptions WHERE Id = @id;`);
  return result.rowsAffected[0] > 0;
};

const getSubscriptionsByCadence = async (cadence) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input("cadence", sql.NVarChar(50), cadence)
    .query(`
      SELECT Id, RecipientName, Email, Reports, ReportFilters, Cadence, Formats, IsActive, LastSentAt, CreatedAt, UpdatedAt
      FROM dbo.ReportSubscriptions
      WHERE IsActive = 1 AND LOWER(Cadence) = LOWER(@cadence);
    `);
  return result.recordset.map(formatRow);
};

const recordDispatchSuccess = async (id) => {
  const pool = getPool();
  await pool
    .request()
    .input("id", sql.Int, id)
    .query(`
      UPDATE dbo.ReportSubscriptions
      SET LastSentAt = SYSUTCDATETIME(),
          UpdatedAt = SYSUTCDATETIME()
      WHERE Id = @id;
    `);
};

module.exports = {
  ensureSubscriptionTable,
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionsByCadence,
  recordDispatchSuccess,
};
