const { exec } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const nodeExecutable = process.execPath;
const scriptToProfile = path.join(__dirname, 'test-logic.js');
const v8LogFile = path.join(__dirname, 'v8.log');

// Define the required flags for Node.js 16+
const flags = [
  '--log-deopt',
  '--log-ic',
].join(' ');

// Construct the command, ensuring paths are quoted
const command = `"${nodeExecutable}" ${flags} "${scriptToProfile}"`;

// Delete previous log file if it exists
if (fs.existsSync(v8LogFile)) {
  fs.unlinkSync(v8LogFile);
}

console.log(`Executing: ${command}`);

// Run the command and pipe its output directly to this script's output
const child = exec(command);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

child.on('exit', (code) => {
  console.log(`\nExecution finished. Check for '${v8LogFile}'. Exit code: ${code ?? 'N/A'}`);
});