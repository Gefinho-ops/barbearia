//importação de módulos e libs que serão usadas no código; criação de stores com pinia, reatividade com ref e computed
//gerenciamento/redirecionamento de rotas com useRouter e decodificação de token JWT com jwtDecode.

import { defineStore } from "pinia"                                                     
import { ref, computed } from "vue"                                                       
import { useRouter } from "vue-router"                                                
import { jwtDecode } from "jwt-decode"

//criação de store exportável auth
export const useAuthStore = defineStore('auth', () => {    
    //States                             
    const accessToken = ref(null)                                                       
    const user = ref(null)                                                              
    

    // Getters
    //função computada que verifica se usuário está autenticado
    const isAuthenticated = computed(() => {
        if(!accessToken.value) return false
        
        try{
            const decoded = jwtDecode(accessToken.value)
            return decoded.exp * 1000 > Date.now()
        } catch {
            return false
        }
    })
    
    //função computada para gerar header com o token para requisições HTTP
    const authHeader = computed(() =>
        accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}
    )

    //função computada que extrai informações do usuário do token JWT
    const userFromToken = computed(() => {
        if (!accessToken.value) return null
        try {
            const decoded = jwtDecode(accessToken.value)
            return {
                id: decoded.sub,
                nome: decoded.name,
                email: decoded.email,
                role: decoded.role
            }
        } catch {
            return null
        }
    })

    //ACTIONS
    //função que defini uma seção para o usuário.
    function setSession(token, userInfo = null) {
        accessToken.value = token
        user.value = userInfo

        if (token) {
            localStorage.setItem('accessToken', token)
            if (userInfo) {
                localStorage.setItem('user', JSON.stringify(userInfo))
            }
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
    }

    //função que mantem seção aberta após recarregamento de página (garante reatividade de dados armazenados do localStorage).
    function loadFromStorage(){                                                                                
        const t = localStorage.getItem('accessToken')                                   
        const u = localStorage.getItem('user')                                          

        if (t) {
            accessToken.value = t
            // Tenta extrair user do token se não existir no localStorage
            if (u) {
                user.value = JSON.parse(u)
            } else {
                user.value = userFromToken.value
            }
        }    
    }

    //função para encerrar seção do usuário.
    function logout(){                                                                   
        setSession(null, null)                                                          
    }


    return {
        //Estados reativos
        accessToken,
        user,

        //Getters
        isAuthenticated,
        authHeader,
        userFromToken,

        //Actions
        setSession,
        loadFromStorage,
        logout
    }
})






