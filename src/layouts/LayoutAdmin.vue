<template>
  <div class="flex min-h-screen bg-ghostWhite dark:bg-raisinBlack">
    
    <!-- Menu lateral fixo -->
    <MenuLateral :itens="menuUSUARIO" @logout="logout" class="fixed top-0 left-0 z-50 h-full" />

    <div :class="['flex-1 flex flex-col transition-all duration-500', expandidoMenu ? 'ml-[300px]' : 'ml-[80px]']">
      <!-- Header -->
      <TheHeader />

      <!-- SignBoard -->
      <div class="px-4 md:px-6 lg:px-8 mt-4">
        <SignBoard :Letra="letras" />
      </div>

      <!-- QuickFilters e FastButtons -->
      <div class="flex flex-col md:flex-col lg:flex-row lg:items-center justify-between px-4 md:px-6 lg:px-8 mt-4 gap-4">
        <QuickFilters :tipoFixo="buscaStore.tipoFixo" class="w-full md:w-full lg:w-[40%]" />
        <FastButtons class="w-full md:w-full lg:w-[55%]" />
      </div>

      <!-- Conteúdo principal e novos agendamentos -->
      <div class="flex flex-col lg:flex-row px-4 md:px-6 lg:px-8 mt-6 gap-6">
        
        <!-- Área principal da rota -->
        <div class="flex-1">
          <router-view :key="$route.fullPath" />
        </div>

        <!-- Coluna lateral de novos agendamentos -->
        <div class="flex flex-col w-full lg:w-[350px]">
          <LabelNewComponent />

          <div v-if="agendamentos.length === 0"
            class="font-montserrat text-[16px] p-4 text-gray-500">
            Sem pedidos no momento.
          </div>

          <div class="overflow-y-auto max-h-[70vh] flex-1 mt-2 md:grid sm:grid md:grid-cols-3 sm:grid-cols-2 lg:flex lg:flex-col">
            <NewAgendaments
              v-for="item in agendamentos"
              :key="item.id"
              :agendamento="item"
            />
          </div>
        </div>

      </div>

      <!-- Footer -->
      <TheFooter class="mt-6" />
    </div>

    <!-- Modais fora do fluxo normal -->
    <ModalNewAgendament />
    <ModalFastSlash />

  </div>
</template>


<script setup>
    //IMPORTAÇÕES DE COMPONENTES
    import FastButtons from '../components/FastButtons.vue';
    import QuickFilters from '../components/QuickFilters.vue';
    import SignBoard from '../components/SignBoard.vue';
    import TheHeader from '../components/TheHeader.vue';
    import MenuLateral from '../components/MenuLateral.vue';
    import TheFooter from '../components/TheFooter.vue';
    import ModalFastSlash from '../components/ModalFastSlash.vue';
    import ModalNewAgendament from '../components/ModalNewAgendament.vue';
    import LabelNewComponent from '../components/LabelNewComponent.vue';
    import NewAgendaments from '../components/NewAgendaments.vue';

    //IMPORTAÇÕES DE MÓDULOS
    import { ref, reactive, computed, onMounted } from 'vue';
    import { menus } from '../config/menus';
    import { useRouter } from 'vue-router';

    import { useAuthStore } from '../store/auth';
    import { useAuthService } from '../composables/useAuthService';
    import { useBuscaStore } from '../store/busca';
    import { useModalStore } from '../store/modal';

    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import { portuguese} from 'flatpickr/dist/l10n/pt.js';


    //INSTÂNCIAS
    const router = useRouter()
    const auth = useAuthStore()
    const authService = useAuthService()
    const buscaStore = useBuscaStore()
    const modal = useModalStore()

    //DEFINIÇÃO DE ESTADOS REATIVOS
    const agendamentos = ref([])
    const caixaHoje = ref(0)
    const dataHoje = ref(new Date())
    const letras = reactive({caixaHoje, dataHoje})

    //FUNÇÕES
    function adicionarCaixa(valor){
        const n = Number(valor) || 0
        caixaHoje.value = Number((caixaHoje.value + n).toFixed(2))
    }

    function logout(){
        authService.logout()
        router.push('/login')
    }

    //COMPUTED's
    const menuUSUARIO = computed(() => {
        return menus[auth.user?.role] || menus.cliente
    }) 

    //HOOK's
    onMounted(async() => {
        const res = await fetch('/data/home.json')            //usar get (axios) quando testar com o back. fetch é apenas para testes.
        agendamentos.value = await res.json()               //quando usar get use -> res.data ao invés de await res/json.

         // connect()                                                                              //Websocket para novos agendamentos.

        // listen("novo-agendamento", (agendamento) => {
        //     console.log("📡 Novo agendamento recebido:", agendamento)
        //     agendamentos.value.push(agendamento)
        // })
        
         // onUnmounted(() => {                                                                  //Desconectar websocket ao sair da página.
    //     disconnect()
    // })
    })
</script>