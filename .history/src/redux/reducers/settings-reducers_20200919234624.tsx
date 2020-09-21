interface ISettingsCommonState {
    phone?: boolean, 
    address?: boolean, 
    socmedia?: boolean
}

const initialSettingsState: ISettingsCommonState = {
    phone: true, 
    address: true, 
    socmedia: true
};

export function settingsReducer(state = initialSettingsState, action) : ISettingsCommonState {
    if (action.type == 'SETTINGS')
        return {
            ...state,
            ...action.data,
        }
    else
        return state;
}