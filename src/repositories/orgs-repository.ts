import { ORG, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  create(data: Prisma.ORGUncheckedCreateInput): Promise<ORG>
  findById(orgId: string): Promise<ORG | null>
  findByUsername(username: string): Promise<ORG | null>
  findManyByCity(city: string): Promise<ORG[]>
}
