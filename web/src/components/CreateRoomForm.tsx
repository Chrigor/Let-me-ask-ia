import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useCreateRoom } from '@/http/useCreateRoom'

const createRoomSchema = z.object({
  name: z.string().min(3, 'Inclua no mínimo 3 caracteres'),
  description: z.string().optional(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom()

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function handleCreateRandomRoom({
    name,
    description,
  }: CreateRoomFormData) {
    await createRoom({
      name,
      description,
    })
    await createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da I.A
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            onSubmit={createRoomForm.handleSubmit(handleCreateRandomRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da sala</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome da sala" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Digite a descrição da sala"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
