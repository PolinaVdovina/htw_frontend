import { ChangeOneString } from "./changeMiniComponents/ChangeOneString";
import { ChangeAddress } from "./changeMiniComponents/ChangeAddress";
import { ChangeName } from "./changeMiniComponents/ChangeName";
import { ChangeBirth } from "./changeMiniComponents/ChangeBirth";
import { settingsEmail, settingsPhone, settingsName, settingsBirth, settingsAddress, settingsNameOrg, settingsInn, settingsOgrn, settingsDescription, settingsGender } from "./changeMiniComponents/changeSettings";
import { validateEmail, validatePhone, validateName, validateDate, validateAddress, validateInn, validateNameOrg, validateOgrn } from "../../utils/validateFunctions";
import { changeJobSeekerData, changeJobSeekerAddress, changeJobSeekerContactDetails, changeGender } from "../../utils/change-component-utils";
import { ChangeGender } from './changeMiniComponents/ChangeGender';

export const SETTINGS = {
    INDIVIDUAL: {
        about: {
            title: 'О себе',
            changeComponent: ChangeOneString,
            changeSettings: settingsDescription,
            validateFunction: validateDate,
            changeFunction: changeJobSeekerData,      
        },
        email: {
            title: 'Электронная почта',
            changeComponent: ChangeOneString,
            changeSettings: settingsEmail,
            validateFunction: validateEmail,
            changeFunction: changeJobSeekerContactDetails,      
        },
        phone: {
            title: 'Номер телефона',
            changeComponent: ChangeOneString,
            changeSettings: settingsPhone,
            validateFunction: validatePhone,
            changeFunction: changeJobSeekerContactDetails,
        },
        name: {
            title: 'ФИО',
            changeComponent: ChangeName,
            changeSettings: settingsName,
            validateFunction: validateName,
            changeFunction: changeJobSeekerData,
        },
        address: {
            title: 'Адрес',
            changeComponent: ChangeAddress,
            changeSettings: settingsAddress,
            validateFunction: validateAddress,
            changeFunction: changeJobSeekerAddress,
        },
        dateBirth: {
            title: 'Дата рождения',
            changeComponent: ChangeBirth,
            changeSettings: settingsBirth,
            validateFunction: validateDate,
            changeFunction: changeJobSeekerData,
        },
        gender: {
            title: 'Пол',
            changeComponent: ChangeGender,
            changeSettings: settingsGender,
            validateFunction: null,
            changeFunction: changeGender,
        }
    },
    LEGAL: {
        name: {
            title: 'Наименование',
            changeComponent: ChangeOneString,
            changeSettings: settingsNameOrg,
            validateFunction: validateNameOrg,
            changeFunction: changeJobSeekerData
        },
        inn: {
            title: 'ИНН',
            changeComponent: ChangeOneString,
            changeSettings: settingsInn,
            validateFunction: validateInn,
            changeFunction: changeJobSeekerData
        },
        ogrn: {
            title: 'ОГРН',
            changeComponent: ChangeOneString,
            changeSettings: settingsOgrn,
            validateFunction: validateOgrn,
            changeFunction: changeJobSeekerData
        },
        address: {
            title: 'Адрес',
            changeComponent: ChangeAddress,
            changeSettings: settingsAddress,
            validateFunction: validateAddress,
            changeFunction: changeJobSeekerAddress
        },
        email: {
            title: 'Электронная почта',
            changeComponent: ChangeOneString,
            changeSettings: settingsEmail,
            validateFunction: validateEmail,
            changeFunction: changeJobSeekerContactDetails          
        },
        phone: {
            title: 'Номер телефона',
            changeComponent: ChangeOneString,
            changeSettings: settingsPhone,
            validateFunction: validatePhone,
            changeFunction: changeJobSeekerContactDetails
        }
    }
}