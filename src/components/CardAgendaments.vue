<!-- <template>
    <section class="ml-[100px]">
            <div :class="expandido ? 'h-[230px]' : 'h-[50px]' " class="flex-1 border-2 border-raisinBlack w-[900px] mt-[20px] transition-all duration-300 overflow-hidden">
                <div @click="toggleExpandido" class="my-[5px] mx-[20px] cursor-pointer flex justify-between items-center">
                    <span class="lg:text-[24px] font-normal text-raisinBlack"><i class="bi bi-alarm"></i> {{ agendado.horario }}</span> 
                    <span class="lg:text-[24px] font-normal text-raisinBlack"><i class="bi-scissors"></i> {{ agendado.servico }}</span> 
                    <span class="lg:text-[24px] font-normal text-raisinBlack"><i :class="{'bi-chevron-up':expandido}" class="bi bi-chevron-down"></i></span>                
                </div>
                <div class="flex justify-evenly items-center">
                    <span class="lg:text-[20px] mt-[8px] text-raisinBlack"><i class="bi-person-bounding-box"></i> {{ agendado.cliente }}</span>
                    <span class="lg:text-[20px] mt-[8px] text-raisinBlack"><i class="bi-person-vcard"></i> {{ agendado.funcionario }}</span>
                </div>
                <div class="flex justify-evenly items-center">
                    <span class="lg:text-[20px] mt-[8px] text-raisinBlack"><i class="bi bi-cash-coin"></i> R$ {{ agendado.valor }}</span>
                    <span class="lg:text-[20px] mt-[8px] text-raisinBlack"><i class="bi bi-stopwatch"></i> {{ agendado.duracao }}</span>
                </div>
                <div class="flex justify-start items-center">
                    <span class="lg:text-[20px] mt-[8px] ml-[20px] text-raisinBlack">Observações: {{ agendado.observacoes }}</span>
                </div>
                <div class="my-[13px] mx-[20px] flex justify-between items-center">
                    <span> {{ agendado.id }}<i class="bi-scissors"></i></span>
                    <span>
                        <button @click="servicoPrestado" class="p-[5px] cursor-pointer text-ghostWhite border border-transparent transition-colors duration-300 mr-[10px] bg-zomp hover:bg-green-400">Confirmar</button>
                        <button @click="servicoCancelado" class="p-[5px] cursor-pointer text-ghostWhite border border-transparent transition-colors duration-300 bg-amaranth hover:bg-red-500">Cancelar</button>
                    </span>
                </div>                                    
            </div>
        </section>
</template> -->

<template>
  <section class="px-4 sm:px-6">
    <div :class="expandido ? 'max-h-[400px]' : 'max-h-[60px]'" tabindex="0" @keydown.enter="toggleExpandido"
      class="flex-1 border-2 border-raisinBlack min-w-[700px] md:w-[900px] mt-5 rounded-md transition-all duration-300 overflow-hidden bg-white shadow-sm">
     
      <!-- Header -->
      <div @click="toggleExpandido"
        class="py-2 px-4 cursor-pointer flex justify-between items-center ">
        <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-raisinBlack">
          <i class="bi bi-alarm"></i> {{ agendado.horario }}
        </span>
        <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-raisinBlack">
          <i class="bi bi-scissors"></i> {{ agendado.servico }}
        </span>
        <span class="text-lg text-zomp">
          <i :class="expandido ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </span>
      </div>

      <!-- Body -->
      <div class="p-4 space-y-3">
        <div class="flex flex-col sm:flex-row sm:justify-evenly">
          <span class="text-sm sm:text-base md:text-lg text-raisinBlack">
            <i class="bi-person-bounding-box"></i> {{ agendado.cliente }}
          </span>
          <span class="text-sm sm:text-base md:text-lg text-raisinBlack">
            <i class="bi-person-vcard"></i> {{ agendado.funcionario }}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-evenly">
          <span class="text-sm sm:text-base md:text-lg text-raisinBlack">
            <i class="bi bi-cash-coin"></i> R$ {{ agendado.valor }}
          </span>
          <span class="text-sm sm:text-base md:text-lg text-raisinBlack">
            <i class="bi bi-stopwatch"></i> {{ agendado.duracao }}
          </span>
        </div>

        <div>
          <span class="block text-sm sm:text-base md:text-lg text-raisinBlack">
            <i class="bi bi-chat-left-text"></i> Observações: {{ agendado.observacoes }}
          </span>
        </div>

        <!-- Footer -->
        <div class="flex flex-col sm:flex-row justify-between items-center border-t pt-3">
          <span class="text-sm sm:text-base text-gray-600">
            #{{ agendado.id }} <i class="bi-scissors"></i>
          </span>
          <div class="flex space-x-2 mt-3 sm:mt-0">
            <button @click="servicoPrestado"
              class="px-3 py-1 rounded text-sm sm:text-base cursor-pointer text-ghostWhite bg-zomp hover:bg-green-500 transition">
              Concluir
            </button>
            <button @click="servicoCancelado"
              class="px-3 py-1 rounded text-sm sm:text-base cursor-pointer text-ghostWhite bg-amaranth hover:bg-red-500 transition">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
    import { useCaixaStore } from '../store/caixa'
    import { ref } from 'vue'
    
    const caixa = useCaixaStore()

    const props = defineProps({
        agendado: {
            type: Object,
            required: true
        }
    })

    const emits = defineEmits(['servicoPrestado', 'servicoCancelado'])

    const servicoPrestado = () => {
        const valor = Number(props.agendado.valor || 0)
        caixa.adicionar(valor)
        emits("servicoPrestado", valor)
    }

    const servicoCancelado = () => {
        emits("servicoCancelado")
    }

    const expandido = ref(false)

    const toggleExpandido = () => {
        expandido.value = !expandido.value
    }
</script>