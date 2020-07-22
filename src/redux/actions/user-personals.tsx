import { FILL_JOBSEEKER_DATA, FILL_JOBSEEKER_NAME } from './../../constants/action-types';

export function fillJobSeekerPersonalAction(name, surname, middlename, dateBirth, phone, email) {
    return {
        type: FILL_JOBSEEKER_DATA,
        name,
        surname,
        middlename,
        dateBirth,
        phone,
        email
    };
}

export function fillJobSeekerNameAction(name, surname, middlename) {
    return {
        type: FILL_JOBSEEKER_NAME,
        name,
        surname,
        middlename,

    };
}
