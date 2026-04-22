export default defineEventHandler(async (event) => {
  const body = await readBody<{
    mode: 'Write' | 'Analyze' | 'Generate' | 'Freestyle'
    lyrics: string
    genre: string
    rhymeScheme: string
  }>(event)

  const { mode, lyrics, genre, rhymeScheme } = body

  if (mode === 'Analyze') {
    // Return numeric analysis scores
    const prompt = `Analyze these lyrics and rate them on 4 metrics, each scored 0–100. Return ONLY valid JSON like {"rhymeDensity": 72, "syllableFlow": 85, "wordplay": 61, "originality": 78}.

Lyrics:
"""
${lyrics}
"""

Metrics:
- rhymeDensity: percentage of lines with end rhymes, plus internal rhyme quality
- syllableFlow: consistency of syllable count across bars, natural rap cadence
- wordplay: use of metaphors, similes, double meanings, alliteration
- originality: uniqueness of imagery, fresh perspective, avoids clichés`

    let scores = { rhymeDensity: 60, syllableFlow: 65, wordplay: 55, originality: 70 }
    const raw = await callGemini(prompt, { temperature: 0.2, maxTokens: 80 })
    try {
      const match = raw.match(/\{[^}]+\}/)
      if (match) scores = JSON.parse(match[0])
    } catch {
      // Keep default analysis score values when parsing fails.
    }
    return { type: 'analysis', scores }
  }

  // Generate / Write / Freestyle → return new lyrics
  const systemPrompts: Record<string, string> = {
    Generate: `You are Alic3X PRO, an expert ${genre} lyricist. Generate exactly 8–16 bars based on the user's prompt. Use a ${rhymeScheme} rhyme scheme. Include an inline analysis note on the last line in square brackets, e.g. [AABB scheme · 9 avg syllables/bar · Metaphor density: High]. Return only the lyrics and the analysis note, nothing else.`,
    Write: `You are Alic3X PRO, a ${genre} lyric co-writer. The user has started writing. Continue their verse with 4–8 complementary bars that match their style, tone, and rhyme scheme (${rhymeScheme}). Do not repeat their lines. Return only the new bars.`,
    Freestyle: `You are Alic3X PRO. Score this freestyle rap and then rewrite it with improvements, keeping the raw energy. Return the improved version followed by a one-line score like [Score: 78/100 — Keep the raw energy, tighten the rhymes]. Return only lyrics and the score line.`,
  }

  const userPrompts: Record<string, string> = {
    Generate: `Create lyrics with this vibe: ${lyrics || 'raw, confident trap energy — rising from nothing'}`,
    Write: `Here are my bars so far:\n${lyrics}\n\nContinue this verse.`,
    Freestyle: `Score and improve this freestyle:\n${lyrics}`,
  }

  const result = await callGemini(
    userPrompts[mode] ?? `Write 8 bars of ${genre} in ${rhymeScheme} scheme.`,
    {
      system: systemPrompts[mode],
      temperature: 0.95,
      maxTokens: 400,
    }
  )

  return { type: 'lyrics', output: result.trim() }
})
