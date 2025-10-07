<!-- <template>
    <div class="botoes">
        <button @click="newClick" class="cursor-pointer lg:p-[8px] lg:text-[16px] font-montserrat text-ghostWhite transition duration-500 bg-zomp rounded-[6px] hover:bg-green-600 hover:shadow-[0_0_8px_theme(colors.zomp)]">Corte rápido <i class=" bi bi-plus-circle relative left-[3px]"></i></button>
        <button @click="onClick" class="ml-[10px] mr-[10px] cursor-pointer lg:p-[8px] lg:text-[16px] font-montserrat text-ghostWhite transition duration-500 bg-zomp rounded-[6px] hover:bg-green-600 hover:shadow-[0_0_8px_theme(colors.zomp)]">Novo agendamento <i class="bi bi-calendar-check relative left-[3px]"></i></button>
    </div>
</template> -->

<template>
  <div class="flex flex-col flex-1 sm:flex-row sm:justify-end gap-3 sm:gap-4 lg:gap-6 lg:justify-end">
    <!-- Botão Corte rápido -->
    <button @click="newClick"
      class="w-full h-10 sm:w-auto  px-4 py-1 text-sm sm:text-base font-montserrat text-ghostWhite 
             bg-zomp rounded-md cursor-pointer 
             transition duration-300 hover:bg-green-600 
             hover:shadow-[0_0_8px_theme(colors.zomp)] flex items-center justify-center">
        Corte rápido <i class="bi bi-plus-circle ml-2"></i></button>

    <!-- Botão Novo agendamento -->
    <button @click="onClick"
      class="w-full h-10 sm:w-auto px-4 py-2 text-sm sm:text-base font-montserrat text-ghostWhite 
             bg-zomp rounded-md cursor-pointer 
             transition duration-300 hover:bg-green-600 
             hover:shadow-[0_0_8px_theme(colors.zomp)] flex items-center justify-center">
        Novo agendamento <i class="bi bi-calendar-check ml-2"></i></button>
  </div>
</template>


<script setup>
    import { useAuthStore } from '../store/auth'
    import { useModalStore } from '../store/modal';
    import { ref, watch } from 'vue';

    const auth = useAuthStore()
    const modal = useModalStore()

    const onClick = () => {
        modal.open()
    }

    const newClick = () => {
        modal.openNewSlash()
    }
</script>
    