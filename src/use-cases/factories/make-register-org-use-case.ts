import { PrismaOrgsRepositories } from '@/repositories/prisma/prisma-orgs-repositories'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepositories()
  return new RegisterOrgUseCase(orgsRepository)
}
