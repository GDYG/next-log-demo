import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

export type LogLevel = "error" | "warn" | "info" | "debug";

type TransformableInfo = {
  level: LogLevel;
  message: string;
  timestamp: string;
} & Record<string, unknown>;

const customFormat = format.combine(
  format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  format.json(),
  format.printf((info: TransformableInfo | unknown) => {
    // const { level, message, timestamp, ...args } = info;
    // return `${level}: ${[timestamp]}: ${message} - ${JSON.stringify(args)}`;
    return JSON.stringify(info);
  })
);
const defaultOptions = {
  format: customFormat,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  // maxFiles: "14d",
  frequency: "24h",
  // meta: false, // 禁用元数据记录
  meta: true,
};

const globalLogger = createLogger({
  format: customFormat,
  transports: [
    new (transports as any).DailyRotateFile({
      filename: "logs/info-%DATE%.log",
      level: "info",
      ...defaultOptions,
    }),
    new (transports as any).DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      level: "error",
      ...defaultOptions,
    }),
  ],
  exitOnError: false,
  exceptionHandlers: [
    new (transports as any).DailyRotateFile({
      filename: "logs/exceptions.log",
    }),
  ],
});

export { globalLogger };
