import { FILL_JOBSEEKER_DATA, FILL_JOBSEEKER_NAME } from './../../constants/action-types';

export function fillJobSeekerPersonalAction(data) {
    return {
        type: FILL_JOBSEEKER_DATA,
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


