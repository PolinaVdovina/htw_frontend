import { ChangeEmail } from "./changeMiniComponents/ChangeEmail";
import { ChangePhone } from "./changeMiniComponents/ChangePhone";
import { ChangeAddress } from "./changeMiniComponents/ChangeAddress";
import { ChangeName } from "./changeMiniComponents/ChangeName";
import { ChangeBirth } from "./changeMiniComponents/ChangeBirth";
import { settingsEmail, settingsPhone, settingsName, settingsBirth, settingsAddress } from "./changeMiniComponents/changeSettings";
import { validateEmail } from "../../utils/validateFunctions";

export const SETTINGS = {
    JOBSEEKER: {
        'email': {
            'title': 'Электронная почта',
            'changeComponent': ChangeEmail,
            'changeSettings': settingsEmail,
            'validateFunction': validateEmail          
        },
        'phone': {
            'title': 'Номер телефона',
            'changeComponent': ChangePhone,
            'changeSettings': settingsPhone
        },
        'name': {
            'title': 'ФИО',
            'changeComponent': ChangeName,
            'changeSettings': settingsName
        },
        'address': {
            'title': 'Адрес',
            'changeComponent': ChangeAddress,
            'changeSettings': settingsAddress
        },
        'datebirth': {
            'title': 'Дата рождения',
            'changeComponent': ChangeBirth,
            'changeSettings': settingsBirth
        }
    }
}