const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

interface GeminiPart {
  text: string
}
interface GeminiContent {
  role?: 'user' | 'model'
  parts: GeminiPart[]
}
interface GeminiRequest {
  contents: GeminiContent[]
  generationConfig?: {
    temperature?: number
    maxOutputTokens?: number
    topP?: number
  }
  systemInstruction?: { parts: GeminiPart[] }
}

export async function callGemini(
  prompt: string,
  options: {
    system?: string
    temperature?: number
    maxTokens?: number
    history?: Array<{ role: 'user' | 'model'; text: string }>
  } = {}
): Promise<string> {
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GEMINI_API_KEY is not configured.',
    })
  }

  const body: GeminiRequest = {
    contents: [
      ...(options.history ?? []).map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: prompt }] },
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.9,
      maxOutputTokens: options.maxTokens ?? 512,
      topP: 0.95,
    },
  }

  if (options.system) {
    body.systemInstruction = { parts: [{ text: options.system }] }
  }

  const url = `${GEMINI_API_BASE}/gemini-2.0-flash:generateContent?key=${apiKey}`

  const res = await $fetch<{ candidates: Array<{ content: { parts: GeminiPart[] } }> }>(url, {
    method: 'POST',
    body,
  })

  return res.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}
