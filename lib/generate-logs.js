const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetFile = process.argv[2];
if (!targetFile) {
    console.error("Usage: node generate-logs.js <path-to-js-file>");
    process.exit(1);
}

const baseName = path.basename(targetFile, '.js');
const logDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
const isolateLogFile = path.join(logDir, `${baseName}-v8.log`);

const v8Flags = [
    '--log',
    `--logfile=${isolateLogFile}`,
    '--log-deopt',
    '--log-ic'
];

const child = spawn(process.execPath, [...v8Flags, targetFile], {
    stdio: 'inherit',
});

child.on('close', (code) => {
    console.log('Isolate log file generated:', isolateLogFile);
});
