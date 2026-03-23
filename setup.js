const fs = require('fs');
const path = require('path');

const envExample = path.join(__dirname, '..', '.env.example');
const envFile = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envFile)) {
  fs.copyFileSync(envExample, envFile);
  console.log('[setup] .env file created from .env.example');
  console.log('[setup] Please fill in your API credentials in .env before running the app.');
} else {
  console.log('[setup] .env already exists — skipping.');
}
