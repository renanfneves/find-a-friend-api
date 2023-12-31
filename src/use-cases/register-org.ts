import { hash } from 'bcryptjs'
import { IOrgsRepository } from '@/repositories/orgs-repository'
import { ORG } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError'

interface RegisterUseCaseInput {
  name: string
  username: string
  password: string
  street: string
  address_number: string
  zip_code: string
  city: string
  contact_number: string
}

interface RegisterOrgUseCaseOutput {
  org: ORG
}

export class RegisterOrgUseCase {
  constructor(private readonly orgsRepository: IOrgsRepository) {}

  async execute(data: RegisterUseCaseInput): Promise<RegisterOrgUseCaseOutput> {
    const password_hash = await hash(data.password, 6)
    const userWithSameUsername = await this.orgsRepository.findByUsername(
      data.username,
    )
    if (userWithSameUsername) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name: data.name,
      street: data.street,
      address_number: data.address_number,
      zip_code: data.zip_code,
      city: data.city,
      contact_number: data.contact_number,
      username: data.username,
      password_hash,
    })
    return {
      org,
    }
  }
}
