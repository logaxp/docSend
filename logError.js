
const fs = require('fs');
const path = require('path');

const config = {
  logDirectory: path.join(__dirname, 'logs'),
  errorLogFileName: 'docSendError.log',
};

if (!fs.existsSync(config.logDirectory)) {
  fs.mkdirSync(config.logDirectory);
}

const logFilePath = path.join(config.logDirectory, config.errorLogFileName);

function logError(errorMessage) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ERROR: ${errorMessage}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to error log:', err);
    }
  });
}

module.exports = {
  logError,
};
