import { defineStore } from "pinia";
import { ref } from "vue";

export const useFormaCacheStore = defineStore("formCache", () => {
    const cache = ref({})

    function salvarForm(nomeForm, dados){
        cache.value[nomeForm] = dados
    }

    function obterForm(nomeForm){
        return cache.value[nomeForm] || null
    }

    function limparForm(nomeForm){
        delete cache.value[nomeForm]
    }

    function existeCache(nomeForm){
        return cache.value[nomeForm] !== undefined && cache.value[nomeForm] !== null
    }

    return { cache, salvarForm, obterForm, limparForm, existeCache }
})