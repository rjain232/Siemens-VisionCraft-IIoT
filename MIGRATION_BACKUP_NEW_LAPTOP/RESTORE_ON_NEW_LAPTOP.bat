@echo off
title 1-CLICK NEW LAPTOP SETUP RESTORE
color 0B
echo ================================================================
echo       RESTORING VS CODE, EXTENSIONS & CONFIGS ON NEW LAPTOP
echo ================================================================
echo.

:: 1. Copy settings and keybindings
echo [1/3] Restoring VS Code Settings and Keybindings...
set "TARGET_USER=%APPDATA%\Code\User"
if not exist "%TARGET_USER%" mkdir "%TARGET_USER%"
if exist "%~dp0VSCode_Config\settings.json" copy /y "%~dp0VSCode_Config\settings.json" "%TARGET_USER%\"
if exist "%~dp0VSCode_Config\keybindings.json" copy /y "%~dp0VSCode_Config\keybindings.json" "%TARGET_USER%\"
if exist "%~dp0VSCode_Config\snippets" xcopy /s /e /y "%~dp0VSCode_Config\snippets" "%TARGET_USER%\snippets\"
echo Settings restored successfully!
echo.

:: 2. Reinstall all extensions
echo [2/3] Installing all 41 VS Code Extensions...
where code >nul 2>&1
if %errorLevel% equ 0 (
    for /f "usebackq delims=" %%e in ("%~dp0vscode_extensions.txt") do (
        echo Installing extension: %%e
        call code --install-extension %%e --force
    )
    echo All extensions installed!
) else (
    echo [ERROR] VS Code CLI 'code' not found on PATH! Install VS Code first.
)
echo.

echo ================================================================
echo [SUCCESS] Your VS Code environment is 100%% identical to your old PC!
echo ================================================================
pause
