function createLogger() {

    const logger = require("loglevel");
    if(process.env.REACT_APP_LOGGING_ENABLED === "ENABLED") {

        logger.enableAll()

    } else {

        logger.disableAll();
    }

    return logger;
}

module.exports.Logger = createLogger();