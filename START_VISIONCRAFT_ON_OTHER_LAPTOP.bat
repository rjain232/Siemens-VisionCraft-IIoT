@echo off
title Siemens VisionCraft IIoT - 1-Click Launch on New Laptop
color 0A

echo =======================================================================
echo   STARTING SIEMENS VISIONCRAFT IIOT + HMI SUITE ON NEW LAPTOP
echo =======================================================================
echo.

:: 1. Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [-] Node.js is not installed or not in PATH!
    echo Please install Node.js LTS from https://nodejs.org/
    pause
    exit /b 1
)

:: 2. Launch ImageToJSX_Agent (VisionCraft Studio on Port 4000)
echo [*] Starting VisionCraft Transpiler & Studio on Port 4000...
start "VisionCraft Studio (Port 4000)" cmd /k "cd /d "%~dp0ImageToJSX_Agent" && npm start"

:: 3. Launch JSW_Backend HMI Bridge (Port 5055 & Port 5050)
echo [*] Starting Siemens HMI WebSocket Bridge on Port 5055...
start "Siemens HMI Bridge (Port 5055)" cmd /k "cd /d "%~dp0JSW_Backend" && node start_hmi_server.js"

:: 4. Launch React SCADA Dashboard (Port 3000)
echo [*] Starting JSW SCADA Industrial Dashboard on Port 3000...
start "JSW SCADA HMI (Port 3000)" cmd /k "cd /d "%~dp0JSW_UI" && npm run dev"

echo.
echo =======================================================================
echo   ALL SERVICES LAUNCHED SUCCESSFULLY!
echo =======================================================================
echo   - VisionCraft Studio:     http://localhost:4000
echo   - JSW Industrial HMI:     http://localhost:3000
echo   - Siemens HMI WebSocket:  ws://localhost:5055/ws/siemens-hmi
echo =======================================================================
echo.
pause
