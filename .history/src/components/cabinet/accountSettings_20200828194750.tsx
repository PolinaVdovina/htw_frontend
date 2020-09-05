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
    settingsEdu, 
    settingsIndustry,
    settingsEduDamaged
} from "./changeMiniComponents/changeSettings";
import { 
    validateEmail, 
    validatePhone, 
    validateName, 
    validateDate, 
    validateAddress, 
    validateInn, 
    validateNameOrg, 
    validateOgrn, 
    validateAbout,
    validateEducation
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
    deleteJobApplicant,
    changeEducations,
    deleteEducation,
    changeIndustrySet,
    deleteIndustry
} from "../../utils/change-component-utils";
import { SimpleTypography } from "./displayMiniComponents/SimpleTypography";
import { SimpleLink } from "./displayMiniComponents/SimpleLink";
import { AddressGlue } from "./displayMiniComponents/AddressGlue";
import { JobApplicant } from "./displayMiniComponents/JobApplicant";
import { Education } from "./displayMiniComponents/Education";
import { Competences } from "./displayMiniComponents/Competences";

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
            displayComponent: SimpleTypography     
        },
        phone: {
            title: 'Номер телефона',
            changeSettings: settingsPhone,
            validateFunction: validatePhone,
            changeFunction: changeJobSeekerContactDetails,
            displayComponent: SimpleTypography
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
            displayComponent: SimpleTypography
        },
        dateBirth: {
            title: 'Дата рождения',
            changeSettings: settingsBirth,
            validateFunction: validateDate,
            changeFunction: changeJobSeekerData,
            displayComponent: SimpleTypography
        },
        gender: {
            title: 'Пол',
            changeSettings: settingsGender,
            validateFunction: null,
            changeFunction: changeGender,
            displayComponent: SimpleTypography
        },
        employer: {
            title: 'Работодатель',
            displayComponent: SimpleLink
        },
        experience: {
            title: 'Опыт работы',
            changeSettings: settingsExperience,
            displayComponent: SimpleTypography,
            validateFunction: null,
            changeFunction: changeJobSeekerData
        },
        competenceSet: {
            title: 'Компетенции',
            type: 'mass',
            changeSettings: settingsCompetenceSet,
            displayComponent: Competences,
            validateFunction: null,
            changeFunction: changeCompetenceSet,
            deleteFunction: deleteCompetence      
        },
        jobApplicantSet: {
            title: 'Место работы',
            type: 'mass',
            changeSettings: settingsJobs,
            displayComponent: JobApplicant,
            changeFunction: changeJobApplicance,
            deleteFunction: deleteJobApplicant
        },
        education: {
            title: 'Образование',
            type: 'mass',
            displayComponent: Education,
            changeSettings: settingsEdu,
            changeFunction: changeEducations,
            deleteFunction: deleteEducation,
            validateFunction: validateEducation
        },
        educationDamaged: {
            changeSettings: settingsEduDamaged,
            changeFunction: changeEducations,
            validateFunction: validateEducation
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
            changeFunction: changeJobSeekerData,
            displayComponent: SimpleTypography
        },
        ogrn: {
            title: 'ОГРН',
            changeSettings: settingsOgrn,
            validateFunction: validateOgrn,
            changeFunction: changeJobSeekerData,
            displayComponent: SimpleTypography
        },
        address: {
            title: 'Адрес',
            type: 'mass',
            changeSettings: settingsAddress,
            displayComponent: AddressGlue,
            validateFunction: validateAddress,
            changeFunction: changeEmployerAddress,
            deleteFunction: deleteEmployerAddress
        },
        email: {
            title: 'Электронная почта',
            changeSettings: settingsEmail,
            validateFunction: validateEmail,
            changeFunction: changeJobSeekerContactDetails,
            displayComponent: SimpleTypography          
        },
        phone: {
            title: 'Номер телефона',
            changeSettings: settingsPhone,
            validateFunction: validatePhone,
            changeFunction: changeJobSeekerContactDetails,
            displayComponent: SimpleTypography
        },
        types: {
            title: 'Тип образования',
            type: 'mass',
            changeSettings: settingsTypesEdu,
            displayComponent: SimpleTypography,
            validateFunction: validateDate,
            changeFunction: changeTypesEdu,
            deleteFunction: deleteTypeEdu
        },
        industry: {
            title: 'Отрасль',
            type: 'mass',
            changeSettings: settingsIndustry,
            displayComponent: SimpleTypography,
            changeFunction: changeIndustrySet,
            deleteFunction: deleteIndustry
        }
    }
}