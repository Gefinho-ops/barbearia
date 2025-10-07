//Definindo store de autenticação de usuário
import { defineStore } from "pinia";                //lib do pinia (controle global do vue3)
import { ref, computed } from 'vue';                //módulos do vue3 que usaremos 
import { jwtDecode } from "jwt-decode";             //lib para decodificar token JWT do backend

export const useAuthStore = defineStore('auth', () => {
    
    //definição de estados reativos
    const accessToken = ref(null)
    const user = ref(null)

    //getters (computados)
    const isAuthenticated = computed(() => {
        if(!accessToken) return false

        try{
            const decoded = jwtDecode(accessToken.value)
            return decoded.exp * 1000 > Date.now()

        }catch{
            return false
        }
    })

    const authHeader = computed(() => {
        accessToken.value ? { Authorization: `Bearer ${accessToken.value}`} : {}
    })

    const userFromToken = computed(() => {
        if(!accessToken.value) return null

        try{
            const decoded = jwtDecode(accessToken.value)
            return {
                id: decoded.sub,
                nome: decoded.name,
                email: decoded.email,
                role: decoded.role
            }
        }catch{
            return null
        }
    })

    //Actions
    function setSession(token, userData){
        accessToken.value = token
        user.value = userData

        if(token){
            localStorage.setItem('accessToken', token)
            localStorage.setItem('user', JSON.stringify(userData))
        }else{
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
    }

    function logout(){
        setSession(null, null)
    }

    function loadFromStorage(){
        const t = localStorage.getItem('accessToken')
        const u = localStorage.getItem('user')

        if(t){
            accessToken.value = t
            if(u){
                user.value = JSON.parse(u)
            }else{
                user.value = userFromToken.value
            }
        }
    }

    return{
        //Estados reativos ou States
        accessToken,
        user,

        //Getters
        isAuthenticated, 
        userFromToken,
        authHeader,

        //Actions
        setSession,
        loadFromStorage, 
        logout
    }
})