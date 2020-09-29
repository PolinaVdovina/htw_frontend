import { settings } from "cluster"
import { settingsName } from "../components/cabinet/changeMiniComponents/changeSettings"

export interface IValidateResult {
    isValid: boolean,
    errorsMass: string[]
}

export function validateRegPasword(password: string): string {
    if (password == '')
        return 'Пароль не может быть пустым'
    else if (password.length < 6)
        return 'Пароль должен содержать более 5 символов'    
    else return ''
}

export function validateRegLoginConnect(loginConnect: string) {      
    if (!validateEmail(loginConnect)) {
        if (validatePhone(loginConnect))
            return {
                'error': '',
                'type': 'phone'
            }
        else return {
            'error': 'Введите корректный e-mail адрес или телефон',
            'type': null
        }
    }
    else return {
        'error': '',
        'type': 'email'
    }
        
}

export function validateAuthLogin(login: string) {
    
}


export function validatePhone(data: any) : boolean {
    let phone;
    if (data.phone) phone = data.phone;
    else phone = data;
    let regexpPhone = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g);
    return regexpPhone.test(phone);
}

export function validateEmail(data: any) : boolean {
    let email;
    if (data.email) email = data.email;
    else email = data;
    let result = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (result) return true;
    else return false;
}

export function validateLogin(login: string) : string {
    if (login == '') 
        return 'Логин не может быть пустым';
    else
        return ''
}

export function validateName(name: {surname: string, name: string, middlename: string}): boolean {
    let result = true;
    if (!name.name || !name.name.match(/^[a-zа-яё\s]+$/iu) || name.name.replace(/\s/g,"") == "")
        result = false
    if (!name.surname || !name.surname.match(/^[a-zа-яё\s]+$/iu) || name.surname.replace(/\s/g,"") == "")
        result = false    
    return result;
}

export function validateDate(date: any): boolean {
    if (date)
        return true;
    else return false;
}

export function validateAddress(data: any): boolean {
    let address;
    if (data.address) address = data.address;
    else address = data;
    if (address && address != '')
        return true;
    else return false;
}

export function validateNameOrg(data: any): boolean {
    let name;
    if (data.name) name = data.name;
    else name = data;
    if (name && name != '' && name.replace(/\s/g,"") != "")
        return true;
    else return false;
}

export function validateAbout(data: any): boolean {
    let about;
    if (data.about) about = data.about;
    else about = data;
    if (about && about != '' && about.replace(/\s/g,"") != "")
        return true;
    else return false;
}

export function validateInn(data: any): boolean {
    let inn;
    if (data.inn) inn = data.inn;
    else inn = data;
    if (inn && inn != '')
        if (inn.length != 10) return false;
        else if (!inn.match(/^[0-9]+$/)) return false;
        else return true;
    else return false;
}






export function validateEducation(data: {
    institution: string,
    education: string,
    specialty: string,
    dateStart: string,
    dateReceiving: string
}): boolean {
    if (data.institution 
        && data.institution != '' 
        && data.institution.replace(/\s/g,"") != ""
        && data.education 
        && data.education != '' 
        && data.education.replace(/\s/g,"") != ""
        && data.specialty 
        && data.specialty != '' 
        && data.specialty.replace(/\s/g,"") != ""
        && data.dateStart 
        && data.dateStart != ''        
        )
        return true;
    else return false;
}

export function isWhitespace(str: string) {
    return /^\s*$/.test(str);
}

export const validateNewPassword = (password: {currentPassword: string, newPassword: string}): boolean => {
    if (!password.newPassword || 
        !password.currentPassword || 
        password.newPassword.length < 6 || 
        password.currentPassword == password.newPassword
    ) return false;
    else return true;
}

export function validateJobAppl(data: {
    employer: string,
    position: string,
    startDate: string,
    stopDate: string
}): boolean {
    if (data.employer 
        && data.employer.replace(/\s/g,"") != ""
        && data.position 
        && data.position.replace(/\s/g,"") != ""
        && data.startDate 
        && data.startDate.replace(/\s/g,"") != ""
    )
        return true;
    else return false;
}
  
function validateWebLink(url: string): IValidateResult {
    if (/^(http|https):\/\/[^ "]+$/.test(url))
        return {
            isValid: true,
            errorsMass: []
        };
    else return {
        isValid: false,
        errorsMass: ["Ссылка должна быть в формате https://*** или http://***"]
    };
}

function validateInstaLink(url: string): IValidateResult {
    if (/^https:\/\/instagram.com\/[^ "]+$/.test(url))
        return {
            isValid: true,
            errorsMass: []
        };
    else return {
        isValid: false,
        errorsMass: ["Ссылка должна быть в формате https://instagram.com/***"]
    };
}

function validateVkLink(url: string): IValidateResult {
    if (/^https:\/\/(vk.com|m.vk.com)\/[^ "]+$/.test(url))
        return {
            isValid: true,
            errorsMass: []
        };
    else return {
        isValid: false,
        errorsMass: ["Ссылка должна быть в формате https://vk.com/*** или https://m.vk.com/***"]
    };
}

function validateFacebookLink(url: string): IValidateResult {
    if (/^https:\/\/(www.facebook.com|www.m.facebook.com)\/[^ "]+$/.test(url))
        return {
            isValid: true,
            errorsMass: []
        };
    else return {
        isValid: false,
        errorsMass: ["Ссылка должна быть в формате https://www.facebook.com/*** или https://www.m.facebook.com/***"]
    };
}

export function validateOgrnString(ogrn: string): IValidateResult {
    if (ogrn.length != 13) 
        return {
            isValid: false,
            errorsMass: ["Длина ОГРН должна быть равна 13 символам"]
        };
    else 
        if (!ogrn.match(/^[0-9]+$/)) 
            return {
                isValid: false,
                errorsMass: ["ОГРН включает только цифры"]
            };
        else 
            return {
                isValid: true,
                errorsMass: []
            };
}


export function validateStringData(data: any, additionalValidFunc: (url: string) => IValidateResult): IValidateResult {
    const key = Object.keys(data)[0];
    if (key) {
        const url = data[key];
        if (url && url.replace(/\s/g,"") != "") {
            return additionalValidFunc(url)
        }  
        else return {
            isValid: false,
            errorsMass: ["Поле должно быть заполнено"]
        }
    }
    else return {
        isValid: false,
        errorsMass: ["Ошибка передачи данных"]
    }
}

export function validateOgrn(data: any): IValidateResult {
    return validateStringData(data, validateWebLink)
}

export function validateAboutUrl(data: any): IValidateResult {
    return validateStringData(data, validateWebLink)
}

export function validateInsta(data: {instagram: string}): IValidateResult {
    return validateStringData(data, validateInstaLink)
}

export function validateVk(data: any): IValidateResult {
    return validateStringData(data, validateVkLink)
}

export function validateFacebook(data: any): IValidateResult {
    return validateStringData(data, validateFacebookLink)
}