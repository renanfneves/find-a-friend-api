import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  // for test e2e with supertest we must wait till app be ready
  beforeAll(async () => {
    await app.ready()
  })

  // for test e2e with supertest we must wait till app be closed
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      username: 'johndoe@email.com',
      password: '123456',
      street: 'z.string()',
      address_number: 'z.string()',
      zip_code: 'z.string()',
      city: 'sp',
      contact_number: '9999999999',
    })

    expect(response.statusCode).toEqual(201)
  })
})
