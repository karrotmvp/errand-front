#! /usr/bin/env node

const dotenv = require("dotenv");
dotenv.config();

const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;
const APP_ID = process.env.DEV_APP_ID || 0;

async function generateQR() {
  try {
    exec(
      `karrot-mini dev -p ${PORT} --appId ${APP_ID}`,
      (error, stdout, stderr) => {
        console.log(stdout);
      }
    );
  } catch (e) {
    console.log(e);
  }
}

generateQR();
