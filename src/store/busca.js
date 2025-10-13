import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


export const useBuscaStore = defineStore('busca', () => {
  const termo = ref('')
  const termoDebounced = ref('')
  const tipoBusca = ref('clientes') // 'clientes' | 'funcionarios' | 'servicos'
  const cache = ref({})

  let timeout = null

  function setTermo(v) {
    termo.value = v
  }

  function setTipoBusca(tipo) {
    tipoBusca.value = tipo
  }

  
  // limpa tudo
  function resetBusca() {
    termo.value = ''
    termoDebounced.value = ''
  }

  // debounce: atualiza termoDebounced apenas após 300ms sem digitar
  watch(termo, (novo) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      termoDebounced.value = novo
    }, 300)
  })

  // cache: salva resultado filtrado por termo
  function salvarCache(termo, resultados) {
    cache.value[termo.toLowerCase()] = resultados
  }

  function obterCache(termo) {
    return cache.value[termo.toLowerCase()] || null
  }

  function limparCache() {
    cache.value = {}
  }


  return {
    termo,
    termoDebounced,
    cache,
    setTermo,
    tipoBusca,
    setTipoBusca,
    resetBusca,
    salvarCache,
    obterCache,
    limparCache
  }
})

