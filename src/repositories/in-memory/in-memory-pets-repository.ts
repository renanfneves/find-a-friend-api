import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository, PetFilters } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      specie: data.specie,
      breed: data.breed,
      size: data.size,
      color: data.color,
      birth_day: (data.birth_day as Date | null) ?? null,
      notes: data.notes ?? null,
      available_for_adoption: true,
      orgId: data.orgId,
    }

    this.pets.push(pet)

    return pet
  }

  async get(filters: PetFilters) {
    if (!filters.characteristics && !filters.justAvailableForAdoption) {
      return this.pets.filter((pet) => filters.orgsIds.includes(pet.orgId))
    }
    const availableForAdoptionValue =
      filters.justAvailableForAdoption === true ? [true] : [true, false]

    const characteristics = filters.characteristics || []
    const fieldsToFilterBy = Object.keys(characteristics).filter((key) => !!key)

    return this.pets.filter(
      (pet) =>
        filters.orgsIds.includes(pet.orgId) &&
        availableForAdoptionValue.includes(pet.available_for_adoption) &&
        fieldsToFilterBy.every(
          (key) =>
            pet[key as keyof typeof pet] ===
            characteristics[key as keyof typeof characteristics],
        ),
    )
  }

  async findById(petId: string) {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }
}
