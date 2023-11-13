import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { randomUUID } from 'node:crypto'
import { OrgNotFoundError } from './errors/OrgNotFoundError'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

const ORG_ID = 'fake_id'

describe('Register Pet - Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)

    orgsRepository.orgs.push({
      id: ORG_ID,
      name: 'org tests',
      contact_number: '99999999999',
      street: 'street',
      address_number: '2b',
      city: 'sp',
      zip_code: '345667',
      created_at: new Date(),
      username: 'username',
      password: 'pass',
    })
  })
  it('should be possible to register a pet', async () => {
    const { petId } = await sut.execute({
      orgId: ORG_ID,
      pet: {
        name: 'totó',
        specie: 'cachorro',
        breed: 'golden',
        size: 'large',
        color: 'yellow',
        birth_day: null,
        notes: 'indicado para crianças',
      },
    })

    expect(petId).toEqual(expect.any(String))
  })
  it('should not be possible to register a pet with inexistent org', async () => {
    await expect(
      sut.execute({
        orgId: randomUUID(),
        pet: {
          name: 'totó',
          specie: 'cachorro',
          breed: 'golden',
          size: 'large',
          color: 'yellow',
          birth_day: null,
          notes: 'indicado para crianças',
        },
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
