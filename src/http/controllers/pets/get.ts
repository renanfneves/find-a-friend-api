import { CityNotCoveredError } from '@/use-cases/errors/CityNotCoveredError'
import { makeGetPetsUseCase } from '@/use-cases/factories/make-get-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    city: z.string(),
  })
  const getPetsQuerySchema = z.object({
    specie: z.string().optional(),
    breed: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    adoption: z.coerce.boolean().optional(),
  })
  try {
    const { city } = getPetParamsSchema.parse(request.params)
    const { specie, breed, size, color, adoption } = getPetsQuerySchema.parse(
      request.query,
    )
    const characteristics =
      specie || breed || size || color
        ? { specie, breed, size, color }
        : undefined
    const getPetsUseCase = makeGetPetsUseCase()
    const pets = await getPetsUseCase.execute({
      city,
      characteristics,
      onlyAvailableForAdoption: adoption,
    })
    if (!pets) {
      return reply.status(204).send()
    }
    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof CityNotCoveredError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
