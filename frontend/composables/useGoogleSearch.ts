export interface SearchResult {
  title: string
  link: string
  snippet: string
  displayLink: string
  image?: string
}

interface GoogleSearchResponse {
  items?: Array<{
    title?: string
    link?: string
    snippet?: string
    displayLink?: string
    pagemap?: {
      cse_thumbnail?: Array<{ src?: string }>
    }
  }>
  searchInformation?: {
    totalResults?: string
    searchTime?: number
  }
}

export function useGoogleSearch() {
  const results = ref<SearchResult[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const totalResults = ref(0)
  const searchTime = ref(0)
  const currentPage = ref(1)
  const startIndex = ref(1)
  const currentQuery = ref('')
  const history = ref<string[]>([])

  function loadHistory() {
    if (typeof localStorage === 'undefined') return
    try { history.value = JSON.parse(localStorage.getItem('alic3x_search_history') || '[]') }
    catch { history.value = [] }
  }

  function saveHistory(q: string) {
    if (typeof localStorage === 'undefined') return
    const h = [q, ...history.value.filter(x => x !== q)].slice(0, 20)
    history.value = h
    localStorage.setItem('alic3x_search_history', JSON.stringify(h))
  }

  async function search(query: string, start = 1) {
    isLoading.value = true
    error.value = null
    currentQuery.value = query
    startIndex.value = start
    currentPage.value = Math.ceil(start / 10)

    try {
      const data = await $fetch<GoogleSearchResponse>('/api/google/search', {
        method: 'POST',
        body: {
          query,
          start,
        },
      })

      results.value = (data.items ?? []).map((item) => ({
        title: item.title ?? 'Untitled result',
        link: item.link ?? '#',
        snippet: item.snippet ?? '',
        displayLink: item.displayLink ?? '',
        image: item.pagemap?.cse_thumbnail?.[0]?.src,
      }))
      totalResults.value = parseInt(data.searchInformation?.totalResults ?? '0', 10)
      searchTime.value = data.searchInformation?.searchTime ?? 0
      saveHistory(query)
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Search failed'
      results.value = []
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadHistory)

  return { results, isLoading, error, totalResults, searchTime, currentPage, startIndex, history, search }
}
