import { useQuery } from '@tanstack/react-query'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

export function useRoomQuestions(roomId: string) {
  const { data, isLoading } = useQuery<GetRoomQuestionsResponse>({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      )
      return response.json()
    },
  })

  return {
    data,
    isLoading,
  }
}
