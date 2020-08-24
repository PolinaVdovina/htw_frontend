import { settings } from "cluster"
import { settingsName } from "../components/cabinet/changeMiniComponents/changeSettings"

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

export function validateName(name: {firstname: string, lastname: string, patronymic: string}): boolean {
    let result = true;
    Object.keys(settingsName).map(key => {
        (name[key] == undefined || !name[key].match(/^[a-zа-яё\s]+$/iu) || name[key] == '') ? result = false : result = true;
    })
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

export function validateNumber(data: any): boolean {
    let value;
    if (data.value) value = data.value;
    else value = data;
    if (value) {
        if(value.length > 1 && value[0]=='0')
            return false;
        else if (!value.match(/^[0-9]+$/)) return false;
            else return true;
    }
    else return false;
}



export function validateOgrn(data: any): boolean {
    let ogrn;
    if (data.ogrn) ogrn = data.ogrn;
    else ogrn = data;
    if (ogrn && ogrn != '')
        if (ogrn.length != 13) return false;
        else if (!ogrn.match(/^[0-9]+$/)) return false;
        else return true;
    else return false;
}