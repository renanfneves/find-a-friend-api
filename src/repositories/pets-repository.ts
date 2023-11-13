import { Pet, Prisma } from '@prisma/client'

export type PetCharacteristics = Partial<{
  specie: string
  breed: string
  size: string
  color: string
}>

export interface PetFilters {
  orgsIds: string[]
  characteristics?: PetCharacteristics
  justAvailableForAdoption?: boolean
}

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  get(filters: PetFilters): Promise<Array<Pet>>
  findById(petId: string): Promise<Pet | null>
}
