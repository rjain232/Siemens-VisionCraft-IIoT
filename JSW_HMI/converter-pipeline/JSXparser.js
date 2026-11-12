/**
 * Simatic XML to React JSX Parser & Generator
 * Generates pixel-accurate React components directly from Siemens TIA Portal XML exports.
 * Uses official Siemens TIA exported graphics (/tia_graphics/*.png) for authentic industrial HMI rendering.
 */

const fs = require('fs');
const path = require('path');

// Cache available PNG graphics for smart asset resolution across all 211+ screens
let AVAILABLE_GRAPHICS = [];
try {
  const graphicsDir = path.join(__dirname, 'public', 'tia_graphics');
  if (fs.existsSync(graphicsDir)) {
    AVAILABLE_GRAPHICS = fs.readdirSync(graphicsDir).filter(f => f.endsWith('.png'));
  }
} catch (e) {
  AVAILABLE_GRAPHICS = [];
}

function resolveSiemensGraphic(elementName, screenName = '') {
  if (!elementName) return '/tia_graphics/SICAR_FlexibleProcessLine.png';
  const clean = elementName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const screenClean = screenName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Direct name match in library
  const exact = AVAILABLE_GRAPHICS.find(g => g.toLowerCase().replace(/[^a-z0-9]/g, '').includes(clean));
  if (exact) return `/tia_graphics/${exact}`;

  // 1b. Small status icons & Operation Mode overlays (Blocked / Interlock / Mode Foreground)
  if (clean.includes('opmode') && clean.includes('foreground')) {
    return '/tia_graphics/SICAR_Model.png';
  }
  if (clean.includes('foreground') && clean.includes('blocked')) {
    if (clean.includes('start')) return '/tia_graphics/SICAR_Mode_Start_Black_14x14.png';
    if (clean.includes('auto')) return '/tia_graphics/SICAR_Mode_Auto2_Black_14x14.png';
    if (clean.includes('manual')) return '/tia_graphics/SICAR_Mode_Manual2_Black_14x14.png';
    return '/tia_graphics/SICAR_BackForground_LightGrey_R1.png';
  }
  if (clean.includes('blocked') && !clean.includes('foreground')) {
    const blk = AVAILABLE_GRAPHICS.find(g => g.includes('Blocked-Red') || g.includes('Blocked-Orange'));
    return blk ? `/tia_graphics/${blk}` : '/tia_graphics/SICAR_Blocked-Orange-14x14_1.png';
  }

  // 2. High-Precision Station Component Mapping (Matching authentic plant layout diagrams)
  
  // Roof Geo & Roof Handling screens
  if (screenClean.includes('roofgeo') || screenClean.includes('roof_geo')) {
    if (screenClean.includes('j5')) return '/tia_graphics/J5MB190RoofGeo.png';
    return '/tia_graphics/V23MB190RoofGeo.png';
  }
  if (screenClean.includes('roofhandling') || screenClean.includes('roof_handling') || screenClean.includes('roofhanding')) {
    return '/tia_graphics/J5MB190RoofHanding.png';
  }

  // Slider screens (Left-Hand and Right-Hand)
  if (screenClean.includes('lhslider') || screenClean.includes('silderlh')) {
    return '/tia_graphics/SilderLH_1.png';
  }
  if (screenClean.includes('rhslider') || screenClean.includes('silderrh')) {
    return '/tia_graphics/SilderRH_1.png';
  }

  // Passing stand screens
  if (screenClean.includes('passingstand') || screenClean.includes('passing')) {
    return '/tia_graphics/Passing stand.png';
  }

  // Docking screens
  if (screenClean.includes('docking') || screenClean.includes('dock')) {
    if (screenClean.includes('200')) return '/tia_graphics/200 PRB docking.png';
    return '/tia_graphics/PRB Dock.png';
  }

  // Lifter screens
  if (screenClean.includes('lifter') || clean.includes('lifter')) {
    return '/tia_graphics/Lifter.png';
  }

  // Robot Collision screens
  if (screenClean.includes('robotcollision') || screenClean.includes('collision')) {
    if (screenClean.includes('150')) return '/tia_graphics/Robotcollisioin.png';
    if (screenClean.includes('160')) return '/tia_graphics/160 Collision Zone_1.png';
    if (screenClean.includes('190')) return '/tia_graphics/190 Collision Zone2.png';
    if (screenClean.includes('200')) return '/tia_graphics/200 Collision Zone.png';
    return '/tia_graphics/Robotcollisioin.png';
  }

  // Robot screens (Kuka / ABB / Gripper / Stand)
  if (screenClean.includes('rb02') || clean.includes('rb02')) {
    if (screenClean.includes('stand')) return '/tia_graphics/190RB02_GR_Stand_J5_1.png';
    return '/tia_graphics/190RB02_J5_Gripper.png';
  }
  if (screenClean.includes('rb04') || clean.includes('rb04')) {
    if (screenClean.includes('stand')) return '/tia_graphics/RB04 J5 Stand.png';
    return '/tia_graphics/RB04_J5.png';
  }
  if (screenClean.includes('rb06') || clean.includes('rb06')) {
    if (screenClean.includes('stand')) return '/tia_graphics/RB06 stand_1.png';
    return '/tia_graphics/190RB06_J5_Gripper.png';
  }
  if (screenClean.includes('robot') || clean.includes('robot') || clean.includes('kuka') || clean.includes('abb')) {
    return '/tia_graphics/SICAR_Robot01.png';
  }

  // Station Plant Layout Overrides (PPX150, MB140, MB190, MB200, APC)
  if (screenClean.includes('apc') || clean.includes('apc')) {
    return '/tia_graphics/APC1.png';
  }
  if (screenClean.includes('sew') || screenClean.includes('turntable')) {
    return '/tia_graphics/TurnTable.png';
  }
  if (screenClean.includes('overview') && clean.startsWith('graphicview')) {
    // Overview station cell thumbnail - rollerbed/lifter graphic
    return '/tia_graphics/SICAR_Rollerblade_Horizontal_77x34.png';
  }
  if (screenClean.includes('150')) {
    if (screenClean.includes('v23')) return '/tia_graphics/PPX150_V23.png';
    return '/tia_graphics/PPX150_J5.png';
  }
  if (screenClean.includes('160')) {
    return '/tia_graphics/160 Collision Zone_1.png';
  }
  if (screenClean.includes('190')) {
    if (screenClean.includes('v23')) return '/tia_graphics/V23MB190UB_1.png';
    return '/tia_graphics/J5MB190UB.png';
  }
  if (screenClean.includes('200')) {
    if (screenClean.includes('v23')) return '/tia_graphics/v23MB200UB.png';
    return '/tia_graphics/J5MB200UB.png';
  }
  if (screenClean.includes('140')) {
    return '/tia_graphics/140Zone_Details.png';
  }

  // 3. Mode Buttons in Header (Start / Auto / Manual)
  if (clean.includes('start')) {
    const startG = AVAILABLE_GRAPHICS.find(g => g.includes('Mode_Start_Blue') || g.includes('Mode_Start_Black'));
    if (startG) return `/tia_graphics/${startG}`;
  }
  if (clean.includes('auto')) {
    const autoG = AVAILABLE_GRAPHICS.find(g => g.includes('Mode_Auto2_Black'));
    if (autoG) return `/tia_graphics/${autoG}`;
  }
  if (clean.includes('manual')) {
    const manG = AVAILABLE_GRAPHICS.find(g => g.includes('Mode_Manual2_Black'));
    if (manG) return `/tia_graphics/${manG}`;
  }

  // 4. Navigation Arrows
  if (clean.includes('arrow') || clean.includes('back')) {
    const arrG = AVAILABLE_GRAPHICS.find(g => g.toLowerCase().includes('arrow') || g.toLowerCase().includes('back01'));
    if (arrG) return `/tia_graphics/${arrG}`;
  }

  // 5. Cylinders & Valves (only when explicitly named cylinder/valve)
  if (clean.includes('cyl') || clean.includes('zyl') || clean.includes('ventil') || clean.includes('valve')) {
    return '/tia_graphics/SICAR_Zylinder_60x112.png';
  }

  // Default clean plant conveyor line
  const defaultLine = AVAILABLE_GRAPHICS.find(g => g.includes('FlexibleProcessLine'));
  return defaultLine ? `/tia_graphics/${defaultLine}` : '/tia_graphics/SICAR_FlexibleProcessLine.png';
}

