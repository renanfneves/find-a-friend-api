import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { createOrgsRepoInstanceAndAddOrg } from '@/utils/tests/create-orgs-repo-instance-and-add-org'
import { InvalidCredentialsError } from './errors/InvalidCredentialsError'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = await createOrgsRepoInstanceAndAddOrg({
      orgId: 'id',
      city: 'sp',
    })
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const { user } = await sut.execute({
      username: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate wrong username', async () => {
    await expect(() =>
      sut.execute({
        username: 'wrong@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate wrong password', async () => {
    await expect(() =>
      sut.execute({
        username: 'johndoe@example.com',
        password: '123453',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
