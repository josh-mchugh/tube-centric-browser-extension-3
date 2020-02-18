function createLogger() {

    const logger = require("loglevel");
    process.env.NODE_ENV === 'production' ? logger.enableAll() : logger.disableAll();

    return logger;
}

module.exports.Logger = createLogger();