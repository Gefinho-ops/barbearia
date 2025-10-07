<!-- <template>
    <section>
        <div class="cardNovo">
            <div class="border border-zomp rounded-[10px] w-[300px] h-[190px] mt-[20px] mr-[30px] flex flex-col items-start">
                <span class="ml-[30px] mt-[10px] text-[18px] text-raisinBlack">
                    <i class="bi bi-calendar ml-[10px]"></i> {{ agendamento.data }}
                    <i class="bi bi-alarm ml-[40px]"></i> {{ agendamento.horario }}
                </span>
                <span class="ml-[30px] mt-[5px]"><i class="bi-person-bounding-box"></i> {{ agendamento.cliente }}</span>
                <span class="ml-[30px] mt-[5px]"><i class="bi-scissors"></i> {{ agendamento.servico }}</span>
                <span class="ml-[30px] mt-[5px]"><i class="bi-person-vcard"></i> {{ agendamento.funcionario }}</span>
                
                <span class="ml-[100px] flex mt-[15px]">
                    <button @click="confirmarAgendamento" class="p-[5px] cursor-pointer rounded-[10px] text-ghostWhite border border-transparent transition-colors duration-300 mr-[10px] bg-zomp">Confirmar</button>
                    <button @click="confirmarCancelamento" class="p-[5px] cursor-pointer rounded-[10px] text-ghostWhite border border-transparent transition-colors duration-300 bg-amaranth">Cancelar</button>
                </span>
                
            </div>
        </div>
    </section>
</template> -->

<template>
  <section class="p-4">
    <div class="border border-zomp rounded-xl w-full sm:w-[300px] h-auto mt-5 sm:mr-8 flex flex-col items-start bg-white shadow-sm">
      <!-- Data e horário -->
      <span class="px-4 mt-3 text-sm sm:text-base md:text-lg text-raisinBlack flex flex-wrap gap-4">
        <span><i class="bi bi-calendar"></i> {{ agendamento.data }}</span>
        <span><i class="bi bi-alarm"></i> {{ agendamento.horario }}</span>
      </span>

      <!-- Cliente -->
      <span class="px-4 mt-2 text-sm sm:text-base text-raisinBlack">
        <i class="bi-person-bounding-box"></i> {{ agendamento.cliente }}
      </span>

      <!-- Serviço -->
      <span class="px-4 mt-2 text-sm sm:text-base text-raisinBlack">
        <i class="bi-scissors"></i> {{ agendamento.servico }}
      </span>

      <!-- Funcionário -->
      <span class="px-4 mt-2 text-sm sm:text-base text-raisinBlack">
        <i class="bi-person-vcard"></i> {{ agendamento.funcionario }}
      </span>

      <!-- Botões -->
      <div class="flex justify-center sm:justify-end px-4 mt-4 mb-3 gap-3 w-full">
        <button @click="confirmarAgendamento"
          class="px-3 py-1 text-sm sm:text-base cursor-pointer rounded-lg text-ghostWhite transition-colors duration-300 bg-zomp hover:bg-green-500">
          Confirmar
        </button>
        <button @click="confirmarCancelamento"
          class="px-3 py-1 text-sm sm:text-base cursor-pointer rounded-lg text-ghostWhite transition-colors duration-300 bg-amaranth hover:bg-red-500">
          Recusar
        </button>
      </div>
    </div>
  </section>
</template>


<script setup>

    const props = defineProps({
        agendamento: {
            type: Object,
            required: true
        }
    })

    const emits = defineEmits(['confirmar', 'cancelar'])

    const confirmarAgendamento = () => {
        emits("confirmar")
    }

    const confirmarCancelamento = () => {
        emits("cancelar")
    }
</script>