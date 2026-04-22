export default defineEventHandler(async (event) => {
  const body = await readBody<{ word: string }>(event)
  const { word } = body

  if (!word?.trim()) {
    return { rhymes: [] }
  }

  const prompt = `Give me 10 words that rhyme with "${word}" — include both perfect rhymes and near/slant rhymes suitable for hip-hop and rap. Return ONLY a JSON array of strings, no explanation. Example: ["night","right","light","might","sight","tight","fight","write","bite","white"]`

  const raw = await callGemini(prompt, { temperature: 0.4, maxTokens: 100 })

  let rhymes: string[] = []
  try {
    const match = raw.match(/\[[^]]+\]/)
    if (match) rhymes = JSON.parse(match[0])
  } catch {
    // fallback: split by comma/newline
    rhymes = raw.replace(/[[\]"]/g, '').split(/[,\n]+/).map(s => s.trim()).filter(Boolean).slice(0, 10)
  }

  return { rhymes }
})
