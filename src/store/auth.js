//importação de módulos e libs que serão usadas no código; criação de stores com pinia, reatividade com ref e computed
//gerenciamento/redirecionamento de rotas com useRouter e decodificação de token JWT com jwtDecode.

import { defineStore } from "pinia"                                                     
import { ref, computed } from "vue"                                                       

//criação de store exportável auth
export const useAuthStore = defineStore('auth', () => {    
    //States                                                                                   
    const user = ref(null)                                                              
    

    // Getters
    //função computada que verifica se usuário está autenticado
    const isAuthenticated = computed(() => !!user.value)
    

    //Actions
    //função que define o usuário e armazena no localStorage
    function setUser(userData){
        user.value = userData
        localStorage.setItem('user', JSON.stringify(userData))
    }

    //função que carrega o usuário do localStorage (se existir)
    function loadUser(){
        const stored = localStorage.getItem('user')
        if(stored){
            user.value = JSON.parse(stored)
        }
    }

    //função que limpa o usuário do state e do localStorage
    function clearUser(){
        user.value = null
        localStorage.removeItem('user')
    }

    // Apenas para ambiente de desenvolvimento
    function setSession(userInfo) {
        user.value = userInfo
        localStorage.setItem('user', JSON.stringify(userInfo))
    }

    
    return {
        //Estados reativos
        user,

        //Getters
        isAuthenticated,

        //Actions
        setUser,
        loadUser,
        clearUser,
        setSession
    }
})






