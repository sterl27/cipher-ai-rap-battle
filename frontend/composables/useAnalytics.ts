interface DailyUsage {
  date: string
  messages: number
  searches: number
  tasks: number
}

export function useAnalytics() {
  function today() {
    return new Date().toISOString().split('T')[0]
  }

  function read(): DailyUsage[] {
    if (typeof localStorage === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('alic3x_analytics') || '[]') }
    catch { return [] }
  }

  function write(data: DailyUsage[]) {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('alic3x_analytics', JSON.stringify(data.slice(-30)))
  }

  function track(field: 'messages' | 'searches' | 'tasks') {
    if (typeof localStorage === 'undefined') return
    const data = read()
    const t = today()
    const idx = data.findIndex(d => d.date === t)
    if (idx >= 0) {
      data[idx][field]++
    } else {
      const entry: DailyUsage = { date: t, messages: 0, searches: 0, tasks: 0 }
      entry[field]++
      data.push(entry)
    }
    write(data.sort((a, b) => a.date.localeCompare(b.date)))
  }

  function totals() {
    const data = read()
    return {
      messages: data.reduce((s, d) => s + d.messages, 0),
      searches: data.reduce((s, d) => s + d.searches, 0),
      tasks: data.reduce((s, d) => s + d.tasks, 0),
    }
  }

  function last7Days(): DailyUsage[] {
    const data = read()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const date = d.toISOString().split('T')[0]
      return data.find(h => h.date === date) ?? { date, messages: 0, searches: 0, tasks: 0 }
    })
  }

  return { track, totals, last7Days }
}
