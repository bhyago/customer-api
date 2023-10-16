type WhereQuery<T> = WhereCondition<T> | WhereCondition<T>[]

export type WhereCondition<T> = {
  [P in keyof T]?: T[P] | WhereQuery<T> | { $ne: T[P] }
} & {
  $and?: WhereCondition<T>[]
  $or?: WhereCondition<T>[]
}

export type OperationValue = {
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type UpdateData<T> = {
  [P in keyof T]?: T[P] | OperationValue
}
