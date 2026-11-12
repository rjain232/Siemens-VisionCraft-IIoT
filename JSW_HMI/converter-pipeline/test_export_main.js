const { execSync } = require('child_process');
const dir = 'D:\\Downloads\\109792619_Excel_Importer_Exporter_V203_2\\Release (1)';
const cmd = `"${dir}\\ExcelExporter.exe" "HMI01_MTP1500/Main" Left Top Width Height Graphic "Text#en-US" BackColor ForeColor`;

try {
  console.log('Running:', cmd);
  const out = execSync(cmd, { cwd: dir, encoding: 'utf8' });
  console.log('Output:\n', out);
} catch (e) {
  console.log('Error:', e.message);
}
