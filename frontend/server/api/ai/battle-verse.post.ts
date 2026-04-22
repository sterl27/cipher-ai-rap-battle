export default defineEventHandler(async (event) => {
  const body = await readBody<{
    playerVerse: string
    round: number
    battleLog?: Array<{ role: string; verse: string; round: number }>
  }>(event)

  const { playerVerse, round, battleLog = [] } = body

  const history = battleLog.flatMap(entry => [
    { role: 'user' as const, text: `Round ${entry.round} — ${entry.role === 'player' ? 'Human MC' : 'Cipher AI'}: ${entry.verse}` },
  ])

  const system = `You are Cipher, an elite AI rap battle MC. Your persona:
- Sharp, confident, witty — you never back down
- You use complex internal rhyme schemes, multisyllabic rhymes, and clever wordplay
- You incorporate wordplay, metaphors, double entendres, and topical punch lines
- You keep it competitive but PG-13
- Each verse is exactly 4 bars (lines), no more
- Bars have roughly 8–12 syllables each for natural flow
- Respond ONLY with the 4 bars — no intro, no explanation, no quotes`

  const prompt = round === 1
    ? `This is Round 1. The human MC opened with:\n"${playerVerse}"\n\nDrop your 4-bar opening verse. Come hard but keep it hype.`
    : `Round ${round}. The human MC just spit:\n"${playerVerse}"\n\nRespond with your 4-bar counter verse. Reference what they said, flip the narrative, and escalate the energy.`

  const verse = await callGemini(prompt, {
    system,
    temperature: 1.0,
    maxTokens: 200,
    history: history.slice(-6),
  })

  // Simple scoring: score the AI verse on 4 metrics (25pts each)
  const scorePrompt = `Rate this rap verse on 4 criteria, each scored 0–25. Return ONLY a JSON object like {"rhymeScheme": 22, "wordplay": 19, "flow": 21, "crowd": 20}.

Verse:
"${verse}"

Criteria:
- rhymeScheme: quality and complexity of end rhymes and internal rhymes
- wordplay: metaphors, double meanings, clever references
- flow: syllable consistency, rhythm, cadence
- crowd: energy, punchlines, entertainment value`

  let scores = { rhymeScheme: 18, wordplay: 17, flow: 19, crowd: 16 }
  try {
    const raw = await callGemini(scorePrompt, { temperature: 0.2, maxTokens: 60 })
    const match = raw.match(/\{[^}]+\}/)
    if (match) scores = JSON.parse(match[0])
  } catch {
    // Keep default score values when scoring response is not valid JSON.
  }

  return { verse: verse.trim(), scores }
})