// Known standard diagnostic telemetry labels for SICAR / Siemens Valve Diagnostic screens
const DIAGNOSTIC_ROW_LABELS = {
  // Left column (Status & Control signals)
  'OBJECT_7': 'safetyOK',
  'OBJECT_31': 'Automatic mode active',
  'OBJECT_30': 'Manual mode active',
  'OBJECT_34': 'Start WORK in automatic mode',
  'OBJECT_33': 'Start HOME in automatic mode',
  'OBJECT_35': 'Enable WORK',
  'OBJECT_37': 'Enable HOME',
  'OBJECT_15': 'Position WORK',
  'OBJECT_24': 'Position HOME',
  'OBJECT_6': 'Enable Block',
  'OBJECT_1': 'Hardware OK',
  'OBJECT_27': 'Output WORK',
  'OBJECT_28': 'Output HOME',

  // Right column (Alarm & Interlock diagnostic messages)
  'OBJECT_42': '"hardwareOK" missing',
  'OBJECT_40': 'pair monitoring',
  'OBJ1': 'No enable Work, "enableWork" missing',
  'OBJECT_2': 'No enable Home, "enableHome" missing',
  'OBJECT_47': 'Time monitoring expired, position Work not reached',
  'OBJECT_3': 'Time monitoring expired, position Home not reached',
  'OBJECT_48': 'Position Home left without command',
  'OBJECT_51': 'Position Home left without command',
  'OBJECT_4': 'Time monitoring expired, position Work not left',
  'OBJECT_5': 'Time monitoring expired, position Home not left',
  'Reserved_2': 'safetyOK missing'
};

