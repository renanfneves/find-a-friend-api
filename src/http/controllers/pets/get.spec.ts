import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Get Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to get pets', async () => {
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
    const response = await request(app.server).get('/pets/sp').send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'totó',
      }),
    ])
    expect(response.body.pets).toHaveLength(1)
  })
})
