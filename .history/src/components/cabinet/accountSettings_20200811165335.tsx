import { 
    settingsEmail, 
    settingsPhone, 
    settingsName, 
    settingsBirth, 
    settingsAddress, 
    settingsNameOrg, 
    settingsInn, 
    settingsOgrn, 
    settingsDescription, 
    settingsGender, 
    settingsTypesEdu, 
    settingsExperience, 
    settingsCompetenceSet, 
    settingsJobs, 
    settingsEdu 
} from "./changeMiniComponents/changeSettings";
import { 
    validateEmail, 
    validatePhone, 
    validateName, 
    validateDate, 
    validateAddress, 
    validateInn, 
    validateNameOrg, 
    validateOgrn 
} from "../../utils/validateFunctions";
import { 
    changeJobSeekerData, 
    changeJobSeekerAddress, 
    changeJobSeekerContactDetails, 
    changeGender, 
    changeEmployerAddress, 
    deleteEmployerAddress, 
    changeCompetenceSet, 
    deleteCompetence, 
    changeTypesEdu, 
    deleteTypeEdu, 
    changeJobApplicance, 
    deleteJobApplicant
} from "../../utils/change-component-utils";

export const SETTINGS = {
    INDIVIDUAL: {
        about: {
            title: 'О себе',
            changeSettings: settingsDescription,
            validateFunction: validateDate,
            changeFunction: changeJobSeekerData,      
        },
        email: {
            title: 'Электронная почта',
            changeSettings: settingsEmail,
            validateFunction: validateEmail,
            changeFunction: changeJobSeekerContactDetails,      
        },
        phone: {
            title: 'Номер телефона',
            changeSettings: settingsPhone,
            validateFunction: validatePhone,
            changeFunction: changeJobSeekerContactDetails,
        },
        name: {
            title: 'ФИО',
            changeSettings: settingsName,
            validateFunction: validateName,
            changeFunction: changeJobSeekerData,
        },
        address: {
            title: 'Адрес',
            changeSettings: settingsAddress,
            validateFunction: validateAddress,
            changeFunction: changeJobSeekerAddress,
        },
        dateBirth: {
            title: 'Дата рождения',
            changeSettings: settingsBirth,
            validateFunction: validateDate,
            changeFunction: changeJobSeekerData,
        },
        gender: {
            title: 'Пол',
            changeSettings: settingsGender,
            validateFunction: null,
            changeFunction: changeGender,
        },
        employer: {
            title: 'Работодатель'
        },
        experience: {
            title: 'Опыт работы',
            changeSettings: settingsExperience,
            validateFunction: null,
            changeFunction: changeJobSeekerData
        },
        competenceSet: {
            title: 'Компетенции',
            type: 'mass',
            changeSettings: settingsCompetenceSet,
            validateFunction: null,
            changeFunction: changeCompetenceSet,
            deleteFunction: deleteCompetence      
        },
        jobApplicantSet: {
            title: 'Место работы',
            type: 'mass',
            changeSettings: settingsJobs,
            changeFunction: changeJobApplicance,
            deleteFunction: deleteJobApplicant
        },
        institutions: {
            title: 'Образование',
            type: 'mass',
            changeSettings: settingsEdu
        }
    },
    LEGAL: {
        name: {
            title: 'Наименование',
            changeSettings: settingsNameOrg,
            validateFunction: validateNameOrg,
            changeFunction: changeJobSeekerData
        },
        about: {
            title: 'О себе',
            changeSettings: settingsDescription,
            validateFunction: validateAbout,
            changeFunction: changeJobSeekerData,      
        },
        inn: {
            title: 'ИНН',
            changeSettings: settingsInn,
            validateFunction: validateInn,
            changeFunction: changeJobSeekerData
        },
        ogrn: {
            title: 'ОГРН',
            changeSettings: settingsOgrn,
            validateFunction: validateOgrn,
            changeFunction: changeJobSeekerData
        },
        address: {
            title: 'Адрес',
            type: 'mass',
            changeSettings: settingsAddress,
            validateFunction: validateAddress,
            changeFunction: changeEmployerAddress,
            deleteFunction: deleteEmployerAddress
        },
        email: {
            title: 'Электронная почта',
            changeSettings: settingsEmail,
            validateFunction: validateEmail,
            changeFunction: changeJobSeekerContactDetails          
        },
        phone: {
            title: 'Номер телефона',
            changeSettings: settingsPhone,
            validateFunction: validatePhone,
            changeFunction: changeJobSeekerContactDetails
        },
        types: {
            title: 'Тип образования',
            type: 'mass',
            changeSettings: settingsTypesEdu,
            validateFunction: validateDate,
            changeFunction: changeTypesEdu,
            deleteFunction: deleteTypeEdu
        },
        branch: {
            title: 'Отрасль'
        }
    }
}