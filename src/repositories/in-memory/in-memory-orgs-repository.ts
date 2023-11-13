import { ORG, Prisma } from '@prisma/client'
import { IOrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements IOrgsRepository {
  orgs: ORG[] = []

  async create(data: Prisma.ORGUncheckedCreateInput) {
    const org: ORG = {
      id: randomUUID(),
      name: data.name,
      contact_number: data.contact_number,
      street: data.street,
      address_number: data.address_number,
      city: data.city,
      zip_code: data.zip_code,
      created_at: new Date(),
      username: data.username,
      password_hash: data.password_hash,
      role: 'admin',
    }

    this.orgs.push(org)

    return org
  }

  async findManyByCity(city: string) {
    return this.orgs.filter((org) => org.city === city)
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id)
    if (!org) {
      return null
    }
    return org
  }

  async findByUsername(username: string) {
    const org = this.orgs.find((org) => org.username === username)
    if (!org) {
      return null
    }
    return org
  }
}
