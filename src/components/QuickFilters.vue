<!-- <template>
    <div class="mt-[20px] mr-[10px] ml-[85px] flex justify-start">
        <div class="tipo-busca">
            <input :value="buscaStore.termo" @input="buscaStore.setTermo($event.target.value)" class="p-[5px] bg-white outline-none border-2 border-transparent w-[250px] focus:border-zomp" type="text" placeholder="Procure..."><i class="bi bi-search relative right-[25px]"></i>
            <label for="selectBusca">Filtros:</label>
            <select v-model="selectBusca" id="selectBusca" class="p-[5px] ml-[3px] bg-white outline-none lg:w-[125px] cursor-pointer border-2 border-transparent focus:border-zomp">
                <option value="clientes">Clientes</option>
                <option value="funcionarios">Funcionários</option>
                <option value="servicos">Serviços</option>
            </select>
        </div>
    </div>
</template> -->

<template>
  <div class="mt-3 flex justify-start  px-4">
    <div class="flex flex-row items-center gap-3 w-full max-w-2xl">
      <!-- Input de busca -->
      <div class="relative flex-1 min-w-[200px]">
        <input :value="buscaStore.termo" @input="buscaStore.setTermo($event.target.value)" type="text" placeholder="Pesquise..."
          class="w-full h-10 p-2 pr-8 rounded border-2 border-transparent outline-none bg-white 
                 focus:border-zomp"
        />
        <i class="bi bi-search absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"></i>
      </div>

      <!-- Select de filtro -->
      <div class="flex items-center gap-2">
        <label for="selectBusca"
          class="text-sm font-medium text-gray-700 dark:text-ghostWhite"
        >Filtros:</label>
        <select
          v-model="selectBusca"
          id="selectBusca"
          class="p-2 rounded h-10 border-2 border-transparent outline-none bg-white
                 focus:border-zomp cursor-pointer lg:w-[150px] w-[120px]"
        >
          <option value="clientes">Clientes</option>
          <option value="funcionarios">Funcionários</option>
          <option value="servicos">Serviços</option>
        </select>
      </div>
    </div>
  </div>
</template>


<script setup>
    import { ref, computed, watch } from 'vue'
    import { useAuthStore } from '../store/auth'
    import { useBuscaStore } from '../store/busca'

    const buscaStore = useBuscaStore()

    const auth = useAuthStore()

    const selectBusca = ref('clientes')

    const listagem = computed(() => {

    })

    // const busca = watch(antigo, novo, (termo) => {

    // })
</script>
<style scoped>
    .fastButton .botoes button{
        cursor: pointer;
        padding: 8px;
        font-size: 16px;
        border: 1px solid var(--raisinBlack);
        transition: .5s ease;
    }
    .fastButton .botoes button:hover{
        background-color: var(--zomp);
        color: var(--ghostWhite);
        border: 1px solid var(--ghostWhite);
    }
    .fastButton .botoes button i{
        position: relative;
        left: 3px;
    }
    .fastButton .botoes .Na{
        margin-left: 10px;
    }

    @media (max-width: 840px){
        .fastButton{
            align-items: center;
            gap: 220px;
        }
        .fastButton .tipo-busca{
            flex-direction: column;
            align-items: flex-start;
        }
        .fastButton .tipo-busca .pesquisa{
            width: 200px;
            margin-bottom: 5px;
        }
        .fastButton .botoes button{
            justify-content: center;
            align-items: end;  
            margin-bottom: 5px;
            width: 180px;
        }
        .fastButton .botoes .Na{
            margin-left: 0px;
        }
       
        
    }
</style>