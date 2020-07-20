import { ChangeOneString } from "./changeMiniComponents/ChangeOneString";
import { ChangeAddress } from "./changeMiniComponents/ChangeAddress";
import { ChangeName } from "./changeMiniComponents/ChangeName";
import { ChangeBirth } from "./changeMiniComponents/ChangeBirth";
import { settingsEmail, settingsPhone, settingsName, settingsBirth, settingsAddress } from "./changeMiniComponents/changeSettings";
import { validateEmail, validatePhone, validateName, validateDate, validateAddress } from "../../utils/validateFunctions";

export const SETTINGS = {
    JOBSEEKER: {
        'email': {
            'title': 'Электронная почта',
            'changeComponent': ChangeOneString,
            'changeSettings': settingsEmail,
            'validateFunction': validateEmail          
        },
        'phone': {
            'title': 'Номер телефона',
            'changeComponent': ChangeOneString,
            'changeSettings': settingsPhone,
            'validateFunction': validatePhone
        },
        'name': {
            'title': 'ФИО',
            'changeComponent': ChangeName,
            'changeSettings': settingsName,
            'validateFunction': validateName
        },
        'address': {
            'title': 'Адрес',
            'changeComponent': ChangeAddress,
            'changeSettings': settingsAddress,
            'validateFunction': validateAddress
        },
        'datebirth': {
            'title': 'Дата рождения',
            'changeComponent': ChangeBirth,
            'changeSettings': settingsBirth,
            'validateFunction': validateDate
        }
    }
}