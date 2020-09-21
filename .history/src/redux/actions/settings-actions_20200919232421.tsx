import { SETTINGS } from '../../constants/action-types';

export function changeSettingsAction(phone?, address?, socmedia?) {
    return {
        type: SETTINGS,
        phone, 
        address, 
        socmedia
    };
}