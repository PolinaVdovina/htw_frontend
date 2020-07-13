export function validateRegPasword(password: string): string {
    if (password.length <= 6)
        return 'Пароль должен сожержать более 6 символов'
    else return ''
}

/*export function validateRegLoginConnect(loginConnect: string) {
    let regexpMail = new RegExp('/.+@.+\..+/i');
    let regexpPhone = new RegExp('/(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g');
    let type = '';
    let emailCorrect = regexpMail.test(loginConnect)
    if (!emailCorrect) {
        if (regexpPhone.test(loginConnect))
            return {
                'error': '',
                'type': 'phone'
            }
        else return {
            'error': 'Введите корректный e-mail адрес или телефон'
        }
    }
    else return {
        'error': '',
        'type': 'e-mail'
    }
        
}*/