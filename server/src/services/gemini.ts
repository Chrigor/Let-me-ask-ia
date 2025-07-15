import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [{
      text: 'Transcreva o audio para portugues do brasil. Seja preciso e natural na descrição. Mantenha a pontuação adequada e divida o texto em paragrafos quando for apropiado.'
    }, {
      inlineData: {
        mimeType,
        data: audioAsBase64
      }
    }]
  })

  if (!response.text) {
    throw new Error('Não foi possível converter o audio')
  }

  return response.text
}

export async function generateEmbbedings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [
      { text }
    ],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT'
    }
  })

  if(!response.embeddings?.[0].values) {
    throw new Error('Não foi possível gerar os embeddings')
  }

  return response.embeddings[0].values
}
