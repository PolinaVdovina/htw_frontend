import { ChangeAddress } from "./ChangeAddress"
import { ChangeDate } from "./ChangeDate"
import { ChangeGender } from "./ChangeGender"
import { ChangeMultiSelect } from "./ChangeMultiSelect"
import { ChangeListOneSelect } from "./ChangeListOneSelect"
import { ChangeOneString } from "./ChangeOneString"
import { listItems } from "../../../utils/appliedFunc"
import { ChangeCompetences } from "./ChangeCompetences"
import { SimpleTypography } from "../displayMiniComponents/SimpleTypography"
import { ChangePassword } from "./ChangePassword"

export const settingsAddress = {
    /*'country': {
        'title': 'Страна'
    },
    'region': {
        'title': 'Регион'
    },
    'city': {
        'title': 'Город'
    },
    'street': {
        'title': 'Улица'
    },
    'houses': {
        'title': 'Дом'
    },
    'flat': {
        'title': 'Квартира/офис'
    }*/
    address: {
        title: 'Новый адрес',
        changeComponent: ChangeAddress
    }
}


export const settingsBirth = {
    dateBirth: {
        title: 'Дата рождения',
        changeComponent: ChangeDate
    }
}

export const settingsGender = {
    gender: {
        title: 'Пол',
        changeComponent: ChangeGender
    }
}

export const settingsTypesEdu = {
    types: {
        title: 'Типы образования',
        listItemsSelect: [
            'среднее профессиональное',
            'бакалавриат',
            'специалитет',
            'магистратура',
            'подготовка кадров высшей квалификации',
            'повышение квалификации',
            'курсы',
        ],
        changeComponent: ChangeMultiSelect
    }
}

export const settingsCompetenceSet = {
    competenceSet: {
        title: 'Выберите компетенции',
        listItemsSelect: {
            'IT и коммуникации': [
                'Администрирование баз данных',
                "Разработка ПО"
            ],
            'Бухгалтерия': [
                "Расчет заработной платы",
                "Аудит"
            ],
            'Образование': [
                "Репетиторство",
                "Дошкольное образование"
            ],
        },
        changeComponent: ChangeCompetences
    }
}

export const settingsExperience = {
    experience: {
        title: 'Выберите период',
        listItemsSelect: listItems(20),
        changeComponent: ChangeListOneSelect
    }
}

export const settingsName = {
    surname: {
        title: 'Фамилия',
        changeComponent: ChangeOneString
    },
    name: {
        title: 'Имя',
        changeComponent: ChangeOneString
    },
    middlename: {
        title: 'Отчество',
        changeComponent: ChangeOneString
    }
}

export const settingsDescriptionIndividual = {
    about: {
        title: "О себе",
        changeComponent: ChangeOneString
    }
}

export const settingsDescriptionLegal = {
    about: {
        title: "Ваш сайт",
        changeComponent: ChangeOneString
    }
}

export const settingsPhone = {
    phone: {
        title: 'Новый номер',
        changeComponent: ChangeOneString
    }
}

export const settingsEmail = {
    email: {
        title: 'Новый адрес',
        changeComponent: ChangeOneString
    }
}

export const settingsInn = {
    inn: {
        title: 'Новый ИНН',
        changeComponent: ChangeOneString
    }
}

export const settingsOgrn = {
    ogrn: {
        title: 'Новый ОГРН',
        changeComponent: ChangeOneString
    }
}

export const settingsNameOrg = {
    name: {
        title: 'Новое наименование',
        changeComponent: ChangeOneString
    }
}

export const settingsJobs = {
    employer: {
        title: 'Компания',
        changeComponent: ChangeOneString
    },
    position: {
        title: 'Должность',
        changeComponent: ChangeOneString
    },
    startDate: {
        title: 'Дата начала',
        changeComponent: ChangeDate
    },
    stopDate: {
        title: 'Дата окончания',
        changeComponent: ChangeDate
    }
}

export const settingsEdu = {
    institution: {
        title: 'Образовательная организация',
        changeComponent: ChangeOneString
    },
    education: {
        title: 'Тип образования',
        listItemsSelect: [
            'среднее профессиональное',
            'бакалавриат',
            'специалитет',
            'магистратура',
            'подготовка кадров высшей квалификации',
            'повышение квалификации',
            'курсы',
        ],
        changeComponent: ChangeListOneSelect
    },
    specialty: {
        title: 'Специальность',
        changeComponent: ChangeOneString
    },
    dateStart: {
        title: 'Дата начала',
        changeComponent: ChangeDate
    },
    dateReceiving: {
        title: 'Дата окончания',
        changeComponent: ChangeDate
    }
}

export const settingsIndustry = {
    industry: {
        title: 'Выберите отрасли',
        changeComponent: ChangeMultiSelect,
        listItemsSelect: [
            'IT и коммуникации',
            'Бухгалтерия' ,
            'Образование',
        ]
    }
}

export const settingsEduDamaged = {
    institution: {
        title: 'Образовательная организация',
        changeComponent: ChangeOneString,
        disabled: true,
        isFilled: true
    },
    education: {
        title: 'Тип образования',
        listItemsSelect: [
            'среднее профессиональное',
            'бакалавриат',
            'специалитет',
            'магистратура',
            'подготовка кадров высшей квалификации',
            'повышение квалификации',
            'курсы',
        ],
        changeComponent: ChangeListOneSelect
    },
    specialty: {
        title: 'Специальность',
        changeComponent: ChangeOneString
    },
    dateStart: {
        title: 'Дата начала',
        changeComponent: ChangeDate
    },
    dateReceiving: {
        title: 'Дата окончания',
        changeComponent: ChangeDate
    }
}

export const settingsStatus = {
    status: {
        title: 'Новый статус',
        listItemsSelect: [
            'В поиске работы',
            'Рассматриваю предложения',
            'Не ищу работу'
        ],
        changeComponent: ChangeListOneSelect
    },
}

export const settingsEmployment = {
    employment: {
        title: 'Выберите тип занятости',
        listItemsSelect: [
            'Полный день',
            'Гибкий график',
            'Неполный день'
        ],
        changeComponent: ChangeMultiSelect
    },
}

export const settingsVacancyType = {
    vacancyTypes: {
        title: 'Выберите тип вакансий',
        listItemsSelect: [
            'Стажировка',
            'Практика',
            'Работа'
        ],
        changeComponent: ChangeMultiSelect
    },
}

export const settingsPassword = {
    currentPassword: {
        title: 'Текущий пароль',
        changeComponent: ChangePassword
    },
    newPassword: {
        title: 'Новый пароль',
        changeComponent: ChangePassword
    }
}

export const settingsVkontakte = {
    vkontakte: {
        title: 'Ссылка на профиль',
        changeComponent: ChangeOneString
    }
}

export const settingsFacebook = {
    facebook: {
        title: 'Ссылка на профиль',
        changeComponent: ChangeOneString
    }
}

export const settingsInstagram = {
    instagram: {
        title: 'Ссылка на профиль',
        changeComponent: ChangeOneString
    }
}
