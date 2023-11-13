import { compare } from 'bcryptjs'
import { IOrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'
import { ORG } from '@prisma/client'

interface AuthenticateUseCaseInput {
  username: string
  password: string
}

type AuthenticateUseCaseOutput = {
  user: ORG
}

export class AuthenticateUseCase {
  constructor(private readonly orgsRepository: IOrgsRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const user = await this.orgsRepository.findByUsername(username)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}
