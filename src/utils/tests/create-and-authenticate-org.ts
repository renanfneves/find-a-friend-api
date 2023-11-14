import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.oRG.create({
    data: {
      name: 'Org Happy Dog',
      username: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      street: 'z.string()',
      address_number: 'z.string()',
      zip_code: 'z.string()',
      city: 'sp',
      contact_number: '9999999999',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    username: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
