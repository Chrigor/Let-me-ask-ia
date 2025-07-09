import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


type GetRoomsAPIReponse = {
  id: string
  name: string
}[]

export function CreateRoom() {
  const { data, isLoading } = useQuery<GetRoomsAPIReponse>({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms")
      return response.json()
    }
  })

  return (
    <div>
      <div> Create room</div>

      {isLoading && <p>Carregando ... </p>}
      <div className="flex flex-col gap-1">
        {data && data.map((data) => (
          <Link key={data.id} to={`/room/${data.id}`}>
            {data.name}
          </Link>
        ))}
      </div>

      <Link className="underline" to="/room">
        Acessar sala
      </Link>
    </div>
  )
}
