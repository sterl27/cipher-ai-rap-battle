export default defineEventHandler(async (event) => {
  const body = await readBody<{ query?: string; start?: number }>(event)
  const query = body.query?.trim() ?? ''

  if (!query) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search query is required.',
    })
  }

  const start = Math.max(1, Math.min(91, Number(body.start ?? 1)))

  const config = useRuntimeConfig()
  const apiKey = config.googleSearchApiKey
  const cx = config.googleSearchCx

  if (!apiKey || !cx) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google search is not configured. Set GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_CX.',
    })
  }

  const url = new URL('https://www.googleapis.com/customsearch/v1')
  url.searchParams.set('key', apiKey)
  url.searchParams.set('cx', cx)
  url.searchParams.set('q', query)
  url.searchParams.set('start', String(start))
  url.searchParams.set('num', '10')

  try {
    return await $fetch(url.toString(), {
      method: 'GET',
    })
  } catch (error: unknown) {
    const err = error as { data?: { error?: { message?: string } }; statusCode?: number }
    throw createError({
      statusCode: err?.statusCode ?? 502,
      statusMessage: err?.data?.error?.message ?? 'Google search request failed.',
    })
  }
})
