import { ChangeAddress } from "./ChangeAddress"
import { ChangeDate } from "./ChangeDate"
import { ChangeGender } from "./ChangeGender"
import { ChangeMultiSelect } from "./ChangeMultiSelect"
import { ChangeExperience } from "./ChangeExperience"
import { ChangeOneString } from "./ChangeOneString"

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
        listItemsSelect: [
            'пиздить',
            'адаптировать',
            'кодить',
            'чай пить',
        ],
        changeComponent: ChangeMultiSelect
    }
}

export const settingsExperience = {
    experience: {
        title: 'Выберите период',
        changeComponent: ChangeExperience
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

export const settingsDescription = {
    about: {
        title: "О себе",
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
        title: 'Образовательная организация'
    },
    specialty: {
        title: 'Специальность'
    },
    dateStart: {
        title: 'Дата начала'
    },
    dateEnd: {
        title: 'Дата окончания'
    }
}