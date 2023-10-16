export abstract class DegreeKinshipRepository {
  abstract findById(
    id: number,
  ): Promise<{ id_degreekinship: number; nme_degreekinship: string } | null>

  abstract findMany(input: {
    limit: number
    order: 'DESC' | 'ASC'
    page: number
    search: string
    sortBy: string
  }): Promise<{ id: number; name: string; total: number }[]>
}
