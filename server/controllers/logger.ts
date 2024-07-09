import winston from "winston";

const { globalLogger } = require("./winston-logger");

export type LoggerType = {
  error: winston.Logger["error"];
  info: winston.Logger["info"];
  warn: winston.Logger["warn"];
  debug: winston.Logger["debug"];
  log: winston.Logger["log"];
};

class Logger implements LoggerType {
  error(...args: any[]) {
    return globalLogger.error(args);
  }

  info(...args: any[]) {
    return globalLogger.info(args);
  }

  warn(...args: any[]) {
    return globalLogger.warn(args);
  }

  debug(...args: any[]) {
    return globalLogger.debug(args);
  }

  log(...args: any[]) {
    return globalLogger.log(args);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Logger();
