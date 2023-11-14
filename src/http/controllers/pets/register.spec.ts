import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to register pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const createResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'totó',
        specie: 'dog',
        breed: 'pit-bull',
        size: 'medium',
        color: 'white',
        notes: 'nice for children',
      })
    expect(createResponse.statusCode).toEqual(201)
  })
  it('should not be able to register pet without admin role', async () => {
    const createResponse = await request(app.server).post('/pets').send({
      name: 'totó',
      specie: 'dog',
      breed: 'pit-bull',
      size: 'medium',
      color: 'white',
      notes: 'nice for children',
    })
    expect(createResponse.statusCode).toEqual(401)
  })
})
