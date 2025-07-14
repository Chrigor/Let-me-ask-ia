import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateRoomResponse } from './types/create-room-response'
import type { CreateQuestionRequest } from './types/create-question-request'

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
    onSuccess: (_, { roomId }) => {
      queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
    },
  })
}
