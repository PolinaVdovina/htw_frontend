import { GET_JOBSEEKER_DATA } from './../../constants/action-types';

export function fillJobSeekerPersonalAction(name, surname, middlename) {
    return {
        type: GET_JOBSEEKER_DATA,
        name,
        surname,
        middlename
    };
}
