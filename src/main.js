import './style.css'                                                        //importação do arquivo de estilos globais
import { createApp } from 'vue'                                             //importação da função createApp do Vue.js
import App from './App.vue'                                                 //importação do componente raiz da aplicação
import router from './router'                                               //importação do roteador da aplicação
import { createPinia } from 'pinia'                                         //importação da biblioteca Pinia para gerenciamento de estado
import mask from './directives/mask'

//importação para sistema de notificações
import Vue3Toastify, {toast} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


const app = createApp(App)                                      //criação da instância da aplicação Vue.js

app.use(router)                                                 //registro do roteador na aplicação
app.use(createPinia())                                          //registro do Pinia na aplicação

app.use(Vue3Toastify, {                                         //registro do sistema de notificações
    autoClose: 3000,                                            //fecha automaticamente após 3 segundos
    position: 'top-right',                                      //posição no canto superior direito
})

app.directive('mask', mask)                                     //registro da diretiva personalizada 'mask' para máscaras de entrada

app.mount('#app')                                               //monta a aplicação no elemento com id 'app' no HTML
