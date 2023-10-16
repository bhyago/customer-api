export abstract class MallRepository {
  abstract qryLgpd(mallId: number): Promise<{ qry_lgpd: string } | null>
}
