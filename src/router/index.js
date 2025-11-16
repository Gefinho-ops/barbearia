import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../store/auth"                                                                            //importação da store de autenticação               
import { useAuthService } from "../composables/useAuthService"                                                          //importação do serviço de autenticação   
import Login from "../views/Login.vue"                                                                                 //importação da view de login    


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },                                                                              // sempre começa no login                                                                                                  //criando lista com as rotas da aplicação                                     
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },               //tela de error 404, evita erros ao digitar rotas inválidas/tela branca.
        { path: '/login', name: 'login', component: Login },                                                            //criando rota de login com layout específico (para não exibir determinados elementos)
        
        { path: '/admin', 
          component: () => import('../layouts/LayoutAdmin.vue'),
          meta: { requiresAuth: true, role: 'admin'},
          children: [
            { path: 'home', name: 'admin-home', component: () => import('../views/admin/Home.vue'), meta: {filtrosQuick: [{ label: 'Clientes', value: 'clientes' }, { label: 'Funcionários', value: 'funcionarios' }, { label: 'Serviços', value: 'servicos' }]}},
            { path: 'clientes', name: 'admin-clientes', component: () => import('../views/admin/Clientes.vue'), meta: {filtrosQuick: [{ label: 'Clientes', value: 'clientes' }]}},
            { path: 'funcionarios', name: 'admin-funcionarios', component: () => import('../views/admin/Funcionarios.vue'), meta: {filtrosQuick: [{ label: 'Funcionários', value: 'funcionarios' }]}},
            { path: 'agendamentos', name: 'admin-agendamentos', component: () => import('../views/admin/Agendamentos.vue'), meta: {filtrosQuick: [{ label: 'Clientes', value: 'clientes' }, { label: 'Funcionários', value: 'funcionarios' }, { label: 'Serviços', value: 'servicos' }]}},
            { path: 'servicos', name: 'admin-servicos', component: () => import('../views/admin/Servicos.vue'), meta: {filtrosQuick: [{ label: 'Serviços', value: 'servicos'}]}},
            { path: 'notificacoes', name: 'admin-notificacoes', component: () => import('../views/admin/Notificacao.vue'), meta: {filtrosQuick: [{ label: 'Clientes', value: 'clientes'}, {label: 'Funcionários', value: 'funcionarios'}]}},
            { path: 'dashboards', name: 'admin-dashboards', component: () => import('../views/admin/Dashboards.vue'), meta: {filtrosQuick: [{ label: 'Clientes', value: 'clientes'}, {label: 'Funcionários', value: 'funcionarios'}, { label: 'Serviços', value: 'servicos' }]}},
            ]
        },
    ]
})


//NAVIGATIONS GUARD
router.beforeEach(async(to, from, next) => {
    const authStore = useAuthStore()

    // Pequena pausa para garantir reatividade
    await new Promise(resolve => setTimeout(resolve, 0))

    // Verifica autenticação
    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        next('/login')
        return
    }

    // Verifica permissão de role
    if(to.meta.role && authStore.user?.role !== to.meta.role){
        switch(authStore.user?.role){
            case 'cliente':
                next('/cliente/home')
                break
            case 'funcionario':
                next('/funcionario/home')
                break
            case 'admin':
                next('/admin/home')
                break
            default:
                next('/login')
        }
        return
    }
    
    next()
})


export default router                                                                                  //exporta a instância do roteador para ser usada como padrão na aplicação



