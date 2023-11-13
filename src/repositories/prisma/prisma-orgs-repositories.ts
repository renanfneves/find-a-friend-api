import { Prisma } from '@prisma/client'
import { IOrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepositories implements IOrgsRepository {
  async create(data: Prisma.ORGUncheckedCreateInput) {
    const org = await prisma.oRG.create({
      data,
    })
    return org
  }

  async findById(orgId: string) {
    const org = await prisma.oRG.findUnique({
      where: {
        id: orgId,
      },
    })
    return org
  }

  async findByUsername(username: string) {
    const org = await prisma.oRG.findFirst({
      where: {
        username,
      },
    })
    return org
  }

  async findManyByCity(city: string) {
    const org = await prisma.oRG.findMany({
      where: {
        city,
      },
    })
    return org
  }
}