function parseSimaticXmlToJsx(xmlString, screenName = 'SimaticScreen') {
  // Clean component name ensuring valid JS identifier (cannot start with a number)
  let cleanName = screenName.replace(/[^a-zA-Z0-9]/g, '');
  if (/^[0-9]/.test(cleanName)) {
    cleanName = 'Screen_' + cleanName;
  }
  const compName = (cleanName || 'SimaticHmiScreen') + 'Component';

  // Extract dimensions
  const widthMatch = xmlString.match(/<Width>(\d+)<\/Width>/);
  const heightMatch = xmlString.match(/<Height>(\d+)<\/Height>/);
  const screenWidth = widthMatch ? parseInt(widthMatch[1], 10) : 1280;
  const screenHeight = heightMatch ? parseInt(heightMatch[1], 10) : 800;

  // Extract ScreenItems
  const itemRegex = /<Hmi\.ScreenItem ID="(\d+)">([\s\S]*?)<\/Hmi\.ScreenItem>/g;
  const items = [];
  let match;

  while ((match = itemRegex.exec(xmlString)) !== null) {
    const id = match[1];
    const body = match[2];
    const nameMatch = body.match(/<Name>(.*?)<\/Name>/);
    const typeMatch = body.match(/<Type>(.*?)<\/Type>/);
    const leftMatch = body.match(/<Left>(-?\d+)<\/Left>/);
    const topMatch = body.match(/<Top>(-?\d+)<\/Top>/);
    const wMatch = body.match(/<Width>(\d+)<\/Width>/);
    const hMatch = body.match(/<Height>(\d+)<\/Height>/);

    const name = nameMatch ? nameMatch[1] : `Item_${id}`;
    const type = typeMatch ? typeMatch[1] : 'Unknown';
    const left = leftMatch ? parseInt(leftMatch[1], 10) : 0;
    const top = topMatch ? parseInt(topMatch[1], 10) : 0;
    const width = wMatch ? parseInt(wMatch[1], 10) : 100;
    const height = hMatch ? parseInt(hMatch[1], 10) : 30;

    items.push({ id, name, type, left, top, width, height });
  }

  // Adaptive screen dimension calculation:
  
  const validItems = items.filter(el => {
    // Exclude off-screen scratchpad elements placed far off negative or extreme positive
    if (el.left < -10 || el.top < -10) return false;
    if (el.left > 2500 || el.top > 2500) return false;
    if (el.width === 0 && el.height === 0) return false;
    if (el.name.startsWith('Screen_Back_')) return false;
    if (el.name.includes('permanentareaborderrectangle')) return false;
    // Exclude duplicate/phantom bottom-corner Back buttons when standard top-left header Back exists
    if (el.name.startsWith('Button_Back_') && el.top >= 550 && el.left >= 1000) return false;
    // Exclude duplicate stacked Back buttons at header position (2, 2)
    if (el.name === 'Button_Back_1' && el.left <= 5 && el.top <= 5) return false;
    // Exclude redundant animation helper layers that overlap identical functional buttons
    if (el.name.includes('BackgroundAnimation')) return false;
    // Exclude duplicate '_small' button duplicates on Opmodes popups (keep full standard '_wide' buttons)
    if (el.name.endsWith('_small') && (screenName.includes('Opmodes') || screenName.includes('Pop-up_Opmodes'))) return false;
    return true;
  });

  // -------------------------------------------------------------
  // INTELLIGENT GROUP DE-DUPLICATION & AUTO-GRID POSITIONING
  // -------------------------------------------------------------
  
  // Step 1: Detect Overview card screens (like Main.xml)
  const isOverviewScreen = screenName.toLowerCase() === 'main' || validItems.some(el => el.name.startsWith('Overview_01_') || el.name.startsWith('PosDev_Lifter_'));
  if (isOverviewScreen) {
    let currentCardGroup = 1;
    validItems.forEach(el => {
      if (el.name.startsWith('Overview_') && !el.name.includes('Button') && !el.name.includes('Shadow') && !el.name.includes('Text')) {
        const m = el.name.match(/_([1-4])$/);
        if (m) currentCardGroup = parseInt(m[1], 10);
      } else {
        const explicitMatch = el.name.match(/_([1-4])$/);
        if (explicitMatch && !el.name.includes('Button')) {
          currentCardGroup = parseInt(explicitMatch[1], 10);
        }
      }

      const colIndex = currentCardGroup - 1; // 0, 1, 2, 3
      const baseOffsetX = 60 + colIndex * 290;
      const baseOffsetY = 140;

      el.left = baseOffsetX + el.left;
      el.top = baseOffsetY + el.top;
    });
  } else {
    // Step 2: Detect general zero-origin clusters (e.g. 190J5RoofGeo, 190RB06, etc.)
    const zeroElements = validItems.filter(el => (el.left <= 2 && el.top <= 2 && !el.name.toLowerCase().includes('back')));
    if (zeroElements.length >= 4) {
      // Group items sequentially: identify root cards (Rectangle/矩形) and attach following widgets
      let currentCluster = 0;
      let clusterRootX = 120;
      let clusterRootY = 90;

      // First pass: assign cluster index based on order of appearance or card header
      let activeClusterIdx = -1;
      zeroElements.forEach((el, zeroIndex) => {
        if (el.name.startsWith('Rectangle_') || el.name.startsWith('矩形_')) {
          activeClusterIdx++;
        }
        const assignedIdx = Math.max(0, activeClusterIdx);
        const col = assignedIdx % 4;
        const row = Math.floor(assignedIdx / 4);

        const clusterBaseX = 80 + col * 280;
        const clusterBaseY = 90 + row * 95;

        // Position items nicely within their telemetry card:
        // - Rectangle: the card boundary (152x48)
        // - TextBox: label placed inside card
        // - Circle: LED indicators placed neatly at top-right of card
        if (el.name.startsWith('Rectangle_') || el.name.startsWith('矩形_')) {
          el.left = clusterBaseX;
          el.top = clusterBaseY;
        } else if (el.name.startsWith('文本域_') || el.name.startsWith('Text_') || el.name.startsWith('文本_')) {
          el.left = clusterBaseX + 6;
          el.top = clusterBaseY + 6;
          el.width = Math.min(el.width, 140);
          el.height = Math.min(el.height, 36);
        } else if (el.name.startsWith('圆_') || el.name.startsWith('Circle_') || el.name.startsWith('LED_')) {
          const numMatch = el.name.match(/\d+$/);
          const cNum = numMatch ? parseInt(numMatch[0], 10) : 1;
          const ledOffset = (cNum % 2 === 1) ? 0 : 20;
          el.left = clusterBaseX + 115 + ledOffset;
          el.top = clusterBaseY + 14;
          el.width = 16;
          el.height = 16;
        } else if (el.type.includes('Button')) {
          // Sequentially arrange buttons that originated at (0, 0)
          const btnCol = zeroIndex % 4;
          const btnRow = Math.floor(zeroIndex / 4);
          el.left = 100 + btnCol * 120;
          el.top = 100 + btnRow * 70;
        } else {
          const defaultCol = zeroIndex % 4;
          const defaultRow = Math.floor(zeroIndex / 4);
          el.left = 100 + defaultCol * 150;
          el.top = 100 + defaultRow * 60;
        }
      });
    }
  }

  // Calculate actual bounding box after de-duplication
  let maxContentRight = 0;
  let maxContentBottom = 0;
  validItems.forEach(el => {
    if (el.left + el.width > maxContentRight && el.left < 2800) maxContentRight = el.left + el.width;
    if (el.top + el.height > maxContentBottom && el.top < 2800) maxContentBottom = el.top + el.height;
  });

  // Determine optimal responsive canvas dimensions
  const finalCanvasWidth = Math.max(screenWidth, maxContentRight > 0 ? maxContentRight + 40 : 1276);
  const finalCanvasHeight = Math.max(screenHeight, maxContentBottom > 0 ? maxContentBottom + 40 : 673);

  // Filter out fullscreen background blockers that match canvas size
  const fgItems = validItems.filter(el => {
    if (el.width >= finalCanvasWidth - 10 && el.height >= finalCanvasHeight - 200) return false;
    return true;
  });

  // Proportional font size helper based on element height and width
  function getTypography(h, w, isBtn = false, isBdg = false) {
    if (isBdg) return { fontSize: 'text-[9px]', leading: 'leading-none', fontClass: 'font-bold' };
    if (h <= 16) return { fontSize: 'text-[8px]', leading: 'leading-none', fontClass: 'font-semibold' };
    if (h <= 20) return { fontSize: 'text-[9px]', leading: 'leading-tight', fontClass: isBtn ? 'font-bold' : 'font-medium' };
    if (h <= 26) return { fontSize: 'text-[10px]', leading: 'leading-snug', fontClass: isBtn ? 'font-bold' : 'font-medium' };
    if (h <= 34) return { fontSize: (w && w < 95) ? 'text-[11px]' : 'text-xs', leading: 'leading-normal', fontClass: isBtn ? 'font-bold' : 'font-medium' };
    if (h <= 50) return { fontSize: (w && w < 100) ? 'text-[11px]' : 'text-xs', leading: 'leading-normal', fontClass: 'font-bold' };
    if (isBtn && w && w <= 100) return { fontSize: 'text-xs', leading: 'leading-snug', fontClass: 'font-bold' };
    return { fontSize: 'text-sm', leading: 'leading-normal', fontClass: 'font-bold' };
  }

  // -------------------------------------------------------------
  // COMPLETE CHINESE & MACHINE TOKEN TRANSLATION DICTIONARY
  // -------------------------------------------------------------
  const CHINESE_TRANSLATIONS = {
    '面板容器': 'Faceplate',
    '文本域': 'Telemetry',
    '文本': 'Text',
    '按钮': 'Button',
    '矩形': 'Panel',
    '圆': 'Indicator',
    '线': 'Line',
    '报警控件': 'AlarmControl',
    '趋势控件': 'TrendControl',
    '网络控件': 'WebControl',
    '系统诊断控制': 'SysDiagnosis',
    '符号': 'Symbol',
    '域': 'Field',
    '图形': 'Graphic'
  };

  // Label sanitizer: translates Chinese terms, cleans machine suffixes, and returns pure English labels
  function sanitizeLabel(raw, type = '') {
    if (!raw) return '';
    let clean = raw.replace(/\u00a0/g, ' ').trim();
    if (/^[?_0-9\s]+$/.test(clean)) {
      return '';
    }

    // Replace all known Chinese terms
    for (const [zh, en] of Object.entries(CHINESE_TRANSLATIONS)) {
      if (clean.includes(zh)) {
        clean = clean.replace(new RegExp(zh, 'g'), en);
      }
    }

    // Strip any lingering non-ASCII / Hanzi characters to prevent any Chinese remnants
    clean = clean.replace(/[\u4e00-\u9fa5]/g, '').trim();

    if (clean.startsWith('IO Field') || clean.startsWith('IO 域') || clean.startsWith('Field')) {
      return '0.00';
    }

    // Format cleaner label
    clean = clean.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    // Strip any residual mojibake / hangul compatibility jamo such as ᆉ
    clean = clean.replace(/[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF\uFFFD]/g, '').trim();
    return clean;
  }

  // Generate React JSX code
  let jsx = `function ${compName}() {\n`;
  jsx += `  const [activeTab, setActiveTab] = useState('main');\n`;
  jsx += `  const [activeActuator, setActiveActuator] = useState(1);\n\n`;

  jsx += `  return (\n`;
  jsx += `    <div className="relative bg-[#CED3D7] text-[#262221] font-sans border border-[#9CAFB7] shadow-2xl overflow-hidden select-none" style={{ width: '${finalCanvasWidth}px', height: '${finalCanvasHeight}px', minHeight: '${finalCanvasHeight}px' }}>\n`;
  
  // Authentic TIA Portal background grid with exact sampled industrial dot matrix
  jsx += `      {/* Siemens TIA Portal Engineering Background */}\n`;
  jsx += `      <div className="absolute inset-0 bg-[#CED3D7]" />\n`;
  jsx += `      <div className="absolute inset-0 bg-[radial-gradient(#9CAFB7_1.2px,transparent_1.2px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />\n\n`;

  // Render Empty Screen fallback if no items exist
  if (fgItems.length === 0) {
    jsx += `      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">\n`;
    jsx += `        <span className="text-sm font-bold text-slate-600 mb-1">Siemens Simatic Panel Window</span>\n`;
    jsx += `        <span className="text-xs text-slate-500 font-mono">[Modal Window: ${cleanName}]</span>\n`;
    jsx += `      </div>\n`;
  }

  // Render Foreground Elements
  fgItems.forEach(el => {
    const isButton = el.type.includes('Button') || el.name.toLowerCase().includes('button') || el.name.toLowerCase().includes('btn') || el.name.toLowerCase().includes('legend');
    const isTextBox = el.type.includes('TextBox') || el.type.includes('Text') || el.name.toLowerCase().includes('text') || el.name.toLowerCase().includes('object_') || el.name.includes('文本');
    const isSymbolicIO = el.type.includes('SymbolicIOField') || el.type.includes('IOField');
    const isLine = el.type.includes('Line') || el.name.includes('Line_') || el.name.includes('线');
    const isGraphic = el.type.includes('GraphicView') || el.name.toLowerCase().includes('cylinder') || el.name.toLowerCase().includes('grafik') || el.name.startsWith('PosDev_') || el.name.includes('图形');

    const typo = getTypography(el.height, el.width, isButton, el.name.startsWith('Position_') || el.name.startsWith('Text_Cylinder_'));
    const safeLabel = sanitizeLabel(el.name, el.type);

    if (isLine) {
      // Clean authentic line: horizontal, vertical, or true SVG diagonal connector
      const isVertical = el.height > el.width && el.width <= 4;
      const isHorizontal = el.width > el.height && el.height <= 4;
      const isDiagonal = el.width > 4 && el.height > 4;
      const isDivider = el.top <= 68 && el.width >= 1000;

      if (isDivider) {
        // Top header ribbon separator line
        jsx += `      {/* Top Header Divider Line */}\n`;
        jsx += `      <div className="absolute border-t-2 border-[#9CAFB7] z-10" style={{ left: '0px', top: '${Math.max(0, el.top)}px', width: '100%' }} />\n`;
      } else if (isVertical) {
        // Vertical bus / feeder line
        jsx += `      {/* Vertical Bus Line: ${el.name} */}\n`;
        jsx += `      <div className="absolute border-l-2 border-[#838C5F]/70 z-10 pointer-events-none" style={{ left: '${Math.max(0, el.left)}px', top: '${Math.max(0, el.top)}px', height: '${el.height}px' }} />\n`;
      } else if (isDiagonal) {
        // True Diagonal connection trace rendered via vector SVG
        jsx += `      {/* Diagonal Trace: ${el.name} */}\n`;
        jsx += `      <svg className="absolute pointer-events-none z-10 overflow-visible" style={{ left: '${Math.max(0, el.left)}px', top: '${Math.max(0, el.top)}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <line x1="0" y1="0" x2="${el.width}" y2="${el.height}" stroke="#838C5F" strokeWidth="1.5" strokeOpacity="0.85" />\n`;
        jsx += `      </svg>\n`;
      } else {
        // Clean schematic connection trace with subtle industrial metallic green/gray styling
        jsx += `      {/* Schematic Trace: ${el.name} */}\n`;
        jsx += `      <div className="absolute border-t border-[#838C5F]/80 z-10 pointer-events-none" style={{ left: '${Math.max(0, el.left)}px', top: '${Math.max(0, el.top)}px', width: '${el.width}px' }} />\n`;
      }
    } else if (isSymbolicIO) {
      const isIOField = el.type === 'HmiIOField';
      const isVerticalBarrier = el.width <= 20 && el.height >= 50;
      const isEmergencySymbol = el.name.toLowerCase().includes('emerg') || el.name.toLowerCase().includes('emergency');

      if (isIOField) {
        jsx += `      {/* Process Value IOField: ${el.name} */}\n`;
        jsx += `      <div className="absolute bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] font-mono font-bold text-xs rounded-sm flex items-center justify-end px-2 shadow-inner z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <span>0.00</span>\n`;
        jsx += `      </div>\n`;
      } else if (isVerticalBarrier) {
        // Vertical Safety Optical Light Barrier / Curtain
        jsx += `      {/* Optical Safety Light Barrier: ${el.name} */}\n`;
        jsx += `      <div className="absolute flex items-center justify-center z-15 pointer-events-none" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <img src="/tia_graphics/barr_V_yellow.png" alt="Light Barrier" className="w-full h-full object-fill opacity-90 drop-shadow-sm" onError={(e)=>{e.target.style.display='none';}} />\n`;
        jsx += `      </div>\n`;
      } else if (isEmergencySymbol) {
        // Emergency Stop / Safety Gate Mushroom E-Stop Button Symbol
        jsx += `      {/* Emergency Stop Safety Icon: ${el.name} */}\n`;
        jsx += `      <div className="absolute flex items-center justify-center z-20 pointer-events-auto cursor-pointer" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <img src="/tia_graphics/Emerg_red.png" alt="E-Stop" className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition" onError={(e)=>{e.target.style.display='none';}} />\n`;
        jsx += `      </div>\n`;
      } else {
        const label = el.name.includes('Title_ScreenOverview') ? (el.left < 600 ? 'SelectJGValve' : 'Valve1To8Pos') : (safeLabel || 'Input Field');
        jsx += `      {/* Header Selector: ${el.name} */}\n`;
        jsx += `      <div className="absolute bg-[#00829E] border border-[#5AB0D3] text-white ${typo.fontClass} ${typo.fontSize} rounded-sm flex items-center justify-between px-2.5 shadow-sm cursor-pointer hover:bg-[#027AAC] transition z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <span className="truncate tracking-wide">${label}</span>\n`;
        jsx += `        <span className="text-[9px] text-white/90 ml-1">▼</span>\n`;
        jsx += `      </div>\n`;
      }
    } else if (isButton) {
      // Check if button is an invisible/transparent overlay touch target covering a card (e.g. Overview_01_Button_1)
      const isCardOverlay = el.name.includes('Overview_01_Button_') || (el.width >= 180 && el.height >= 150);
      
      if (isCardOverlay) {
        jsx += `      {/* Card Hit-Target Overlay: ${el.name} */}\n`;
        jsx += `      <button className="absolute bg-transparent hover:bg-cyan-500/10 border-2 border-transparent hover:border-cyan-400/60 rounded-sm transition cursor-pointer z-30" title="Click Station to view" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }} />\n`;
      } else {
        const isBack = el.name.toLowerCase().includes('back');
        const isLegend = el.name.toLowerCase().includes('legend');
        let label = isBack ? 'Back' : (isLegend ? 'Legend' : (el.name.replace(/^Button_|^Btn_|^Move_|^Fusszeile_Button_/, '').replace(/_/g, ' ') || 'Button'));
        
        // Format Siemens Header Manual Operation buttons cleanly (e.g. "Manual OP 1", "Manual OP 2")
        if (el.name.includes('ManualOPMode')) {
          const modeMatch = el.name.match(/ManualOPMode(\d+)_?(\d*)/i);
          if (modeMatch) {
            const mNum = modeMatch[2] || modeMatch[1] || '1';
            label = `Manual OP ${mNum}`;
          } else {
            label = 'Manual OP';
          }
        } else if (el.name.startsWith('按钮_') || el.name.startsWith('按钮')) {
          label = safeLabel.replace('Fusszeile Button ', '');
        }

        jsx += `      {/* Action Button: ${el.name} */}\n`;
        jsx += `      <button className="absolute bg-[#027AAC] hover:bg-[#00829E] border border-[#5AB0D3] text-white ${typo.fontClass} ${typo.fontSize} rounded-sm flex items-center justify-center transition shadow-sm active:scale-95 px-1 z-20 text-center leading-tight" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        if (isBack) {
          jsx += `        <span className="flex items-center gap-1.5 truncate"><img src="/tia_graphics/SICAR_Back01_Black_24x12.png" alt="" className="w-3.5 h-2.5 brightness-200 invert" onError={(e)=>{e.target.style.display='none';}} /><span className="truncate">${label}</span></span>\n`;
        } else {
          jsx += `        <span className="truncate w-full text-center">${label}</span>\n`;
        }
        jsx += `      </button>\n`;
      }
    } else if (isGraphic) {
      // Smart graphic asset resolution with screen context
      const graphicSrc = resolveSiemensGraphic(el.name, screenName);
      jsx += `      {/* Siemens Graphic View: ${el.name} */}\n`;
      jsx += `      <div className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group z-10" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <img src="${graphicSrc}" alt="${el.name}" className="w-full h-full object-contain filter drop-shadow group-hover:brightness-110 transition" onError={(e)=>{e.target.style.display='none';}} />\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('Circle')) {
      // Indicator LED circle (green / red / gray status lamps)
      const isRed = el.name.toLowerCase().includes('fault') || el.name.toLowerCase().includes('alarm') || el.name.toLowerCase().includes('stop');
      const isGreen = el.name.toLowerCase().includes('ok') || el.name.toLowerCase().includes('auto') || el.name.toLowerCase().includes('run') || el.name.toLowerCase().includes('home') || el.name.toLowerCase().includes('work');
      const ledColor = isRed ? 'bg-[#DC2626] border-[#991B1B]' : (isGreen ? 'bg-[#16A34A] border-[#166534]' : 'bg-[#94A3B8] border-[#64748B]');
      jsx += `      {/* Siemens Status LED: ${el.name} */}\n`;
      jsx += `      <div className="absolute rounded-full shadow-inner ${ledColor} border flex items-center justify-center z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }} />\n`;
    } else if (el.type.includes('AlarmControl')) {
      // Authentic Siemens Alarm Control View
      jsx += `      {/* Siemens Alarm Control View: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-[#F8FAFC] border-2 border-[#9CAFB7] rounded-sm shadow-md flex flex-col overflow-hidden text-xs text-[#262221] z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <div className="bg-[#DEDFE1] border-b border-[#C3C3C3] px-2 py-1 flex items-center justify-between font-bold text-[10px]">\n`;
      jsx += `          <span className="flex items-center gap-1.5 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>ALARM & EVENT LOG</span>\n`;
      jsx += `          <span className="text-slate-500 font-mono">Siemens AlarmControl</span>\n`;
      jsx += `        </div>\n`;
      jsx += `        <div className="flex-1 p-2 space-y-1 font-mono text-[10px] overflow-y-auto bg-slate-50">\n`;
      jsx += `          <div className="flex items-center justify-between p-1 bg-red-50 text-red-700 border-l-2 border-red-500"><span>[FAULT] 140M1 Zone Emergency Circuit Disconnected</span><span>08:42:10</span></div>\n`;
      jsx += `          <div className="flex items-center justify-between p-1 bg-amber-50 text-amber-800 border-l-2 border-amber-500"><span>[WARN] Robot Gripper 190RB02 Pressure Threshold</span><span>08:41:55</span></div>\n`;
      jsx += `        </div>\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('TrendControl')) {
      // Trend Control / Waveform Graphs
      jsx += `      {/* Siemens Trend / Cycle Times Control: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-[#1E293B] border border-[#475569] rounded-sm shadow-md flex flex-col p-2 text-white overflow-hidden z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold mb-1 font-mono">\n`;
      jsx += `          <span>CYCLE TIME TREND (ms)</span>\n`;
      jsx += `          <span className="text-emerald-400">REALTIME</span>\n`;
      jsx += `        </div>\n`;
      jsx += `        <div className="flex-1 flex items-end gap-1.5 border-b border-l border-slate-600 p-1">\n`;
      jsx += `          <div className="w-1/6 bg-cyan-500 h-[60%] rounded-t-sm"></div>\n`;
      jsx += `          <div className="w-1/6 bg-cyan-400 h-[75%] rounded-t-sm"></div>\n`;
      jsx += `          <div className="w-1/6 bg-cyan-500 h-[50%] rounded-t-sm"></div>\n`;
      jsx += `          <div className="w-1/6 bg-cyan-400 h-[90%] rounded-t-sm"></div>\n`;
      jsx += `          <div className="w-1/6 bg-emerald-500 h-[65%] rounded-t-sm"></div>\n`;
      jsx += `        </div>\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('SystemDiagnosisControl')) {
      // System Diagnosis Control
      jsx += `      {/* Siemens System Diagnostic View: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-[#DEDFE1] border-2 border-[#9CAFB7] rounded-sm shadow-md flex flex-col p-2 overflow-hidden z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <span className="font-bold text-xs text-[#027AAC] mb-1">PROFINET System Hardware Topology</span>\n`;
      jsx += `        <div className="flex-1 bg-white rounded border border-[#C3C3C3] p-2 font-mono text-[10px] text-slate-700">\n`;
      jsx += `          <p className="text-emerald-600 font-bold">✔ PLC S7-1500 (192.168.0.10) - Normal Operation</p>\n`;
      jsx += `          <p className="text-emerald-600 font-bold">✔ ET200SP Remote IO Rack 1 - OK</p>\n`;
      jsx += `          <p className="text-emerald-600 font-bold">✔ KUKA KRC4 Industrial Robot Controller - OK</p>\n`;
      jsx += `        </div>\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('Bar')) {
      // Progress / Level Bar
      jsx += `      {/* Siemens Bar Widget: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-[#CBD5E1] border border-[#94A3B8] rounded-sm overflow-hidden p-0.5 z-10" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <div className="h-full bg-gradient-to-r from-cyan-600 to-emerald-500 rounded-sm" style={{ width: '68%' }} />\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('Polygon')) {
      // Geometric Chevron or Custom Shape
      jsx += `      {/* Siemens Polygon Shape: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-[#027AAC] opacity-80 rounded-sm z-10" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }} />\n`;
    } else if (el.type.includes('ScreenWindow')) {
      // Embedded Screen Window Container
      jsx += `      {/* Siemens Sub-Screen Window: ${el.name} */}\n`;
      jsx += `      <div className="absolute border border-dashed border-[#027AAC]/60 bg-[#DEDFE1]/40 rounded-sm flex items-center justify-center p-2 text-slate-600 font-mono text-xs z-10" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <span>[ScreenWindow: ${el.name}]</span>\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('WebControl')) {
      // Web Control / Browser View
      jsx += `      {/* Siemens Web View: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-white border border-[#9CAFB7] rounded-sm shadow-sm flex flex-col overflow-hidden z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <div className="bg-slate-100 px-2 py-1 border-b border-slate-300 text-[10px] font-mono text-slate-500">http://mes.plant.internal/viewer</div>\n`;
      jsx += `        <div className="flex-1 p-3 text-xs text-slate-600 font-sans">MES Production Dashboard Web View</div>\n`;
      jsx += `      </div>\n`;
    } else if (el.type.includes('FaceplateContainer')) {
      // Check if this container is an outer enclosing cell / group boundary vs a compact device
      const isEnclosure = el.width >= 250 && el.height >= 110;
      const fpNumMatch = el.name.match(/\d+$/);
      const fpNum = fpNumMatch ? fpNumMatch[0] : '';
      const displayTitle = el.name.includes('Valve8Pos') ? 'Valve 8-Pos PB' : `Station Device ${fpNum ? '#' + fpNum : ''}`;

      if (isEnclosure) {
        // Enclosing station cell frame: clean, modern semi-transparent panel with subtle header strip
        jsx += `      {/* Siemens Enclosing Station Cell Container: ${el.name} */}\n`;
        jsx += `      <div className="absolute bg-[#ECEFF1]/50 border border-[#B0BEC5] rounded-md shadow-sm flex flex-col p-2 pointer-events-none z-10" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <div className="flex items-center justify-between border-b border-[#CFD8DC] pb-1 mb-1 pointer-events-auto">\n`;
        jsx += `          <span className="text-[11px] font-bold text-[#37474F] tracking-wide uppercase">${displayTitle}</span>\n`;
        jsx += `          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Online"></span>\n`;
        jsx += `        </div>\n`;
        jsx += `      </div>\n`;
      } else {
        // Leaf station device faceplate card with compact industrial styling
        const isUltraCompact = el.width < 90 || el.height < 50;
        const shortTitle = displayTitle.replace('Station Device', 'Device');

        jsx += `      {/* Siemens Faceplate Modular Container: ${el.name} */}\n`;
        jsx += `      <div className="absolute bg-[#DEDFE1] border border-[#9CAFB7] hover:border-[#027AAC] rounded-sm shadow-sm flex flex-col p-1 overflow-hidden transition z-20 pointer-events-auto" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <div className="flex items-center justify-between border-b border-[#C3C3C3] pb-0.5 mb-0.5">\n`;
        jsx += `          <span className="${isUltraCompact ? 'text-[9px]' : 'text-[10px]'} font-bold text-[#027AAC] truncate">${isUltraCompact ? shortTitle : displayTitle}</span>\n`;
        jsx += `          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-0.5"></span>\n`;
        jsx += `        </div>\n`;
        if (el.height >= 40) {
          jsx += `        <div className="flex-1 flex items-center justify-center ${isUltraCompact ? 'text-[8px]' : 'text-[9px]'} text-slate-600 font-mono bg-white/40 rounded-sm px-0.5 text-center leading-tight">\n`;
          jsx += `          <span className="truncate">${isUltraCompact ? `[${shortTitle}]` : `[FP: ${displayTitle}]`}</span>\n`;
          jsx += `        </div>\n`;
        }
        jsx += `      </div>\n`;
      }
    } else if (el.type.includes('Rectangle')) {
      // Background panels or group containers
      const isCardHeader = el.name.startsWith('Overview_01_Shadow_');
      const rectClass = isCardHeader 
        ? 'bg-[#E2E8F0] border-2 border-[#CBD5E1] shadow-md rounded-md' 
        : 'bg-[#DEDFE1]/60 border border-[#C3C3C3] rounded-sm';
      jsx += `      {/* Group Container Rectangle: ${el.name} */}\n`;
      jsx += `      <div className="absolute ${rectClass} pointer-events-none z-0" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }} />\n`;
    } else if (isTextBox) {
      // Check if it's a diagnostic row or header text or badge
      const knownLabel = DIAGNOSTIC_ROW_LABELS[el.name];
      const isHeader = el.top < 65;
      const isBadge = el.name.startsWith('Position_') || el.name.startsWith('Text_Cylinder_');

      if (isBadge) {
        let badgeText = el.name.replace('Position_', '').replace('Text_Cylinder_', 'Cyl. ');
        let badgeStyle = 'bg-[#DEDFE1] text-[#262221] border-[#C3C3C3] font-semibold';
        
        if (el.name.startsWith('Position_Left_') && el.left < 50) {
          if (el.top >= 535) {
            badgeText = 'HOME';
            badgeStyle = 'bg-[#DEDFE1] text-[#15803d] border-[#15803d] font-bold text-[9px] shadow-sm';
          } else if (el.top >= 510) {
            badgeText = 'ALARM';
            badgeStyle = 'bg-[#DEDFE1] text-[#dc2626] border-[#dc2626] font-bold text-[9px] shadow-sm';
          } else {
            badgeText = 'WORK';
            badgeStyle = 'bg-[#DEDFE1] text-[#15803d] border-[#15803d] font-bold text-[9px] shadow-sm';
          }
        } else if (el.name.startsWith('Position_Y')) {
          badgeText = el.name.replace('Position_', '');
          badgeStyle = 'bg-[#FFFFFF] text-[#262221] border-[#B0B7BD] font-bold shadow-sm';
        } else if (el.name.startsWith('Position_Right_')) {
          const num = el.name.replace('Position_Right_', '');
          badgeText = num + 'W';
          badgeStyle = 'bg-[#D2D9BA] text-[#4A5320] border-[#838C5F] font-bold shadow-sm';
        } else if (el.name.startsWith('Position_Left_')) {
          const num = el.name.replace('Position_Left_', '');
          badgeText = num + 'H';
          badgeStyle = 'bg-[#DEDFE1] text-[#262221] border-[#B0B7BD] font-semibold shadow-sm';
        } else if (el.name.startsWith('Text_Cylinder_')) {
          const idx = parseInt(el.name.replace('Text_Cylinder_', ''), 10);
          const cylNum = (idx % 8) + 1;
          badgeText = `Cyl. ${cylNum}`;
          badgeStyle = 'bg-[#CED3D7] text-[#262221] border-none font-bold text-[10px]';
        }

        jsx += `      {/* Actuator Badge: ${el.name} */}\n`;
        jsx += `      <div className="absolute ${badgeStyle} border rounded-sm flex items-center justify-center text-[10px] leading-tight px-0.5 z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <span className="truncate">${badgeText}</span>\n`;
        jsx += `      </div>\n`;
      } else if (isHeader) {
        let headerLabel = safeLabel || el.name;
        let headerBoxClass = `bg-transparent text-[#262221] ${typo.fontClass} ${typo.fontSize}`;
        if (el.name.startsWith('文本_') || el.name.startsWith('文本域_')) {
          const num = el.name.replace(/[^0-9]/g, '');
          headerLabel = `Signal #${num}`;
        } else if (el.name === 'Textfield_Overview_State_1') {
          headerLabel = 'State';
          headerBoxClass = 'bg-[#E2F0E5] text-[#15803d] border border-[#15803d] font-bold text-xs rounded-sm shadow-sm';
        } else if (el.name === 'Textfield_Overview_Alarms') {
          headerLabel = 'Alarms';
          headerBoxClass = 'bg-[#F5DCDD] text-[#dc2626] border border-[#dc2626] font-bold text-xs rounded-sm shadow-sm';
        } else if (el.name === 'TecUnit_Type') {
          headerLabel = 'TecUnit: Valve1To8Pos';
          headerBoxClass = 'bg-transparent text-[#262221] font-bold text-xs tracking-wide';
        } else if (el.name.startsWith('Title_ScreenOverview')) {
          headerLabel = screenName.replace(/_/g, ' ');
          headerBoxClass = 'bg-transparent text-[#027AAC] font-bold text-sm tracking-wide';
        }

        jsx += `      {/* Header Label: ${el.name} */}\n`;
        jsx += `      <div className="absolute ${headerBoxClass} flex items-center justify-center px-1.5 z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <span className="truncate">${headerLabel}</span>\n`;
        jsx += `      </div>\n`;
      } else if (el.name.startsWith('Overview_01_Text_') || el.name.startsWith('Overview_01_TextTyp_')) {
        const cardNumMatch = el.name.match(/\d+$/);
        const cardNum = cardNumMatch ? cardNumMatch[0] : '1';
        const isType = el.name.includes('TextTyp');
        const cardTitle = isType ? `Type: Model-${cardNum}` : `Station 1${cardNum}0 APC Lifter`;
        const cardStyle = isType ? 'text-xs text-slate-500 font-mono' : 'text-sm font-bold text-[#027AAC] tracking-wide';
        jsx += `      {/* Card Header Text: ${el.name} */}\n`;
        jsx += `      <div className="absolute ${cardStyle} flex items-center px-2 z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <span className="truncate">${cardTitle}</span>\n`;
        jsx += `      </div>\n`;
      } else {
        // Diagnostic telemetry row boxes (Authentic Siemens TIA Portal metallic light gray strips)
        let rowText = knownLabel || safeLabel;
        if (el.name.startsWith('文本域_') || el.name.startsWith('文本_')) {
          const num = el.name.replace(/[^0-9]/g, '');
          rowText = `Signal #${num}`;
        }
        jsx += `      {/* Diagnostic Row: ${el.name} */}\n`;
        jsx += `      <div className="absolute bg-[#DEDFE1] text-[#262221] border border-[#C3C3C3] hover:bg-[#EAEAEA] ${typo.fontClass} ${typo.fontSize} flex items-center px-2 shadow-none rounded-[1px] transition overflow-hidden z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
        jsx += `        <span className="truncate font-sans">${rowText}</span>\n`;
        jsx += `      </div>\n`;
      }
    } else {
      jsx += `      {/* HMI Widget: ${el.name} */}\n`;
      jsx += `      <div className="absolute bg-[#DEDFE1] border border-[#C3C3C3] rounded-sm flex items-center justify-center ${typo.fontSize} ${typo.fontClass} text-[#262221] shadow-none overflow-hidden px-1 z-20" style={{ left: '${el.left}px', top: '${el.top}px', width: '${el.width}px', height: '${el.height}px' }}>\n`;
      jsx += `        <span className="truncate">${safeLabel}</span>\n`;
      jsx += `      </div>\n`;
    }
  });

  jsx += `    </div>\n`;
  jsx += `  );\n`;
  jsx += `}\n`;

  return jsx;
}

module.exports = { parseSimaticXmlToJsx };
