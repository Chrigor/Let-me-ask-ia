import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dayjs } from "@/lib/dayjs";

type GetRoomsAPIReponse = {
  id: string
  name: string
  questionsCount: number
  createdAt: string
}[]

export function CreateRoom() {
  const { data } = useQuery<GetRoomsAPIReponse>({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms")
      return response.json()
    }
  })

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>
                Salas recentes
              </CardTitle>
              <CardDescription>
                Acesso rápido para as salas criadas recentemente
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {data?.map((room) => (
                <Link key={room.id} to={`/room/${room.id}`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent">
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-medium">{room.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {dayjs(room.createdAt).fromNow()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {room.questionsCount} pergunta(s)
                      </Badge>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 text-sm">
                    Entrar
                    <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
