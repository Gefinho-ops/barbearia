import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBuscaStore = defineStore('busca', () => {
  const termo = ref('')
  const setTermo = (v) => termo.value = v
  return { termo, setTermo }
})
