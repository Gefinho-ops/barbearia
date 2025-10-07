<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-zomp rounded-lg p-6 w-[800px] h-[320px] relative">
      <div class="w-[750px] h-[310px] z-50 bg-ghostWhite dark:bg-raisinBlack rounded-[10px] relative bottom-[20px] right-[20px]">
        <h3 class="font-montserrat font-bold text-raisinBlack dark:text-ghostWhite text-[38px] pt-[30px] pl-[60px]">Corte <span class="font-montserrat text-zomp text-[38px]">rápido</span></h3>
        <form @submit.prevent="">
          <div class="flex justify-evenly mt-[25px]">
            <input type="text" v-model="cliente" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Cliente:">
            <input type="text" v-model="funcionario" class="dark:text-ghostWhite font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Funcionário:">
          </div>
          <div class="mt-[15px]">
            <input type="text" v-model="servico" class="dark:text-ghostWhite ml-[45px] font-montserrat rounded-[10px] outline-none p-[5px] border border-zomp w-[300px] focus:border-2" placeholder="Serviço:">
            <label for="" class="dark:text-ghostWhite font-montserrat ml-[20px]">Valor: R$ </label>
            <input type="text" v-model="valor" class="dark:text-ghostWhite rounded-[10px] outline-none p-[5px] border border-zomp w-[80px] focus:border-2" readonly>
            <label for="" class="dark:text-ghostWhite font-montserrat ml-[20px]">Duração:</label>
            <input type="text" v-model="duracao" class="dark:text-ghostWhite ml-[5px] rounded-[10px] outline-none p-[5px] border border-zomp w-[80px] focus:border-2" readonly>
          </div>
          <div class="flex gap-[10px] mt-[25px] justify-end">
            <button type="submit" class="text-ghostWhite bg-zomp w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-green-600 hover:shadow-[0_0_8px_theme(colors.zomp)]">Agendar</button>
            <button @click="close" class="mr-[20px] text-ghostWhite bg-amaranth w-[120px] p-[7px] rounded-[10px] font-montserrat cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-[0_0_8px_theme(colors.amaranth)]">Cancelar</button>
          </div>
        </form>
          
      </div>
      <button @click="close" class="absolute right-0 top-[5px] rounded-r-[10px] p-[10px] px-[20px] cursor-pointer transition-colors duration-300 text-ghostWhite">✕</button>
      
    </div>
  </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useModalStore } from '../store/modal'
    import { ref } from 'vue'
    import FlatPickr from 'vue-flatpickr-component'
    import 'flatpickr/dist/flatpickr.css'
    import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

    const modal = useModalStore()

    const open = computed(() => modal.newSlashOpen)

    const close = () => modal.closeNewSlash()
</script>