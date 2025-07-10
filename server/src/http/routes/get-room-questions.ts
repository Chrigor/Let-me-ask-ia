import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { schema } from '../../db/schema/index.ts'
import { db } from '../../db/connection.ts'
import z from 'zod/v4'
import { desc, eq } from 'drizzle-orm'

export const getRoomsQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms/:roomId/questions', {
    schema: {
      params: z.object({
        roomId: z.string()
      })
    }
  }, async (request, reply) => {
    const { roomId } = request.params

    const results = await db
      .select()
      .from(schema.questions)
      .where(eq(schema.questions.id, roomId))
      .orderBy(desc(schema.questions.createdAt))

    return reply.send(results)
  })
}
