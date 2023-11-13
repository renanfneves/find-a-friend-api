import { IOrgsRepository } from '@/repositories/orgs-repository'
import {
  IPetsRepository,
  PetCharacteristics,
} from '@/repositories/pets-repository'
import { CityNotCoveredError } from './errors/CityNotCoveredError'
import { Pet } from '@prisma/client'

interface GetPetsUseCaseInput {
  city: string
  characteristics?: PetCharacteristics
  justAvailableForAdoption?: boolean
}

interface GetPetsUseCaseOutput {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(
    private readonly orgsRepository: IOrgsRepository,
    private readonly petsRepository: IPetsRepository,
  ) {}

  async execute(filters: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
    const orgs = await this.orgsRepository.findManyByCity(filters.city)
    if (!filters.city || !orgs.length) {
      throw new CityNotCoveredError()
    }
    const orgsIds = orgs.reduce((ids: string[], currentOrg) => {
      ids.push(currentOrg.id)
      return ids
    }, [])
    const pets = await this.petsRepository.get({
      orgsIds,
      characteristics: filters.characteristics,
      justAvailableForAdoption: filters.justAvailableForAdoption,
    })
    return {
      pets,
    }
  }
}
