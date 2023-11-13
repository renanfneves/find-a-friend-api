import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

interface CreateOrgsRepoInstanceAndAddOrgParams {
  orgId: string
  city: string
}

export async function createOrgsRepoInstanceAndAddOrg({
  orgId,
  city,
}: CreateOrgsRepoInstanceAndAddOrgParams) {
  const orgsRepository = new InMemoryOrgsRepository()

  orgsRepository.orgs.push({
    id: orgId,
    name: 'org-1',
    contact_number: 'data.contact_number',
    street: 'data.street',
    address_number: 'data.address_number',
    city,
    zip_code: 'data.zip_code',
    created_at: new Date(),
    username: 'johndoe@example.com',
    password_hash: await hash('123456', 6),
    role: 'admin',
  })

  return orgsRepository
}
