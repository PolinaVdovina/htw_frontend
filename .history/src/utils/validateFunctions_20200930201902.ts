
export interface IValidateResult {
    isValid: boolean,
    errorsMass: string[]
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

export function isWhitespace(str: string) {
    return /^\s*$/.test(str);
}

export function validateRegPasword(password: string): string {
    if (password == '')
        return 'Пароль не может быть пустым'
    else if (password.length < 6)
        return 'Пароль должен содержать более 5 символов'    
    else return ''
}

export function validateRegLoginConnect(loginConnect: string) {      
    if (!validateEmailString(loginConnect).isValid) {
        if (validatePhoneString(loginConnect).isValid)
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

export function validateLogin(login: string) : string {
    if (login == '') 
        return 'Логин не может быть пустым';
    else
        return ''
}

/*********************************************************************************************/
  
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

export function validateInnString(inn: string): IValidateResult {

    if (inn.length != 10) 
        return {
            isValid: false,
            errorsMass: ["Длина ИНН должна быть равна 10 символам"]
        };
    else 
        if (!inn.match(/^[0-9]+$/)) 
            return {
                isValid: false,
                errorsMass: ["ИНН включает только цифры"]
            };
        else 
            return {
                isValid: true,
                errorsMass: []
            };
}

export function validatePhoneString(phone: any) : IValidateResult {
    let regexpPhone = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g);
    if (regexpPhone.test(phone)) {
        return {
            isValid: true,
            errorsMass: []
        };        
    }
    else return {
        isValid: false,
        errorsMass: ["Пожалуйста, вводите существующий российский мобильный телефон"]
    };
}

export function validateEmailString(email: any) : IValidateResult {
    let result = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (result) return {
        isValid: true,
        errorsMass: []
    };
    else return {
        isValid: false,
        errorsMass: ["Пожалуйста, введите корректный e-mail"]
    };
}

export function validateStringData(data: any, additionalValidFunc?: (string) => IValidateResult): IValidateResult {
    const key = Object.keys(data)[0];
    if (key) {
        const stringValue = data[key];
        if (stringValue && stringValue.replace(/\s/g,"") != "") {
            if (additionalValidFunc !== undefined)
                return additionalValidFunc(stringValue)
            else return {
                isValid: true,
                errorsMass: []
            };
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

export function validatePhone(data: any) : IValidateResult {
    return validateStringData(data, validatePhoneString)
}

export function validateEmail(data: any) : IValidateResult {
    return validateStringData(data, validateEmailString)
}

export function validateNameOrg(data: any): IValidateResult {
    return validateStringData(data)
}

export function validateAbout(data: any): IValidateResult {
    return validateStringData(data)
}

export function validateInn(data: any): IValidateResult {
    return validateStringData(data, validateInnString)
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

export function validateDate(date: any): IValidateResult {
    if (date)
        return {
            isValid: true,
            errorsMass: []
        }
    
    else return {
        isValid: false,
        errorsMass: ["Поле должно быть заполнено"]
    }
}

export function validateName(name: {surname: string, name: string, middlename: string}): IValidateResult {
    let resultIsValid = true;
    let resultErrors = new Array<string>();
    if (!name.name || name.name.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Имя должно быть заполнено");        
    }
    if (name.name && !name.name.match(/^[a-zа-яё\s]+$/iu)) {
        resultIsValid = false;
        resultErrors.push("Имя может содержать только буквы"); 
    }
    if (!name.surname || name.surname.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Фамилия должна быть заполнена"); 
    }
    if (name.surname && !name.surname.match(/^[a-zа-яё\s]+$/iu)) {
        resultIsValid = false;
        resultErrors.push("Фамилия может содержать только буквы")
    }  
    return {
        isValid: resultIsValid,
        errorsMass: resultErrors
    }
}

export function validateJobAppl(data: {
    employer: string,
    position: string,
    startDate: string,
    stopDate: string
}): IValidateResult {
    let resultIsValid = true;
    let resultErrors = new Array<string>();

    if (!data.employer || data.employer.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите наименование места работы")
    }
    if (!data.position || data.position.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите должность")
    }
    if (!data.startDate || data.startDate.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите дату начала работы")
    }
    if (data.startDate && data.stopDate && new Date(Date.parse(data.startDate)) <= new Date(Date.parse(data.stopDate))) {
        resultIsValid = false;
        resultErrors.push("Дата окончания не может быть раньше даты начала")
    }

    return {
        isValid: resultIsValid,
        errorsMass: resultErrors
    }
}

export function validateEducation(data: {
    institution: string,
    education: string,
    specialty: string,
    dateStart: string,
    dateReceiving: string
}): IValidateResult {
    let resultIsValid = true;
    let resultErrors = new Array<string>();

    if (!data.institution || data.institution.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите образовательную организацию")
    }
    if (!data.education || data.education.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите тип образования")
    }
    if (!data.specialty || data.specialty.replace(/\s/g,"") == "") {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите специальность")
    }
    if (!data.dateStart) {
        resultIsValid = false;
        resultErrors.push("Пожалуйста, укажите дату начала образования")
    }
    if (data.dateStart && data.dateReceiving && new Date(Date.parse(data.dateStart)) <= new Date(Date.parse(data.dateStart))) {
        resultIsValid = false;
        resultErrors.push("Дата окончания не может быть раньше даты начала")
    }
    
    return {
        isValid: resultIsValid,
        errorsMass: resultErrors
    }
}

export const validateNewPassword = (password: {currentPassword: string, newPassword: string}): IValidateResult => {
    let resultIsValid = true;
    let resultErrors = new Array<string>();

    if (!password.newPassword) {
        resultIsValid = false;
        resultErrors.push("Новый пароль не указан")
    } 
    if (!password.currentPassword) {
        resultIsValid = false;
        resultErrors.push("Старый пароль не указан")
    } 
    if (password.newPassword && password.newPassword.length < 6) {
        resultIsValid = false;
        resultErrors.push("Новый пароль должен содержать не менее 6 символов")
    }  
    if (password.currentPassword && password.newPassword && password.currentPassword == password.newPassword) {
        resultIsValid = false;
        resultErrors.push("Новый пароль идентичен старому")
    }

    return {
        isValid: resultIsValid,
        errorsMass: resultErrors
    }
}

export function validateAddress(data: any): IValidateResult {
    alert(JSON.stringify(data))
    return {
        isValid: true,
        errorsMass: []
    }
}