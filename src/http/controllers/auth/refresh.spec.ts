import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      username: 'johndoe@email.com',
      password: '123456',
      street: 'z.string()',
      address_number: 'z.string()',
      zip_code: 'z.string()',
      city: 'sp',
      contact_number: '9999999999',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      username: 'johndoe@email.com',
      password: '123456',
    })
    const cookies = authResponse.get('Set-Cookie')
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()
    expect(authResponse.status).toEqual(200)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
