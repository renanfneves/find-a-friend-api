import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { get } from './get'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:city', get)
  app.addHook('onRequest', verifyJwt)
  app.post('/pets', { onRequest: [verifyUserRole('admin')] }, register)
}
