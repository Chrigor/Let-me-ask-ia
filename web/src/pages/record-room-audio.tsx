import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RecordRoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RecordRoomParams>()

  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  function stopRecording() {
    setIsRecording(false)

    if (!recorder.current || recorder.current.state === 'inactive') {
      return
    }

    recorder.current.stop()

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()
    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('comecou')
    }

    recorder.current.onstop = () => {
      console.log('parou')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Recording is not supported in your browser')
      return
    }

    setIsRecording(true)

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      })

      createRecorder(audio)

      intervalRef.current = setInterval(() => {
        recorder.current?.stop()
        createRecorder(audio)
      }, 5000)
    } catch (error) {}
  }

  if (isRecording) {
    return (
      <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <Button onClick={stopRecording}>Pausar gravação</Button>
        <p>Gravando ...</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
      <Button onClick={startRecording}>Gravar audio</Button>
      <p>Pausado</p>
    </div>
  )
}
