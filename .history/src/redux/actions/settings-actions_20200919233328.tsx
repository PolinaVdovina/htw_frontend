import { SETTINGS } from '../../constants/action-types';

export function changeSettingsPhoneAction(phone) {
    return {
        type: SETTINGS,
        phone 
    };
}

export function changeSettingsAddressAction(address) {
    return {
        type: SETTINGS,
        address
    };
}

export function changeSettingsSocmediaAction(socmedia) {
    return {
        type: SETTINGS, 
        socmedia
    };
}