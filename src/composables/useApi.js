import axios from "axios";
import { useAuthStore } from "../store/auth";

export function useApi() {

    //criação da instância do axios
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
        timeout: 15000,
        withCredentials: true,                                                     //Envia cookie HttpOnly junto com a requisição
    })

   

    // interceptor de response → tenta refresh se 401
    api.interceptors.response.use(
        (res) => res,
        async (error) => {
            //se cookie estiver expirado, logout automático
            if(error.response?.status === 401){
                console.warn("Sessão expirada, necessário novo login.")
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