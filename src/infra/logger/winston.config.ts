import { createLogger, format, transports } from 'winston'

export const winstonConfig = {
  level: 'info',
  format: format.combine(
    format.json(),
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console(),
    // Add other transports like `winston-daily-rotate-file` here if needed.
  ],
}

export const logger = createLogger(winstonConfig)
