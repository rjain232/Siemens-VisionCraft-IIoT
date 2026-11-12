const sql = require('mssql');
require('dotenv').config({ path: 'c:\\Users\\SDS\\OneDrive - dacpl.in\\Desktop\\JSW\\JSW_Backend\\.env' });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  requestTimeout: 60000,
  options: { encrypt: false, trustServerCertificate: true }
};

const createViewQuery = `
CREATE OR ALTER VIEW vw_Master_Factory_Timeline AS
SELECT 
    ct.TimeStamp AS Cycle_Timestamp,
    ct.Sub_StationID,
    ct.CycleTime,
    ct.WeldTime,
    ct.PickTime,
    ct.DropTime,
    ct.OperatorLoading_Starving_Time,
    ct.Emergency,
    ct.Manual,
    ct.Safety_Gate,
    COUNT(DISTINCT al.ID) AS Alarms_Triggered_During_Cycle,
    MAX(al.duration) AS Max_Alarm_Duration_Seconds,
    ISNULL(SUM(tc.Value), 0) AS Total_Tip_Changes_This_Hour
FROM 
    dbo.tbl_Tran_CT_SubStation ct
LEFT JOIN 
    dbo.tbl_Tran_Alarms al 
    ON al.raiseTime BETWEEN DATEADD(minute, -5, ct.TimeStamp) AND DATEADD(minute, 5, ct.TimeStamp)
LEFT JOIN 
    dbo.tbl_Tran_rbt_TipChangeCount tc
    ON tc.Timstamp BETWEEN DATEADD(hour, -1, ct.TimeStamp) AND ct.TimeStamp
WHERE 
    ct.TimeStamp >= DATEADD(day, -30, GETDATE())
GROUP BY 
    ct.TimeStamp,
    ct.Sub_StationID,
    ct.CycleTime,
    ct.WeldTime,
    ct.PickTime,
    ct.DropTime,
    ct.OperatorLoading_Starving_Time,
    ct.Emergency,
    ct.Manual,
    ct.Safety_Gate;
`;

sql.connect(config).then(pool => {
  console.log("Connected to DB, creating view...");
  return pool.request().query(createViewQuery);
}).then(() => {
  console.log("SUCCESS: vw_Master_Factory_Timeline view created!");
  process.exit(0);
}).catch(err => {
  console.error("ERROR:", err.message);
  process.exit(1);
});

