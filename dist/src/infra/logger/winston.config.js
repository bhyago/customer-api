"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.winstonConfig = void 0;
const winston_1 = require("winston");
exports.winstonConfig = {
    level: 'info',
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.colorize(), winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.transports.Console(),
    ],
};
exports.logger = (0, winston_1.createLogger)(exports.winstonConfig);
//# sourceMappingURL=winston.config.js.map