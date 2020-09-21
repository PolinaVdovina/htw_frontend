import { SETTINGS } from '../../constants/action-types';

export function changeSettingsAction({phone = null, address = null, socmedia = null}) {
    return {
        type: SETTINGS,
        phone, 
        address, 
        socmedia
    };
}