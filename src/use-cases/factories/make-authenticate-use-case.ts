import { PrismaOrgsRepositories } from '@/repositories/prisma/prisma-orgs-repositories'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepositories()
  return new AuthenticateUseCase(orgsRepository)
}
