@echo off
cd %~dp0

call pm2 -v >nul 2>&1 || call npm install pm2 -g

IF NOT EXIST node_modules (
    echo node_modules not found, running npm install
    call npm install
)

call npm run build

call pm2 start ecosystem.config.js

echo Server run successfully, press any key to exit
timeout 10000