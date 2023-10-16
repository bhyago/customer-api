"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDependentController = void 0;
const create_dependent_1 = require("../../../application/use-cases/create-dependent");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../pipes/zod-validation.pipe");
const createDependentQuerySchema = zod_1.z.object({ mallId: zod_1.z.coerce.number() });
const createDependentBodySchema = zod_1.z.object({
    responsibleId: zod_1.z.number().int().positive(),
    originId: zod_1.z.number().int().positive(),
    dependents: zod_1.z.array(zod_1.z
        .object({
        id: zod_1.z.number().int().min(1).optional(),
        name: zod_1.z.string().max(200).optional(),
        birthDate: zod_1.z.coerce.date().optional(),
        genre: zod_1.z.enum(['M', 'F', 'O']).optional(),
        degreekinshipId: zod_1.z.number().int().positive(),
    })
        .refine((data) => {
        return (data.id != null ||
            (data.name != null && data.degreekinshipId != null));
    }, {
        message: "Either 'id' must be present, or both 'name' and 'degreekinshipId' must be present",
    })),
});
let CreateDependentController = class CreateDependentController {
    createDependent;
    constructor(createDependent) {
        this.createDependent = createDependent;
    }
    async handle(body, query) {
        const { dependents, originId, responsibleId } = createDependentBodySchema.parse(body);
        const { mallId } = query;
        await this.createDependent.execute({
            dependents,
            employeeId: 1000,
            mallId,
            originId,
            responsibleId,
        });
    }
};
exports.CreateDependentController = CreateDependentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(createDependentBodySchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreateDependentController.prototype, "handle", null);
exports.CreateDependentController = CreateDependentController = __decorate([
    (0, common_1.Controller)('customers/dependents'),
    __metadata("design:paramtypes", [create_dependent_1.CreateDependentUseCase])
], CreateDependentController);
//# sourceMappingURL=create-dependent.controller.js.map