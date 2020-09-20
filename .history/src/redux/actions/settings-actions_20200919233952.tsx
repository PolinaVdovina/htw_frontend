import { SETTINGS } from '../../constants/action-types';

export function changeSettingsAction(data) {
    return {
        type: SETTINGS,
        data,
    };
}
