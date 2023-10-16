import { Dependent } from '@/domain/entities/dependent'
import { CustomerDependencyModel } from '../models/customer-dependency-model'

export class PgCustomerDependencyMapper {
  static toDomain(pg: CustomerDependencyModel): Dependent {
    return Dependent.restore({
      degreekinshipId: pg.id_degreekinship,
      dependentId: pg.id_clientdependency,
      responsibleId: pg.id_clientresponsable,
      active: pg.flg_active!,
    })
  }

  static toPg(domain: Dependent): CustomerDependencyModel {
    return {
      id_clientdependency: domain.props.dependentId,
      id_clientresponsable: domain.props.dependentId,
      flg_active: domain.props.active,
      id_degreekinship: domain.props.degreekinshipId,
    }
  }
}
