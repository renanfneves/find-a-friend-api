import { PrismaOrgsRepositories } from '@/repositories/prisma/prisma-orgs-repositories'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsUseCase } from '../get-pets'

export function makeGetPetsUseCase() {
  const orgsRepository = new PrismaOrgsRepositories()
  const petsRepository = new PrismaPetsRepository()
  return new GetPetsUseCase(orgsRepository, petsRepository)
}
