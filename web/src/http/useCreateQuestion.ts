import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateRoomResponse } from './types/create-room-response'
import type { CreateQuestionRequest } from './types/create-question-request'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

export function useCreateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ roomId, question }: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        }
      )
      const result: CreateRoomResponse = await response.json()
      return result
    },

    onMutate({ question, roomId }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>(['get-questions', roomId])
      const questionsArray = questions ?? []

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        roomId,
        createdAt: new Date().toISOString(),
        answer: undefined
      }

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      )

      return { newQuestion, questions: questionsArray }
    },

    onError(_error, { roomId }, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context?.questions
        )
      }
    },

    onSuccess: (data, { roomId }, context) => {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        (questions) => {
          if(!questions) {
            return questions
          }

          if(!context.newQuestion) {
            return questions
          }

          return questions.map(question => {
            if(question.id === context.newQuestion.id) {
              return {
                ...question,
                id: data.id,
                answer: data.answer
              }
            }

            return question
          })
        }
      )
    },
  })
}
