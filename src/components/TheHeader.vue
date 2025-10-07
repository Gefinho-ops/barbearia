<!-- <template>
    <header>
        <div class="w-full  px-6 flex items-center justify-between">
            <div class="h-[80px] w-[80px] rounded bg-zomp opacity-0"></div>
            <img class="w-[180px] h-[100px]" src="../assets/barber-etiqueta-a-colecao.png" alt="logo">    
            <div class="h-[80px] w-[80px] rounded-[50%] bg-zomp cursor-pointer block"></div>
        </div>
    </header>
</template> -->

<template>
  <header class="w-full">
    <div class="flex items-center justify-between px-4 sm:px-6 lg:px-12">
      <!-- Esquerda (placeholder) -->
      <div class="hidden lg:block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded bg-zomp opacity-0"></div>

      <!-- Logo -->
      <img :src="dark ? logoDark : logoLight"
        alt="logo-da-barbearia"
        class="w-24 h-12 ml-1 sm:ml-1 sm:w-28 sm:h-14 md:w-36 md:h-20 md:ml-8 lg:w-44 lg:h-24 xl:w-52 xl:h-28"
      />

      <!-- Avatar -->
      <div class="h-26 w-26 sm:h-28 sm:w-28 md:h-30 md:w-30 lg:h-32 lg:w-32 xl:h-34 xl:w-34 rounded-full bg-zomp cursor-pointer"></div>
    </div>
  </header>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { ref, onMounted, watch } from 'vue'
    import { useAuthStore } from '../store/auth'
    import { eventBus } from '../config/eventBus'

    //IMPORTAÇÃO DE IMAGENS/COMPONENTES
    import logoLight from '../assets/barber-etiqueta-a-colecao.png'
    import logoDark from '../assets/etiqueta-modo-dark.png'

    //INSTÂNCIAS
    const auth = useAuthStore()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const dark = ref(false)
    const aberto = ref(false)

    //FUNÇÕES
    const abrir = () => {
        aberto.value = !aberto.value
    }

    const modoDark = () => {
        dark.value = !dark.value
    }

    //WATCH's
    watch(() => eventBus.theme, (newTheme) => {
        dark.value = newTheme === 'dark'
    })

    //HOOK's
    onMounted(() => {
        const savedTheme = localStorage.getItem('theme')
        dark.value = savedTheme === 'dark'
    })
    
</script>

