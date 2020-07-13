export function validateRegPasword(password: string): string {
    if (password == '')
        return 'Пароль не может быть пустым'
    else if (password.length <= 6)
        return 'Пароль должен сожержать более 6 символов'    
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

export function validatePhone(phone: string) : boolean {
    let regexpPhone = new RegExp(/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g);
    return regexpPhone.test(phone);
}

export function validateEmail(email: string) : boolean {
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