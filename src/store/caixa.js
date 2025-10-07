import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCaixaStore = defineStore('caixa', () => {
    //Estados reativos
    const total = ref(0)
    const dataAtual = ref(new Date().toDateString())

    //Carregar do localStorage ao iniciar
    const load = () => {
        const salvo = localStorage.getItem("caixa")
        if (salvo) {
        const parsed = JSON.parse(salvo)
        if (parsed.dataAtual === new Date().toDateString()) {
            total.value = parsed.total; // mesmo dia → recupera o total
        } else {
            total.value = 0; // novo dia → reseta
            dataAtual.value = new Date().toDateString()
        }
        }
    }

    //Persistir no localStorage sempre que mudar
    watch([total, dataAtual], () => {
        localStorage.setItem(
        "caixa",
        JSON.stringify({
            total: total.value,
            dataAtual: dataAtual.value,
        })
        )
    })

    //Getters
    const formatado = computed(() => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(total.value)
    })

    //Actions
    function adicionar(valor){
        total.value += Number(valor)
    }

    function resetar(){
        total.value = 0
    }

    // inicializa ao criar store
    load()

    return {
        total,
        dataAtual,
        formatado,
        adicionar,
        resetar
    }
})