export default defineEventHandler(async (event) => {
  const body = await readBody<{
    message: string
    history?: Array<{ role: 'user' | 'model'; text: string }>
  }>(event)

  const { message, history = [] } = body

  const system = `You are Alic3X PRO — an elite AI creative collaborator for music producers and artists. Your expertise covers:
- Music theory (chord progressions, scales, modulations, harmony)
- Lyric writing and co-writing (rhyme schemes, flow, metaphors, hooks)
- Production techniques (mixing, mastering, sound design, arrangement)
- Genre knowledge across hip-hop, R&B, trap, soul, pop, electronic
- Artist branding, release strategy, and playlist pitching
- BPM, key detection, and production analysis

Personality: Concise, knowledgeable, and genuinely excited about music. Use music-specific vocabulary naturally. Keep responses focused and actionable — no filler. Max 3–4 paragraphs unless the user asks for something detailed.

At the end of your response, output a JSON tags array of 2–4 relevant topic tags like this on its own line:
TAGS: ["Chord Theory", "Lo-Fi", "Dm Key"]`

  const reply = await callGemini(message, {
    system,
    temperature: 0.8,
    maxTokens: 600,
    history,
  })

  // Extract tags if present
  const tagMatch = reply.match(/TAGS:\s*(\[[^\]]+\])/)
  let tags: string[] = []
  let content = reply

  if (tagMatch) {
    try {
      tags = JSON.parse(tagMatch[1])
    } catch {
      // Keep empty tags when JSON parsing fails.
    }
    content = reply.replace(/TAGS:\s*\[[^\]]+\]/, '').trim()
  }

  return { content, tags }
})
