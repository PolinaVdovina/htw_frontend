import { SETTINGS } from '../../constants/action-types';

export function changeSettingsAction({phone: boolean | undefined, address: boolean | undefined, socmedia: boolean | undefined}) {
    return {
        type: SETTINGS,
        phone, 
        address, 
        socmedia
    };
}