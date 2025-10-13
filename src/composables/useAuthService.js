import { useAuthStore } from '../store/auth'
import { useApi } from './useApi'
import { ref } from 'vue'

export function useAuthService(){

    const auth = useAuthStore()
    const { api } = useApi()
    const loading = ref(false)
    const error = ref(null)


    //Função real de login com token HttpOnly
    async function loginReal({email, senha}){
        try{
            loading.value = true
            error.value = null

            const { data } = await api.post('http://127.0.0.1:8000/api/auth/login', { email: email, password: senha })

            // Supondo que a API retorne { token, user }
            if(data.user){
                auth.setUser(data.user)
                return true
            }else{
                throw new Error('Usuário inválido ou sem retorno do servidor')
            }
        }catch(err){
            error.value = err.response?.data?.detail || err.response?.data?.message || 'Erro ao fazer login'
            throw err
        }finally{
            loading.value = false
        }
    }

    

    // Função de login fake simplificada (sem JWT)
    async function loginFake({ email, senha }) {
    try {
        const auth = useAuthStore()
        loading.value = true
        error.value = null

        // Carrega usuários do JSON público
        const response = await fetch('/data/users.json')
        if (!response.ok) {
        throw new Error('Erro ao carregar dados de usuários')
        }

        const users = await response.json()

        // Verifica se o usuário existe e se a senha está correta
        const found = users.find(u => u.email === email && u.senha === senha)
        if (!found) {
        throw new Error('Usuário ou senha inválidos')
        }

        // Monta os dados básicos do usuário logado
        const userData = {
        id: found.id,
        nome: found.nome,
        email: found.email,
        role: found.role,
        }

        // Define sessão no Pinia (sem token)
        auth.setSession(userData)

        return true
    } catch (err) {
        error.value = err.message || 'Falha ao efetuar login'
        throw err
    } finally {
        loading.value = false
    }
    }


    // Função de logout
    async function logout() {
        try {
            await api.post("/api/auth/logout"); // backend remove o cookie
            auth.clearUser();
        } catch (err) {
            console.error("Erro ao deslogar:", err);
        }
    }

    //Função para renovar token
    async function checkSession() {
        try {
            const { data } = await api.get("/api/auth/me"); // endpoint que retorna o usuário logado
        if (data.user) {
            auth.setUser(data.user);
            return true;
        }
            return false;
        } catch {
            return false;
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


    //Funçao para limpar erro
    function clearError() {
        error.value = null
    }


    return {
        login,
        logout,
        checkSession,
        loading,    
        error,
        clearError
    }
    
}
