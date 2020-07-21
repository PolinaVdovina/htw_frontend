import { ChangeOneString } from "./changeMiniComponents/ChangeOneString";
import { ChangeAddress } from "./changeMiniComponents/ChangeAddress";
import { ChangeName } from "./changeMiniComponents/ChangeName";
import { ChangeBirth } from "./changeMiniComponents/ChangeBirth";
import { settingsEmail, settingsPhone, settingsName, settingsBirth, settingsAddress, settingsNameOrg, settingsInn, settingsOgrn } from "./changeMiniComponents/changeSettings";
import { validateEmail, validatePhone, validateName, validateDate, validateAddress, validateInn, validateNameOrg, validateOgrn } from "../../utils/validateFunctions";

export const SETTINGS = {
    INDIVIDUAL: {
        email: {
            title: 'Электронная почта',
            changeComponent: ChangeOneString,
            changeSettings: settingsEmail,
            validateFunction: validateEmail          
        },
        phone: {
            title: 'Номер телефона',
            changeComponent: ChangeOneString,
            changeSettings: settingsPhone,
            validateFunction: validatePhone
        },
        name: {
            title: 'ФИО',
            changeComponent: ChangeName,
            changeSettings: settingsName,
            validateFunction: validateName
        },
        address: {
            title: 'Адрес',
            changeComponent: ChangeAddress,
            changeSettings: settingsAddress,
            validateFunction: validateAddress
        },
        dateBirth: {
            title: 'Дата рождения',
            changeComponent: ChangeBirth,
            changeSettings: settingsBirth,
            validateFunction: validateDate
        }
    },
    LEGAL: {
        name: {
            title: 'Наименование',
            changeComponent: ChangeOneString,
            changeSettings: settingsNameOrg,
            validateFunction: validateNameOrg
        },
        inn: {
            title: 'ИНН',
            changeComponent: ChangeOneString,
            changeSettings: settingsInn,
            validateFunction: validateInn
        },
        ogrn: {
            title: 'ОГРН',
            changeComponent: ChangeOneString,
            changeSettings: settingsOgrn,
            validateFunction: validateOgrn
        },
        address: {
            title: 'Адрес',
            changeComponent: ChangeAddress,
            changeSettings: settingsAddress,
            validateFunction: validateAddress
        },
        email: {
            title: 'Электронная почта',
            changeComponent: ChangeOneString,
            changeSettings: settingsEmail,
            validateFunction: validateEmail          
        },
        phone: {
            title: 'Номер телефона',
            changeComponent: ChangeOneString,
            changeSettings: settingsPhone,
            validateFunction: validatePhone
        }
    }
}