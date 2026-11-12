/**
 * TIA Portal & Siemens Project Backup Tag Extractor
 * Spawns a dedicated Python worker script to parse .zap20 archives safely.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SCRIPT_PATH = path.join(__dirname, 'extract_zap.py');

if (!fs.existsSync(SCRIPT_PATH)) {
  const pyCode = `import sys
import zipfile
import re
import json

if len(sys.argv) < 2:
    print(json.dumps({'error': 'No file path provided'}))
    sys.exit(1)

zap_path = sys.argv[1]

with zipfile.ZipFile(zap_path, 'r') as z:
    drives = set()
    robots = set()
    for n in z.namelist():
        if 'MOVITOOLS MotionStudio/Devices/' in n:
            parts = n.split('MOVITOOLS MotionStudio/Devices/')[1].split('/')
            if parts[0] and len(parts[0]) > 1:
                drives.add(parts[0])
        lower = n.lower()
        if 'gsdml' in lower and any(r in lower for r in ['kuka', 'abb', 'fanuc', 'yaskawa']):
            fname = n.split('/')[-1]
            brand = 'KUKA' if 'kuka' in lower else 'ABB' if 'abb' in lower else 'FANUC' if 'fanuc' in lower else 'Yaskawa'
            robots.add(brand + ' (' + fname + ')')

    stations = set()
    tags = set()
    try:
        with z.open('System/PEData.plf') as f:
            for _ in range(4):
                data = f.read(50 * 1024 * 1024)
                if not data:
                    break
                m_st = re.findall(rb'(?:BSL|MB|ST)[0-9]{2,3}_[a-zA-Z0-9_]{3,30}', data)
                for item in m_st:
                    stations.add(item.decode('latin1'))
                m_tg = re.findall(rb'[a-zA-Z][a-zA-Z0-9_]{3,25}(?:_Status|_Main|_Diag|_ActPos|_SetPos|_Speed|_Fault|_Ready|_Start)', data)
                for item in m_tg:
                    tags.add(item.decode('latin1'))
    except Exception:
        pass

output = {
    'projectName': zap_path.split('\\\\')[-1].replace('.zap20', ''),
    'motionDrives': sorted(list(drives)),
    'robotControllers': sorted(list(robots)),
    'stations': sorted(list(stations)),
    'extractedTags': sorted(list(stations.union(tags)))
}
print(json.dumps(output))
`;
  fs.writeFileSync(SCRIPT_PATH, pyCode, 'utf8');
}

function extractTagsFromZap(zapFilePath) {
  if (!fs.existsSync(zapFilePath)) {
    throw new Error(`File not found: ${zapFilePath}`);
  }

  const stdout = execFileSync('python', [SCRIPT_PATH, zapFilePath], {
    maxBuffer: 40 * 1024 * 1024,
    encoding: 'utf8'
  });

  return JSON.parse(stdout);
}

module.exports = {
  extractTagsFromZap
};
