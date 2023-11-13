import { OrgAlreadyExistsError } from '@/use-cases/errors/OrgAlreadyExistsError'
import { makeRegisterOrgsUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    username: z.string().email(),
    password: z.string(),
    street: z.string(),
    address_number: z.string(),
    zip_code: z.string(),
    city: z.string(),
    contact_number: z.string(),
  })
  try {
    const data = registerBodySchema.parse(request.body)
    const registerUseCase = makeRegisterOrgsUseCase()
    await registerUseCase.execute(data)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    throw error
  }
  return reply.status(201).send()
}
