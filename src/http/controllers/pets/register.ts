import { OrgNotFoundError } from '@/use-cases/errors/OrgNotFoundError'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    specie: z.string(),
    breed: z.string(),
    size: z.enum(['small', 'medium', 'large']),
    color: z.string(),
    birth_day: z.date().optional(),
    notes: z.string().optional(),
  })
  try {
    const pet = registerBodySchema.parse(request.body)
    const registerUseCase = makeRegisterPetUseCase()
    const orgId = request.user.sub
    console.log(orgId)
    await registerUseCase.execute({
      orgId,
      pet,
    })
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    throw error
  }
  return reply.status(201).send()
}
