import { IOrgsRepository } from '@/repositories/orgs-repository'
import { IPetsRepository } from '@/repositories/pets-repository'
import { $Enums } from '@prisma/client'
import { OrgNotFoundError } from './errors/OrgNotFoundError'

interface RegisterPetUseCaseInput {
  orgId: string
  pet: {
    name: string
    specie: string
    breed: string
    size: $Enums.PET_SIZE
    color: string
    birth_day?: Date | null
    notes?: string | null
  }
}

export class RegisterPetUseCase {
  constructor(
    private readonly petsRepository: IPetsRepository,
    private readonly orgsRepository: IOrgsRepository,
  ) {}

  async execute(data: RegisterPetUseCaseInput) {
    const org = await this.orgsRepository.findById(data.orgId)
    if (!org) {
      throw new OrgNotFoundError()
    }
    const pet = await this.petsRepository.create({
      orgId: data.orgId,
      ...data.pet,
    })
    return {
      petId: pet.id,
    }
  }
}
