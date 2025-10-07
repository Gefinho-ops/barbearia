<!-- <template>
        <div class="border-2 mb-[10px] border-raisinBlack w-[94%] flex-1 relative left-[5.5%] mt-[10px] transition-all duration-700 flex justify-between" :class="aberto ? 'h-[100px]':'h-[30px]'">
            <i @click="abrir" class="bi bi-caret-down-fill ml-[10px] cursor-pointer" id="seta"></i>
            <span class="mr-[10px]">
                <strong class="mr-[3px] text-zomp"> {{ caixaFormatada }}</strong>| {{ dataFormatada }}<i class="bi bi-calendar4 calendar-icon ml-[5px]"></i>
            </span>
        </div>
</template> -->

<template>
  <div
    class="w-[96%] ml-2 mt-2 mb-2 border-2 border-raisinBlack dark:border-ghostWhite transition-all duration-700 flex items-start justify-between px-2 sm:px-4 md:px-6"
    :class="aberto ? 'h-24' : 'h-8'"
  >
    <!-- Ícone seta -->
    <i @click="abrir" tabindex="0" @keydown.enter="abrir" @keydown.space.prevent="abrir"
      class="bi bi-caret-down-fill cursor-pointer text-lg sm:text-xl md:text-2xl dark:text-ghostWhite"
      id="seta"
    ></i>

    <!-- Info caixa + data -->
    <span class="flex items-center text-2xl sm:text-sm md:text-base lg:text-lg font-montserrat dark:text-ghostWhite">
      <strong class="mr-1 sm:mr-2 text-zomp text-2xl lg:text-xl">{{ caixaFormatada }}</strong>
      <span class="mx-1 hidden sm:inline text-2xl">|</span>
      {{ dataFormatada }}
      <i class="bi bi-calendar4 calendar-icon ml-1 sm:ml-2"></i>
    </span>
  </div>
</template>


<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { useCaixaStore } from '../store/caixa'
    import { ref, computed, unref, watch } from 'vue'

    //INSTÂNCIAS
    const caixa = useCaixaStore()

    //DEFINIÇÃO DE PROP's
    const props = defineProps({
        Letra: {
            type: Object,
            required: true
        }
    })

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const aberto = ref(false)

    //FUNÇÕES
    const abrir = () => {
        aberto.value = !aberto.value
    }

    const moedaFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    //COMPUTED's
    const dataFormatada = computed(() => {
        const raw = props.Letra?.dataHoje
        const valor = unref(raw)

        if (!valor && valor !== 0) return ''

        // se já for Date
        if (valor instanceof Date && !isNaN(valor)) {
            return new Intl.DateTimeFormat('pt-BR').format(valor)
        }

        // se for número (timestamp)
        if (typeof valor === 'number' && Number.isFinite(valor)) {
            return new Intl.DateTimeFormat('pt-BR').format(new Date(valor))
        }

        // se for string, tenta parsear (ISO ou YYYY-MM-DD funcionam)
        if (typeof valor === 'string') {
            const parsed = Date.parse(valor)
            if (!isNaN(parsed)) {
            return new Intl.DateTimeFormat('pt-BR').format(new Date(parsed))
            }
            // se não parseou (ex.: "25/08/2025"), só retorna tal qual
            return valor
        }

        // fallback
        return String(valor)
    })

    const caixaNumero = computed(() => caixa.total)
    
    const caixaFormatada = computed(() => caixa.formatado)

    //WATCH's
    watch(() => props.dataHoje, (novaData, antigaData) => {
        if(novaData.toDateString() !== antigaData?.toDateString()){
            caixa.resetar()
        }
    })

</script>