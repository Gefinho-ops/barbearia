<template>
  <nav class="fixed top-0 left-0 min-h-screen shadow-[3px_0_0_theme(colors.zomp)] bg-ghostWhite dark:bg-raisinBlack transition-all duration-500 z-50"
    :class="expandido ? 'w-[300px]' : 'w-[80px]'">
    <!-- Botão toggle -->
    <div @click="toggleMenu" tabindex="0" @keypress.enter="toggleMenu"
      class="flex items-center justify-start mt-5 mb-5 ml-6 cursor-pointer">
      <i class="text-raisinBlack dark:text-ghostWhite text-2xl transition duration-500"
        :class="expandido ? 'bi-x-lg' : 'bi-list'"></i>
    </div>

    <!-- Lista -->
    <ul class="list-none p-0 m-0">
      <li v-for="(item, index) in itens" :key="item.path" tabindex="0" role="menuitem" :aria-current="ativo === index"
        @keydown.enter="selecionarItem(index)"
        @keydown.space.prevent="selecionarItem(index)"
        :class="[
          'transition duration-300 hover:bg-zomp hover:shadow-[inset_5px_0_0_theme(colors.raisinBlack)] dark:hover:shadow-[inset_5px_0_0_theme(colors.ghostWhite)]',
          isActive(item.path) && 'bg-zomp shadow-[inset_5px_0_0_theme(colors.raisinBlack)] dark:shadow-[inset_5px_0_0_theme(colors.ghostWhite)] text-white'
        ]">
        <router-link :to="item.path" @click="selecionarItem(index)"
          class="flex  items-center gap-4 py-4 px-6 mb-2 no-underline text-raisinBlack dark:text-ghostWhite text-lg cursor-pointer transition-all duration-500">
          <i class="text-3xl" :class="item.icone"></i>
          <transition name="fade-slide">
            <span v-if="expandido" class="ml-4">{{ item.name }}</span>
          </transition>
        </router-link>
      </li>

      <!-- Logout -->
      <li>
        <div @click="emit('logout')" tabindex="0" @keypress.enter="emit('logout')"
          class="flex items-center gap-4 py-4 px-6 cursor-pointer dark:text-ghostWhite transition-all duration-500 hover:bg-zomp hover:shadow-[inset_5px_0_0_theme(colors.raisinBlack)] dark:hover:shadow-[inset_5px_0_0_theme(colors.ghostWhite)]">
          <i class="bi-door-closed text-3xl"></i>
          <transition name="fade-slide">
            <span v-if="expandido" class="ml-4 text-lg text-raisinBlack dark:text-ghostWhite">Sair</span>
          </transition>
        </div>
      </li>
    </ul>
  </nav>
</template>


<script setup>
    //IMPORTAÇÃO DE MÓDULOS
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    //INSTÂNCIA
    const route = useRoute()

    //DEFINIÇÃO DE PROP's
    const props = defineProps({
        itens:{
            type: Array,
            required: true
        }
    })

    //DEFINIÇÃO DE EMIT's
    const emit = defineEmits(['logout'])

    //DEFINIÇÃO DE ESTADO REATIVO
    const expandido = ref(false)
    const ativo = ref(null)

    //FUNÇÕES
    const toggleMenu = () => {                           //função de toggle do expansão do menu.
        expandido.value = !expandido.value
    }
    
    const selecionarItem = (index) => {                 //função para marcar item do menu manualmente ao clicar.
        ativo.value = index
    }

    function isActive(path){                            //função para saber se a rota atual corresponde ao item.
      return route.path === path
    }

    //WATCH's
    watch(() => route.path, (newPath) => {              //atualiza o índice ativo conforme a rota.
      const foundIndex = props.itens.findIndex((i) => i.path === newPath)
      if(foundIndex !== -1) ativo.value = foundIndex
    },
    { immediate: true}
  )

</script>

<style scoped>
    /* Texto (controlado pela transição) */
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all .3s ease;
    }
    .fade-slide-enter-from {
        opacity: 0;
        transform: translateX(-10px);
    }
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateX(-10px);
    }
</style>

    