import { useAuthStore } from '../store/auth'
import { useApi } from './useApi'
import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'

export function useAuthService(){

    const auth = useAuthStore()
    const { api } = useApi()
    const loading = ref(false)
    const error = ref(null)

    //Função para verificar se o token esta expirado
    function isTokenExpired(token){
        try{
            const decode = jwtDecode()
            return decode.exp * 1000 < Date.now()
        }catch{
            return true
        }
    }

    // Função auxiliar para codificar Base64URL
    const base64UrlEncode = (obj) => {
        const jsonString = JSON.stringify(obj)
        const base64 = btoa(unescape(encodeURIComponent(jsonString)))
        return base64
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
    }

    //Função real de login com JWT
    async function loginReal({email, senha}){
        try{
            loading.value = true
            error.value = null

            const { data } = await api.post('http://127.0.0.1:8000/api/auth/login', { email: email, password: senha })

            // Supondo que a API retorne { token, user }
            const { token, user } = data

            // Verifica se o token é válido
            if (!token || isTokenExpired(token)) {
                throw new Error('Token inválido ou expirado')
            }

            auth.setSession(token, user)
            return true

        }catch(err){
            error.value = err.response?.data?.message || 'Erro ao fazer login'
            throw err

        }finally{
            loading.value = false

        }
    }

    //Função de login fake com JWT
    async function loginFake({ email, senha }) {
        try {
            loading.value = true
            error.value = null

            // Carrega usuários do JSON público
            const response = await fetch('/data/users.json')
            if (!response.ok) {
                throw new Error('Erro ao carregar dados de usuários')
            }
            
            const users = await response.json()
            const found = users.find(u => u.email === email && u.senha === senha)
            
            if (found) {
                // Gera JWT fake realista
                const header = { alg: "HS256", typ: "JWT" }
                const payload = {
                    sub: found.id.toString(),
                    name: found.nome,
                    email: found.email,
                    role: found.role,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
                    iss: "barbearia-app"
                }
                
                const encodedHeader = base64UrlEncode(header)
                const encodedPayload = base64UrlEncode(payload)
                const fakeToken = `${encodedHeader}.${encodedPayload}.fake_signature`
                
                const userData = {
                    id: found.id,
                    nome: found.nome,
                    email: found.email,
                    role: found.role
                }
                
                auth.setSession(fakeToken, userData)
                return true
            } else {
                throw new Error('Usuário ou senha inválidos')
            }
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }


    // Função para renovar o token
    async function refreshToken() {
        try {
            const { data } = await api.post('http://127.0.0.1:8000/api/auth/refresh', {}, {
                headers: auth.authHeader
            })
            
            if (data.token) {
                auth.setSession(data.token, auth.user)
                return true
            }
            return false
        } catch (err) {
            auth.logout()
            return false
        }
    }


    // Função principal de login
    async function login(credentials) {
        const useFakeLogin = import.meta.env.VITE_USE_FAKE_AUTH === 'true'
        
        if (useFakeLogin) {
            return await loginFake(credentials)
        } else {
            return await loginReal(credentials)
        }
    }

    // Função para verificar e renovar token automaticamente
    async function checkAndRefreshToken() {
        if (!auth.accessToken) return false
        
        if (isTokenExpired(auth.accessToken)) {
            return await refreshToken()
        }
        
        // Renova o token quando estiver perto de expirar (últimos 5 minutos)
        const decoded = jwtDecode(auth.accessToken)
        const timeUntilExpiry = decoded.exp * 1000 - Date.now()
        
        if (timeUntilExpiry < 5 * 60 * 1000) { // 5 minutos
            return await refreshToken()
        }
        
        return true
    }


    function clearError() {
        error.value = null
    }


    return {
        login,
        refreshToken,
        checkAndRefreshToken,
        isTokenExpired,
        loading,
        error,
        clearError
    }

}