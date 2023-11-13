import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetUseCase } from './search-pet'
import { PetNotFoundError } from './errors/PetNotFoundError'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetUseCase

describe('Search Pet - Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgsRepository.orgs.push({
      id: 'org-id',
      name: 'org-2',
      contact_number: '99999999999',
      street: 'data.street',
      address_number: 'data.address_number',
      city: 'rj',
      zip_code: 'data.zip_code',
      created_at: new Date(),
      username: 'data.username',
      password_hash: 'data.password',
      role: 'admin',
    })
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetUseCase(orgsRepository, petsRepository)
    petsRepository.pets.push({
      id: 'pet-id',
      name: 'totó',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: false,
      orgId: 'org-id',
    })
  })
  it('should be possible to find a pet by id', async () => {
    const { pet } = await sut.execute('pet-id')
    expect(pet.name).toEqual('totó')
  })
  it('should not be possible to find a not existing pet id', async () => {
    await expect(sut.execute('not-existing-pet-id')).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
  it('should be possible to get org contact number where the pet is located', async () => {
    const { orgContactNumber } = await sut.execute('pet-id')
    expect(orgContactNumber).toEqual('99999999999')
  })
})
