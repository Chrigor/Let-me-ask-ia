import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { schema } from '../../db/schema/index.ts'
import { db } from '../../db/connection.ts'
import z from 'zod/v4'
import { desc, eq } from 'drizzle-orm'
import { id } from 'zod/v4/locales'
import { rooms } from '../../db/schema/rooms.ts'

export const getRoomsQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params

      const results = await db
        .select()
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt))

      return reply.send(results)
    }
  )
}
