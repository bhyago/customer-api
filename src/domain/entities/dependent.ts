import { Entity } from '@/core/entities/entity'

export interface DependentProps {
  responsibleId: number
  degreekinshipId?: number | null
  dependentId: number
  active: boolean
}

export class Dependent extends Entity<DependentProps> {
  static create(props: Omit<DependentProps, 'active'>) {
    return new Dependent({
      ...props,
      active: true,
    })
  }

  static restore(props: DependentProps) {
    return new Dependent({
      ...props,
    })
  }
}
