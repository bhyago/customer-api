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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDependentUseCase = void 0;
const customer_1 = require("../../domain/entities/customer");
const dependent_1 = require("../../domain/entities/dependent");
const common_1 = require("@nestjs/common");
const customer_2 = require("../gateway-contracts/repositories/customer");
const degree_kinship_1 = require("../gateway-contracts/repositories/degree-kinship");
const dependent_2 = require("../gateway-contracts/repositories/dependent");
const mall_origin_repository_1 = require("../gateway-contracts/repositories/mall-origin-repository");
const customer_dependent_not_found_error_1 = require("./errors/customer-dependent-not-found-error");
const dependency_degree_not_found_error_1 = require("./errors/dependency-degree-not-found-error");
const invalid_origin_error_1 = require("./errors/invalid-origin-error");
const kinship_already_register_error_1 = require("./errors/kinship-already-register-error");
const kinship_not_found_error_1 = require("./errors/kinship-not-found-error");
const missing_responsible_contact_info_1 = require("./errors/missing-responsible-contact-info");
const responsible_not_found_1 = require("./errors/responsible-not-found");
const simultaneous_dependent_responsible_error_1 = require("./errors/simultaneous-dependent-responsible-error");
let CreateDependentUseCase = class CreateDependentUseCase {
    customerRepository;
    dependentRepository;
    degreeKinshipRepository;
    mallOriginRepository;
    constructor(customerRepository, dependentRepository, degreeKinshipRepository, mallOriginRepository) {
        this.customerRepository = customerRepository;
        this.dependentRepository = dependentRepository;
        this.degreeKinshipRepository = degreeKinshipRepository;
        this.mallOriginRepository = mallOriginRepository;
    }
    async execute(input) {
        const findConcurrentCustomers = input.dependents.find((item) => item.id === input.responsibleId);
        if (findConcurrentCustomers) {
            throw new simultaneous_dependent_responsible_error_1.SimultaneousDependentResponsibleError();
        }
        const responsibleExists = await this.customerRepository.findById({
            id: input.responsibleId,
            mallId: input.mallId,
        });
        if (!responsibleExists) {
            throw new responsible_not_found_1.ResponsibleNotFoundError();
        }
        if (!responsibleExists.props.mobileNumber &&
            !responsibleExists.props.email) {
            throw new missing_responsible_contact_info_1.MissingResponsibleContactInfoError();
        }
        const newCustomer = input.dependents.filter((dependent) => {
            return dependent?.id === undefined || null;
        });
        const newAssociations = input.dependents.filter((dependent) => {
            return dependent?.id !== undefined && typeof dependent?.id === 'number';
        });
        if (newAssociations) {
            for (const dependent of newAssociations) {
                const customerDependentExists = await this.customerRepository.findById({
                    id: dependent.id,
                    mallId: input.mallId,
                });
                if (!customerDependentExists) {
                    throw new customer_dependent_not_found_error_1.CustomerDependentNotFoundError();
                }
                const dependentKinshipAlreadyExists = await this.dependentRepository.findAssociationBetweenCustomer({
                    dependentId: dependent.id,
                    responsibleId: input.responsibleId,
                });
                if (dependentKinshipAlreadyExists?.id) {
                    throw new kinship_already_register_error_1.KinshipAlreadyRegisteredError();
                }
                const degreeKinshipExists = await this.degreeKinshipRepository.findById(dependent.degreekinshipId);
                if (!degreeKinshipExists) {
                    throw new kinship_not_found_error_1.KinshipNotFoundError(dependent.name || customerDependentExists.props.fullName);
                }
                const createDependency = dependent_1.Dependent.create({
                    degreekinshipId: dependent.degreekinshipId,
                    dependentId: dependent.id,
                    responsibleId: input.responsibleId,
                });
                await this.dependentRepository.save(createDependency);
            }
        }
        if (newCustomer) {
            for (const dependent of newCustomer) {
                const degreeKinship = await this.degreeKinshipRepository.findById(dependent.degreekinshipId);
                if (!degreeKinship) {
                    throw new dependency_degree_not_found_error_1.DependencyDegreeNotFoundError(dependent.name);
                }
                const mallOrigin = await this.mallOriginRepository.findMallOriginById({
                    mallId: input.mallId,
                    originId: input.originId,
                });
                if (!mallOrigin) {
                    throw new invalid_origin_error_1.InvalidOriginError();
                }
                const createCustomer = await customer_1.Customer.create({
                    fullName: dependent.name,
                    email: responsibleExists?.props.email,
                    birthDate: dependent.birthDate ? new Date(dependent.birthDate) : null,
                    mobileNumber: responsibleExists?.props.mobileNumber,
                    genre: dependent?.genre,
                    mallOriginId: mallOrigin.id_mallorign,
                    mallId: input.mallId,
                    creatorEmployeeId: input.employeeId,
                    personaId: 1,
                });
                const created = await this.customerRepository.save(createCustomer);
                const createDependency = dependent_1.Dependent.create({
                    degreekinshipId: dependent.degreekinshipId,
                    dependentId: created.id,
                    responsibleId: input.responsibleId,
                });
                await this.dependentRepository.save(createDependency);
            }
        }
    }
};
exports.CreateDependentUseCase = CreateDependentUseCase;
exports.CreateDependentUseCase = CreateDependentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_2.CustomerRepository,
        dependent_2.DependentRepository,
        degree_kinship_1.DegreeKinshipRepository,
        mall_origin_repository_1.MallOriginRepository])
], CreateDependentUseCase);
//# sourceMappingURL=create-dependent.js.map