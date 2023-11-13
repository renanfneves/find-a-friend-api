import { IPetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/PetNotFoundError'
import { Pet } from '@prisma/client'
import { IOrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/OrgNotFoundError'

interface SearchPetUseCaseOutput {
  pet: Pet
  orgContactNumber: string
}

export class SearchPetUseCase {
  constructor(
    private readonly orgsRepository: IOrgsRepository,
    private readonly petsRepository: IPetsRepository,
  ) {}

  async execute(petId: string): Promise<SearchPetUseCaseOutput> {
    const pet = await this.petsRepository.findById(petId)
    if (!pet) {
      throw new PetNotFoundError()
    }
    const org = await this.orgsRepository.findById(pet.orgId)
    if (!org) {
      throw new OrgNotFoundError()
    }
    return {
      pet,
      orgContactNumber: org.contact_number,
    }
  }
}
