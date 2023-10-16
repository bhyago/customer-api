export interface CustomerModel {
  id?: number
  full_name?: string | null
  birthday?: Date | null
  cpf?: string | null
  comercial_phone?: string | null
  home_phone?: string | null
  email?: string | null
  register_date: Date
  last_update?: Date | null
  company?: string | null
  income?: number | null
  obs?: string | null
  active?: boolean
  mobile_number?: string | null
  sex?: string | null
  password?: string
  blocked?: boolean
  is_complete?: boolean
  id_employeeregister?: number | null
  id_employeeupdated?: number | null
  id_persona?: number | null
  id_mallorign: number
  id_mall?: number | null
  flg_emailvalid?: boolean | null
  id_loyalty_wallet?: string | null
  id_loyalty_wallet_pin?: string | null
  key_moneri_id?: number | null
  cod_payment?: string | null
  flg_loyaltyblocked?: boolean
  cod_externalcustomer?: string | null
  cod_externalcustomercompany?: string | null
}
