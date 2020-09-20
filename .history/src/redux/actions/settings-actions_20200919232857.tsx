import { SETTINGS } from '../../constants/action-types';

export function changeSettingsAction({phone = true, address = true, socmedia = true}) {
    return {
        type: SETTINGS,
        phone, 
        address, 
        socmedia
    };
}