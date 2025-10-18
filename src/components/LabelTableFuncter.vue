<template>
    <div class="flex sm:justify-start sm:flex-row flex-col md:ml-10">
        <h3 class="xl:text-[62px] lg:text-6xl md:text-4xl text-4xl text-center sm:text-left  text-raisinBlack dark:text-ghostWhite">Tela de <span class="text-zomp">funcionários</span></h3>
        <button @click="addFuncter" class="xl:ml-28 lg:ml-47 md:ml-100 sm:ml-110 mt-5 bg-pictonBlue text-ghostWhite cursor-pointer xl:h-[40px] lg:h-10 relative xl:top-[0px] lg:top-0 sm:bottom-5 p-[10px] rounded-[6px] transition-colors duration-300 hover:bg-blue-500">Adicionar funcionário</button>
    </div>
</template>

<script setup>
    import { useModalStore } from '../store/modal';

    const modal = useModalStore()

    const addFuncter = () => {
        modal.openAddFuncter()
    }
</script>