"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonLogger = void 0;
const winston_config_1 = require("./winston.config");
class WinstonLogger {
    log(message) {
        winston_config_1.logger.info(message);
    }
    error(message, trace) {
        winston_config_1.logger.error(message, { trace });
    }
    warn(message) {
        winston_config_1.logger.warn(message);
    }
    debug(message) {
        winston_config_1.logger.debug(message);
    }
    verbose(message) {
        winston_config_1.logger.verbose(message);
    }
}
exports.WinstonLogger = WinstonLogger;
//# sourceMappingURL=winston.service.js.map