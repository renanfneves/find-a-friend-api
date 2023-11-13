import { Prisma, $Enums } from '@prisma/client'
import { IPetsRepository, PetFilters } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }

  async get({
    orgsIds,
    characteristics,
    onlyAvailableForAdoption,
  }: PetFilters) {
    const pet = await prisma.pet.findMany({
      where: {
        orgId: {
          in: orgsIds,
        },
        available_for_adoption: onlyAvailableForAdoption || undefined,
        specie: characteristics?.specie,
        breed: characteristics?.breed,
        size: characteristics?.size as $Enums.PET_SIZE,
        color: characteristics?.color,
      },
    })
    return pet
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })
    return pet
  }
}
