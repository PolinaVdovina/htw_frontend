import { GET_JOBSEEKER_DATA } from './../../constants/action-types';

export function fillJobSeekerPersonalAction(name, surname, middlename, dateBirth, phone, email) {
    return {
        type: GET_JOBSEEKER_DATA,
        name,
        surname,
        middlename,
        dateBirth,
        phone,
        email
    };
}
