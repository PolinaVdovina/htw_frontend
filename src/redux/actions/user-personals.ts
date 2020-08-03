import { FILL_PERSONAL_DATA, FILL_JOBSEEKER_NAME, RESET_PERSONAL_DATA } from '../../constants/action-types';

export function fillPersonalDataAction(data) {
    return {
        type: FILL_PERSONAL_DATA,
        data
    };
}


export function resetPersonalDataAction() {
    return {
        type: RESET_PERSONAL_DATA,
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


