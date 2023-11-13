import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      username: 'johndoe@example.com',
      password: '123456',
      street: 'string',
      address_number: 'string',
      zip_code: 'string',
      city: 'string',
      contact_number: 'string',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      username: 'johndoe@example.com',
      password: '123456',
      street: 'string',
      address_number: 'string',
      zip_code: 'string',
      city: 'string',
      contact_number: 'string',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not allow user to be registered with a already existing e-mail', async () => {
    await sut.execute({
      name: 'John Doe',
      username: 'johndoe@example.com',
      password: '123456',
      street: 'string',
      address_number: 'string',
      zip_code: 'string',
      city: 'string',
      contact_number: 'string',
    })

    await expect(
      sut.execute({
        name: 'John Doe',
        username: 'johndoe@example.com',
        password: '123456',
        street: 'string',
        address_number: 'string',
        zip_code: 'string',
        city: 'string',
        contact_number: 'string',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
