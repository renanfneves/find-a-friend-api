import { FastifyRequest, FastifyReply } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send()
}
