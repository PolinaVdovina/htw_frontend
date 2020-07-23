import { FILL_PERSONAL_DATA, FILL_JOBSEEKER_NAME } from './../../constants/action-types';

export function fillPersonalDataAction(data) {
    return {
        type: FILL_PERSONAL_DATA,
        data
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


