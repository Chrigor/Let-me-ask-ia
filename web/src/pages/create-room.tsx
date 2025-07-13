import { CreateRoomForm } from '@/components/CreateRoomForm'
import { RoomList } from '@/components/RoomList'

export function CreateRoom() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  )
}
