import { useQuery } from '@tanstack/react-query'
import type { GetRoomsResponse } from './types/get-rooms-response'

export function useRooms() {
  const { data, isLoading } = useQuery<GetRoomsResponse>({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      return response.json()
    },
  })

  return {
    data,
    isLoading,
  }
}
