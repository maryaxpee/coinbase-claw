@echo off
title Coinbase x Openclaw Launcher
color 0B

echo.
echo  ================================================
echo    Coinbase x Openclaw - Windows Launcher
echo  ================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo  Please download it from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Install dependencies if node_modules missing
if not exist "node_modules\" (
    echo  [INFO] Installing dependencies...
    call npm install
    echo.
)

:: Create .env if missing
if not exist ".env" (
    echo  [INFO] Creating .env from template...
    copy .env.example .env >nul
    echo  [WARN] Please fill in your API keys in .env before continuing.
    echo.
    pause
)

:: Launch the app
echo  [INFO] Launching application...
echo.
node src/index.js

pause
