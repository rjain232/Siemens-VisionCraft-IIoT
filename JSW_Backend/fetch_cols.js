const sql = require('mssql');
require('dotenv').config({ path: 'c:\\Users\\SDS\\OneDrive - dacpl.in\\Desktop\\JSW\\JSW_Backend\\.env' });

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: false, trustServerCertificate: true }
};

sql.connect(config).then(pool => {
  return pool.request().query("SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME IN ('tbl_Tran_CT_SubStation', 'tbl_Tran_Alarms', 'tbl_Tran_rbt_TipChangeCount')");
}).then(result => {
  console.log(JSON.stringify(result.recordset, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

