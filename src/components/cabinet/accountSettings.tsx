import { ChangeEmail } from "./changeMiniComponents/ChangeEmail";
import { ChangePhone } from "./changeMiniComponents/ChangePhone";
import { ChangeAddress } from "./changeMiniComponents/ChangeAddress";
import { ChangeName } from "./changeMiniComponents/ChangeName";
import { ChangeBirth } from "./changeMiniComponents/ChangeBirth";

export const SETTINGS = {
    JOBSEEKER: {
        'email': {
            'title': 'Электронная почта',
            'changeComponent': ChangeEmail,  
            'changing': "",        
        },
        'phone': {
            'title': 'Номер телефона',
            'changeComponent': ChangePhone
        },
        'name': {
            'title': 'ФИО',
            'changeComponent': ChangeName
        },
        'address': {
            'title': 'Адрес',
            'changeComponent': ChangeAddress
        },
        'datebirth': {
            'title': 'Дата рождения',
            'changeComponent': ChangeBirth
        }
    }
}