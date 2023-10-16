export abstract class MallOriginRepository {
  abstract findMallOriginById(input: {
    mallId: number
    originId: number
  }): Promise<{ id_mallorign: number } | null>
}
