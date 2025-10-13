<template>
  <div class="mt-3 flex justify-start  px-4">
    <div class="flex flex-row items-center gap-3 w-full max-w-2xl">
      <!-- Input de busca -->
      <div class="relative flex-1 min-w-[200px]">
        <input :value="buscaStore.termo" @input="buscaStore.setTermo($event.target.value)" type="text" placeholder="Pesquise..."
          class="w-full h-10 p-2 pr-8 rounded border-2 border-transparent outline-none bg-white focus:border-zomp"/>
        <i class="bi bi-search absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"></i>
      </div>

      <!-- Select de filtro -->
      <div class="flex items-center gap-2">
        <label for="selectBusca" class="text-sm font-medium text-gray-700 dark:text-ghostWhite">Filtros:</label>
        <select
          v-model="selectBusca"
          id="selectBusca"
          class="p-2 rounded h-10 border-2 border-transparent outline-none bg-white
                 focus:border-zomp cursor-pointer lg:w-[150px] w-[120px]">
          <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>
    </div>
  </div>
</template>


<script setup>
    //IMPORTAÇÕES DE MÓDULOS
    import { ref, computed, watch, inject } from 'vue'
    import { useAuthStore } from '../store/auth'
    import { useBuscaStore } from '../store/busca'
    import { useRoute } from 'vue-router'

    //INSTÂNCIAS
    const buscaStore = useBuscaStore()
    const auth = useAuthStore()
    const route = useRoute()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const selectBusca = ref('clientes')

    const options = ref([
      { label: 'Clientes', value: 'clientes' },
      { label: 'Funcionários', value: 'funcionarios' },
      { label: 'Serviços', value: 'servicos' },
    ])

    //WATCH's
    watch(() => route.meta.filtrosQuick, (novosFiltros) => {
        if (novosFiltros) options.value = novosFiltros},
      { immediate: true })// quando muda de rota, tenta pegar os filtros da meta

    watch(selectBusca, (val) => buscaStore.setTipoBusca(val))
</script>
