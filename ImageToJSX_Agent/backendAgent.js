/**
 * Full-Stack Agent: Autonomous Backend & Database Logic Synthesizer
 * Generates SQL queries, Express controllers, route handlers, and data contracts
 * based on UI screen requirements (e.g. Yearly/Monthly filters, robot stats, metrics).
 */

async function callGeminiText(prompt, apiKey) {
  const modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash'];
  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gemini API error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Failed to query Gemini text API');
}

async function synthesizeBackendLogic({ screenName, userRequirement, existingJsx, apiKey }) {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;
  if (!effectiveKey) {
    return generateHeuristicBackendLogic(screenName, userRequirement);
  }

  const prompt = `You are a Principal Backend & Database Architect for JSW Steel & Motors.
You specialize in Node.js, Express, and Microsoft SQL Server (MSSQL / T-SQL).

CONTEXT:
Screen Name: "${screenName || 'IndustrialDashboard'}"
User / Feature Requirement: "${userRequirement || 'Add time filter aggregation and corresponding backend API'}"

UI Context:
${existingJsx ? existingJsx.slice(0, 1500) : 'Industrial dashboard with filters (Monthly, Shift, Line, DateRange).'}

TASK:
Synthesize complete, production-ready backend logic to support this feature:
1. SQL Server (T-SQL) query with robust aggregations (handling YEAR, MONTH, DATEADD, SUM, AVG, COUNT, GROUP BY, and NULL coalescing).
2. Express Route and Controller logic using standard async/await, database connection pool parameters, input validation, and defensive error handling.
3. Sample Mock JSON response contract matching the query output.

OUTPUT FORMAT:
Return a valid JSON object strictly matching this schema:
{
  "featureSummary": "Brief 1-line description of backend logic",
  "endpoint": "/api/production/yearly-summary",
  "httpMethod": "GET",
  "queryParams": ["clusterId", "lineId", "yearRange"],
  "sqlQuery": "SELECT YEAR(ProductionDate) AS [Year], ...",
  "routeCode": "// Express route and controller code\\nrouter.get('/...', async (req, res) => { ... });",
  "sampleResponse": {
    "success": true,
    "filter": "yearly",
    "data": [
      { "year": 2026, "totalActual": 142000, "totalTarget": 150000, "avgOee": 94.6 }
    ]
  }
}

Return ONLY the raw JSON object. Do NOT wrap in markdown code fences or conversational text.`;

  try {
    const rawText = await callGeminiText(prompt, effectiveKey);
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*\n/, '').replace(/\n```$/, '');
    }
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('AI backend synthesizer fallback triggered:', err.message);
    return generateHeuristicBackendLogic(screenName, userRequirement);
  }
}

function generateHeuristicBackendLogic(screenName, userRequirement) {
  const isYearly = /year|yearly|annual/i.test(userRequirement);
  const route = isYearly ? '/api/production/yearly-summary' : '/api/production/custom-summary';

  return {
    featureSummary: `Auto-generated backend service for ${screenName} (${userRequirement})`,
    endpoint: route,
    httpMethod: 'GET',
    queryParams: ['clusterId', 'lineId', 'startDate', 'endDate'],
    sqlQuery: `SELECT 
    YEAR(ProductionDate) AS [Year],
    ClusterId,
    LineId,
    SUM(ISNULL(ActualCount, 0)) AS TotalActual,
    SUM(ISNULL(TargetCount, 0)) AS TotalTarget,
    ROUND(AVG(ISNULL(OEE_Percentage, 0)), 2) AS AvgOEE,
    SUM(ISNULL(DowntimeMinutes, 0)) AS TotalDowntimeMinutes
FROM ProductionRecords
WHERE (@clusterId IS NULL OR ClusterId = @clusterId)
  AND (@lineId IS NULL OR LineId = @lineId)
GROUP BY YEAR(ProductionDate), ClusterId, LineId
ORDER BY [Year] DESC;`,
    routeCode: `router.get('${route.replace('/api/production', '')}', async (req, res) => {
  try {
    const { clusterId, lineId } = req.query;
    const pool = await getPool();
    const result = await pool.request()
      .input('clusterId', sql.Int, clusterId ? parseInt(clusterId) : null)
      .input('lineId', sql.Int, lineId ? parseInt(lineId) : null)
      .query(sqlQuery);
    res.json({ success: true, count: result.recordset.length, data: result.recordset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`,
    sampleResponse: {
      success: true,
      filter: isYearly ? 'yearly' : 'custom',
      data: [
        { Year: 2026, TotalActual: 540200, TotalTarget: 560000, AvgOEE: 96.4, TotalDowntimeMinutes: 1420 },
        { Year: 2025, TotalActual: 512000, TotalTarget: 550000, AvgOEE: 93.1, TotalDowntimeMinutes: 1890 }
      ]
    }
  };
}

module.exports = {
  synthesizeBackendLogic
};
