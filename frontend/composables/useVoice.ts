export function useVoice() {
  const isListening = ref(false)
  const isSpeaking = ref(false)
  const isSupported = ref(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recognition: any = null

  onMounted(() => {
    isSupported.value =
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  })

  function startListening(onResult: (text: string) => void) {
    if (!isSupported.value) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onstart = () => { isListening.value = true }
    recognition.onend = () => { isListening.value = false }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => { onResult(e.results[0][0].transcript as string) }
    recognition.onerror = () => { isListening.value = false }
    recognition.start()
  }

  function stopListening() {
    recognition?.stop()
    isListening.value = false
  }

  function speak(text: string) {
    if (typeof window === 'undefined') return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ''))
    u.rate = 1.0
    u.pitch = 1.05
    u.onstart = () => { isSpeaking.value = true }
    u.onend = () => { isSpeaking.value = false }
    u.onerror = () => { isSpeaking.value = false }
    window.speechSynthesis.speak(u)
  }

  function stopSpeaking() {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel()
    isSpeaking.value = false
  }

  onUnmounted(() => {
    recognition?.stop()
    if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  })

  return { isListening, isSpeaking, isSupported, startListening, stopListening, speak, stopSpeaking }
}
