export const menus = {
    cliente: [
        {name: 'Home', path: '/cliente/home', icone: 'bi-house'},                              //expecífico para cada tipo de usuário
        {name: 'Perfil', path: '/cliente/perfil', icone: 'bi-person-bounding-box'},                  //dados pessoais de cadastro (podendo editar)
        {name: 'Serviços', path: '/cliente/servicos',  icone: 'bi-scissors'},
        {name: 'Agendamentos', path: '/cliente/agendamentos', icone: 'bi-calendar-week-fill'},          //agendamentos futuros e passados do usuário
        {name: 'Notificações', path: '/cliente/notificacoes', icone: 'bi-bell'},           //notificações exclusiva do usuário
    ],
    funcionario: [
        {name: 'Home', path: '/funcionario/home', icone: 'bi-house'},                              //expecífico para cada tipo de usuário
        {name: 'Perfil', path: '/funcionario/perfil', icone: 'bi-person-vcard'},          //dados pessoais de cadastro (podendo editar)
        {name: 'Serviços', path: '/funcionario/servicos', icone: 'bi-scissors'},
        {name: 'Agendamentos', path: '/funcionario/agendamentos', icone: 'bi-calendar-week-fill'},          //agendamentos futuros e passados do usuário
        {name: 'Notificações', path: '/funcionario/notificacoes', icone: 'bi-bell'},           //notificações exclusiva do usuário
    ],
    admin: [
        {name: 'Home', path: '/admin/home', icone: 'bi-house'},                              //expecífico para cada tipo de usuário
        {name: 'Clientes', path: '/admin/clientes', icone: 'bi-person-bounding-box'},                  //dados pessoais de cadastro (podendo editar)
        {name: 'Funcionarios', path: '/admin/funcionarios', icone: 'bi-person-vcard'},          //dados pessoais de cadastro (podendo editar)
        {name: 'Serviços', path: '/admin/servicos', icone: 'bi-scissors'},
        {name: 'Agendamentos', path: '/admin/agendamentos', icone: 'bi-calendar-week-fill'},          //agendamentos futuros e passados do usuário
        {name: 'Notificações', path: '/admin/notificacoes', icone: 'bi-bell'},           //notificações exclusiva do usuário
        {name: 'Dashboards', path: '/admin/dashboards',  icone: 'bi-bar-chart-line'},               //visão geral do sistema, cortes, caixas, etc
    ]
}