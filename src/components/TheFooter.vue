<template>
  <footer class="mt-8 mb-4 px-6">
    <!-- Linha divisória -->
    <hr class="w-full max-w-[90%] mx-auto border-t border-raisinBlack dark:border-ghostWhite" />

    <!-- Conteúdo -->
    <div
      class="mt-6 flex flex-col md:flex-row items-center justify-around text-center md:text-left gap-4 md:gap-0">
      <!-- Contato -->
      <span class="text-raisinBlack dark:text-ghostWhite font-montserrat text-[14px] md:text-[16px]">
        Contato:
        <a href="mailto:gerfsonlima@contato.com.br"
          class="no-underline text-zomp hover:underline transition">gerfsonlima@contato.com.br</a>
      </span>

      <!-- Toggle de Dark Mode -->
      <div
        @click="darkMode" id="trilho" tabindex="0" @keypress.enter="darkMode"
        class="relative w-[50px] h-[26px] bg-white dark:bg-gray-300 border border-raisinBlack dark:border-ghostWhite rounded-full cursor-pointer transition-all duration-500">
        <div
          class="absolute top-[2px] left-[2px] w-[22px] h-[22px] bg-gray-300 dark:bg-gray-900 rounded-full transition-all duration-500"
          :class="{ 'translate-x-[24px]': isDark }"></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { ref, watch, onMounted } from 'vue';
    import { eventBus } from '../config/eventBus';

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const isDark = ref(false)

    //FUNÇÕES
    const darkMode = () => {
        isDark.value = !isDark.value
    }

    //WATCH's
    watch(isDark, (val) => {
        const html = document.documentElement
        const theme = val ? 'dark' : 'light'
        html.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)

        eventBus.theme = theme
    })

    //HOOK's
    onMounted(() => {
        const saved = localStorage.getItem('theme')
        if (saved) {
            isDark.value = saved === 'dark'
            eventBus.theme = saved
            document.documentElement.setAttribute('data-theme', saved)
        }
    })
</script>
