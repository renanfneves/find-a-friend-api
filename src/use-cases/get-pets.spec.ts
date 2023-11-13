import { describe, expect, it, beforeEach } from 'vitest'
import { GetPetsUseCase } from './get-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'
import { CityNotCoveredError } from './errors/CityNotCoveredError'
import { createOrgsRepoInstanceAndAddOrg } from '@/utils/tests/create-orgs-repo-instance-and-add-org'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase

describe.each([{ city: 'rj' }, { city: '' }])(
  'Get Pets - Use Case => Not Covered City',
  ({ city }) => {
    const orgId = randomUUID()
    beforeEach(async () => {
      orgsRepository = await createOrgsRepoInstanceAndAddOrg({
        orgId,
        city: 'sp',
      })
      petsRepository = new InMemoryPetsRepository()
      sut = new GetPetsUseCase(orgsRepository, petsRepository)
    })
    it('should not be able to filter pets if user tries a city not registered by any org', async () => {
      await expect(sut.execute({ city })).rejects.toBeInstanceOf(
        CityNotCoveredError,
      )
    })
  },
)

describe('Get Pets - Use Case', () => {
  const orgId = 'org-id'
  const city = 'sp'
  beforeEach(async () => {
    orgsRepository = await createOrgsRepoInstanceAndAddOrg({ orgId, city })
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(orgsRepository, petsRepository)
  })
  it('should be possible to filter pets just with required filters', async () => {
    const notWantedOrgId = 'not_wanted_org_id'
    orgsRepository.orgs.push({
      id: notWantedOrgId,
      name: 'org-2',
      contact_number: 'data.contact_number',
      street: 'data.street',
      address_number: 'data.address_number',
      city: 'rj',
      zip_code: 'data.zip_code',
      created_at: new Date(),
      username: 'data.username',
      password_hash: 'data.password',
      role: 'admin',
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó',
      specie: 'dog',
      breed: 'golden',
      size: 'large',
      color: 'yellow',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'golden',
      size: 'large',
      color: 'yellow',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId: notWantedOrgId,
    })
    const { pets } = await sut.execute({ city })
    expect(pets).toHaveLength(1)
    const [pet] = pets
    expect(pet.name).toEqual('totó')
  })
  it('should be possible to filter pets by their characteristics', async () => {
    const notWantedOrgId = 'not_wanted_org_id'
    orgsRepository.orgs.push({
      id: notWantedOrgId,
      name: 'org-2',
      contact_number: 'data.contact_number',
      street: 'data.street',
      address_number: 'data.address_number',
      city: 'rj',
      zip_code: 'data.zip_code',
      created_at: new Date(),
      username: 'data.username',
      password_hash: 'data.password',
      role: 'admin',
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId: notWantedOrgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'golden',
      size: 'large',
      color: 'yellow',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'white',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    const { pets } = await sut.execute({
      city,
      characteristics: {
        breed: 'pit-bull',
        color: 'black',
      },
    })
    expect(pets).toHaveLength(1)
    const [pet] = pets
    expect(pet.name).toEqual('totó')
  })
  it('should be possible to filter just pets available for adoption with other filters', async () => {
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'golden',
      size: 'large',
      color: 'yellow',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: false,
      orgId,
    })
    const { pets } = await sut.execute({
      city,
      characteristics: {
        breed: 'pit-bull',
        color: 'black',
      },
      onlyAvailableForAdoption: true,
    })
    expect(pets).toHaveLength(1)
    const [pet] = pets
    expect(pet.name).toEqual('totó')
  })
  it('should be possible to filter just pets available for adoption', async () => {
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'dog',
      specie: 'dog',
      breed: 'golden',
      size: 'large',
      color: 'yellow',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: true,
      orgId,
    })
    petsRepository.pets.push({
      id: randomUUID(),
      name: 'totó that should not be listed',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'large',
      color: 'black',
      birth_day: null,
      notes: 'indicado para crianças',
      available_for_adoption: false,
      orgId,
    })
    const { pets } = await sut.execute({
      city,
      onlyAvailableForAdoption: true,
    })
    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'dog' }),
      expect.objectContaining({ name: 'totó' }),
    ])
  })
})
