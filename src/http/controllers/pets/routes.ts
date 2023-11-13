import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', register)

  /** Authenticated */
  // app.get('/me', { onRequest: [verifyJwt] }, profile)
}
