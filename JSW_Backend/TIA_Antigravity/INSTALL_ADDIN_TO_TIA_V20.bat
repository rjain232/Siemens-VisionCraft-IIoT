@echo off
setlocal
echo Installing Antigravity Gemini AI AddIn into Siemens TIA Portal V20...
copy /Y "C:\Users\SDS\OneDrive - dacpl.in\Desktop\JSW\JSW_Backend\TIA_Antigravity\TIA_Antigravity_AddIn.addin" "C:\Program Files\Siemens\Automation\Portal V20\AddIns\TIA_Antigravity_AddIn.addin"
if %errorLevel% equ 0 (
    echo [+] Successfully installed to C:\Program Files\Siemens\Automation\Portal V20\AddIns\TIA_Antigravity_AddIn.addin
) else (
    echo [-] Failed to install. Please run as Administrator.
)
pause
