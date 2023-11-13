import { PrismaOrgsRepositories } from '@/repositories/prisma/prisma-orgs-repositories'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepositories()
  return new RegisterPetUseCase(petsRepository, orgsRepository)
}
