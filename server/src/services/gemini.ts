import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o audio para portugues do brasil. Seja preciso e natural na descrição. Mantenha a pontuação adequada e divida o texto em paragrafos quando for apropiado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new Error('Não foi possível converter o audio')
  }

  return response.text
}

export async function generateEmbbedings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0].values) {
    throw new Error('Não foi possível gerar os embeddings')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n')

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em portugues do brasil.  

    CONTEXTO: 
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
     - Use apenas informações contidas no contexto enviado;
     - Se nao for encontrada a resposta no contexto, responda que não possui informacoes suficientes para responder;
     - Seja objetivo;
     - Mantenha um tom educativo e profissional;
     - Cite trechos relavantes do contexto se apropiado;
     - Se for citar o contexo, utilize o termo "conteúdo da aula";
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('falha ao gerar resposta pelo Gemini')
  }

  return response.text
}
