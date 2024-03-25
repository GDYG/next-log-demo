import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

export type LogLevel = "error" | "warn" | "info" | "debug";

interface TransformableInfo {
  level: LogLevel;
  timestamp: any;
  message: any;
  text: string;
}

const customFormat = format.combine(
  format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  format.align(),
  format.printf((info: any) => {
    const { level, message, timestamp, ...args } = info;
    console.log(1213, info, args);

    return `${level}: ${[timestamp]}: ${message} - ${JSON.stringify(args)}`;
  })
);
const defaultOptions = {
  format: customFormat,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  frequency: "1m",
  meta: false, // 禁用元数据记录
  //format: format.json()
};

const globalLogger = createLogger({
  format: customFormat,
  transports: [
    // new transports.Console(), //将日志输出在控制台
    new transports.DailyRotateFile({
      filename: "logs/info-%DATE%.log",
      level: "info",
      ...defaultOptions,
    }),
    new transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      level: "error",
      ...defaultOptions,
    }),
  ],
  exitOnError: false,
  exceptionHandlers: [
    new transports.DailyRotateFile({
      filename: "logs/exceptions.log",
    }),
  ],
});

export { globalLogger };
