import { FILL_PERSONAL_DATA, FILL_JOBSEEKER_NAME, RESET_PERSONAL_DATA, UPDATE_AVATAR_URL_UID, UNSUBSCRIBE } from '../../constants/action-types';
import { SUBSCRIBE } from './../../constants/action-types';

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

export function updateAvatarUrlUIDAction() {
    return {
        type: UPDATE_AVATAR_URL_UID,
    };
}


export function subscribeAction(login: string) {
    return {
        type: SUBSCRIBE,
        login
    };
}

export function unsubscribeAction(login: string) {
    return {
        type: UNSUBSCRIBE,
        login
    };
}
