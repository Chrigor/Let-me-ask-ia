import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  async function stopRecording() {
    setIsRecording(false)

    if (!recorder.current || recorder.current.state === 'inactive') {
      return
    }

    recorder.current.stop()
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

      recorder.current = new MediaRecorder(audio, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      })

      recorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log(event.data)
        }
      }

      recorder.current.onstart = () => {
        console.log('comecou')
      }

      recorder.current.onstop = () => {
        console.log('parou')
      }

      recorder.current.start()
    } catch (error) { }
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
