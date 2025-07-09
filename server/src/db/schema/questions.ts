import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const questions = pgTable('questions', {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid().references(() => rooms.id).notNull(),
  answer: text(),
  question: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
