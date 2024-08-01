const fs = require('fs');
require('dotenv').config();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const htmlFilePath = 'index.html';

let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
htmlContent = htmlContent.replace('YOUR_API_KEY', apiKey);
fs.writeFileSync(htmlFilePath, htmlContent);

console.log('Build completed with API key.');