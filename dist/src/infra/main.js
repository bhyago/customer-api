"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_service_1 = require("./env/env.service");
const winston_service_1 = require("./logger/winston.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('/mos/v1/customer-management');
    app.useLogger(new winston_service_1.WinstonLogger());
    const env = app.get(env_service_1.EnvService);
    await app.listen(env.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map