import axios from "axios";
import { useAuthStore } from "../store/auth";

export function useApi() {
    const auth = useAuthStore()

    //criação da instância do axios
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
        timeout: 15000
    })

    //interceptador de requisições
    api.interceptors.request.use((config) => {

        //garante que foi carregado no localStorage
        if(!auth.accessToken) auth.loadFromStorage()

        if(auth.accessToken && !auth.tokenIsExpired(auth.accessToken)){
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${auth.accessToken}`
            }
        }

        return config
    })

    // interceptor de response → tenta refresh se 401
    api.interceptors.response.use(
        (res) => res,
        async (error) => {
            const original = error.config
            if(!original || original.__isRetry){
                return Promise.reject(error)
            }

            if(error.response?.status === 401 && auth.accessToken){
                try{
                    original.__isRetry = true
                    await auth.refreshToken()

                    original.headers = {
                        ...original.headers,
                        Authorization: `Bearer ${auth.accessToken}`
                    }

                    return api(original)
                }catch(err){
                    auth.logout()
                    return Promise.reject(err)
                }
            }
            return Promise.reject(error)
        }
    )

    // helpers opcionais para usar diretamente
    const get = (url, config) => api.get(url, config)
    const post = (url, data, config) => api.post(url, data, config)
    const put = (url, data, config) => api.put(url, data, config)
    const del = (url, config) => api.delete(url, config)

    return { api, get, post, put, del }
}