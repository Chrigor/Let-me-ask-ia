import { useRoomQuestions } from '@/http/useRoomQuestions'
import { QuestionItem } from './question-item'

interface QuestionListProps {
  roomId: string
}

export function QuestionList({ roomId }: QuestionListProps) {
  const { data, isLoading } = useRoomQuestions(roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {isLoading && (
        <p className="text-shadow-muted-foreground text-sm">
          Carregando perguntas ...{' '}
        </p>
      )}
      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  )
}
