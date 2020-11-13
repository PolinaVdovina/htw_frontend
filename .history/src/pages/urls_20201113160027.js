export const urls = {
    home: {
        title: 'Главная',
        path: '/',
        shortPath: '/',
    },
    registrationWithRole: {
        title: 'Регистрация',
        path: '/register/:role',
        shortPath: '/register',
        shortPathJobseeker: '/register/ROLE_JOBSEEKER',
        shortPathEmployer: '/register/ROLE_EMPLOYER',
        shortPathInstitution: '/register/ROLE_INSTITUTION',
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
    typeNewPassword: {
        title: "Смена пароля",
        path: "/type-new-password/:token",
        shortPath: "/type-new-password"
    },
    passwordRecoveryRequest: {
        title: "Восстановление пароля",
        path: "/password-recovery",
        shortPath: "/password-recovery"
    },
    notifications: {
        title: 'Уведомления',
        path: '/notifications/',
        shortPath: '/notifications',
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
        title: 'События по подпискам',
        path: '/news/:entity',
        shortPath: '/news/'
    },
    analytics: {
        title: 'Аналитика',
        path: '/crm-institute/',
        shortPath: '/crm-institute'
    },
    chat: {
        title: 'Чат',
        path: '/chat/',
        shortPath: '/chat'
    },
    settings:
    {
        title: 'Настройки',
        path: '/settings/',
        shortPath: '/settings'
    },
    accountActivation: {
        title: "Подтвердите аккаунт",
        path: "/activation",
        shortPath:"/activation"
    },
    accountActivationSuccess: {
        title: "Аккаунт подтвержден",
        path: "/activation-success/:code",
        shortPath:"/activation-success"
    },
    changeEmail: {
        title: "Почта изменена",
        path: "/change-email/:token",
        shortPath: "/change-email",
    },
    vacancy: {
        title: 'Вакансия',
        path: "/vacancy/:id",
        shortPath: "/vacancy"
    }
}