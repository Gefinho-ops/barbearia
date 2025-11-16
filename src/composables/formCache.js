import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormaCacheStore = defineStore("formCache", () => {
    const cache = ref({})

    // Tempo de expiração em milissegundos (1 dia)
    const CACHE_TTL_MS = 24 * 60 * 60 * 1000

    function salvarForm(nomeForm, dados){
        cache.value[nomeForm] = {
            data: dados,
            timestamp: Date.now()
        }
    }

    function obterForm(nomeForm) {
        const item = cache.value[nomeForm]
        if (!item) return null

        const agora = Date.now()

        // Se o cache expirou, limpa e retorna null
        if (agora - item.timestamp > CACHE_TTL_MS) {
            delete cache.value[nomeForm]
            return null
        }

        return item.data
    }

    function limparForm(nomeForm){
        delete cache.value[nomeForm]
    }

    function limparTudo() {
        cache.value = {};
    }

    function existeCache(nomeForm){
        const item = cache.value[nomeForm];
        if (!item) return false;

        const agora = Date.now();
        const valido = (agora - item.timestamp) < CACHE_TTL_MS;
        if (!valido) delete cache.value[nomeForm];
        return valido;
    }

    return { cache, salvarForm, obterForm, limparForm, limparTudo, existeCache }
})