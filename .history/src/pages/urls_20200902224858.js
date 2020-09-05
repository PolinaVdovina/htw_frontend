export const urls = {
    home: {
        title: 'Главная',
        path: '/',
        shortPath: '/',
    },
    registration: {
        title: 'Регистрация',
        path: '/register/',
        shortPath: '/register',
    },
    authentication: {
        title: 'Аутентификация',
        path: '/auth/',
        shortPath: '/auth',
    },
    cabinet: {
        title: 'Кабинет',
        path: '/cabinet/:login',
        shortPath: '/cabinet/',
    },
    search: {
        title: 'Поиск',
        path: '/search/:entity',
        shortPath: '/search/',
    },
    news: {
        title: 'Новости',
        path: '/news/:entity',
        shortPath: '/news/'
    }
}