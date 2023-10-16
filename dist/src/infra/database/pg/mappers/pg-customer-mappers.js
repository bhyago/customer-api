"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgCustomerMapper = void 0;
const customer_1 = require("../../../../domain/entities/customer");
class PgCustomerMapper {
    static toDomain(pg) {
        return customer_1.Customer.restore({
            creatorEmployeeId: pg.id_employeeregister,
            mallId: pg.id_mall,
            mallOriginId: pg.id_mallorign,
            personaId: pg.id_persona,
            birthDate: pg.birthday,
            commercialPhone: pg.comercial_phone,
            company: pg.company,
            cpf: pg.cpf,
            email: pg.email,
            externalCustomerCode: pg.cod_externalcustomer,
            externalCustomerCompanyCode: pg.cod_externalcustomercompany,
            fullName: pg.full_name,
            genre: pg.sex,
            homePhone: pg.home_phone,
            active: pg.active,
            blocked: pg.blocked,
            registerDate: pg.register_date,
            emailValid: pg.flg_emailvalid,
            income: pg.income,
            isComplete: pg.is_complete,
            lastUpdate: pg.last_update,
            loyaltyBlocked: pg.flg_loyaltyblocked,
            loyaltyWalletId: pg.id_loyalty_wallet,
            loyaltyWalletPin: pg.id_loyalty_wallet_pin,
            mobileNumber: pg.mobile_number,
            moneriId: pg.key_moneri_id,
            observation: pg.obs,
            password: pg.password,
            paymentCode: pg.cod_payment,
            updaterEmployeeId: pg.id_employeeupdated,
        }, pg.id);
    }
    static toPg(domain) {
        return {
            id_mallorign: domain.props.mallOriginId,
            register_date: domain.props.registerDate,
            active: domain.props.active,
            birthday: domain.props.birthDate,
            blocked: domain.props.blocked,
            cod_externalcustomer: domain.props.externalCustomerCode,
            cod_externalcustomercompany: domain.props.externalCustomerCompanyCode,
            cod_payment: domain.props.paymentCode,
            comercial_phone: domain.props.commercialPhone,
            company: domain.props.company,
            cpf: domain.props.cpf,
            email: domain.props.email,
            flg_emailvalid: domain.props.emailValid,
            flg_loyaltyblocked: domain.props.loyaltyBlocked?.valueOf(),
            full_name: domain.props.fullName,
            home_phone: domain.props.homePhone,
            id_employeeregister: domain.props.creatorEmployeeId,
            id_employeeupdated: domain.props.updaterEmployeeId,
            id_loyalty_wallet: domain.props.loyaltyWalletId,
            id_loyalty_wallet_pin: domain.props.loyaltyWalletPin,
            id_mall: domain.props.mallId,
            id_persona: domain.props.personaId,
            income: domain.props.income,
            is_complete: domain.props.isComplete?.valueOf(),
            key_moneri_id: domain.props.moneriId,
            last_update: domain.props.lastUpdate,
            mobile_number: domain.props.mobileNumber,
            obs: domain.props.observation,
            password: domain.props.password,
            sex: domain.props.genre,
        };
    }
}
exports.PgCustomerMapper = PgCustomerMapper;
//# sourceMappingURL=pg-customer-mappers.js.map