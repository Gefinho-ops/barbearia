export const appConfig = {
    // Usar login fake baseado em variável de ambiente
    useFakeAuth: import.meta.env.VITE_USE_FAKE_AUTH === 'true',
    
    // URLs da API
    api: {
        baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
        timeout: 10000
    },
    
    // Configurações de autenticação
    auth: {
        tokenRefreshInterval: 15 * 60 * 1000 // 15 minutos
    }
}