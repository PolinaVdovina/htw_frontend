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
    return {
        ...state,
        ...action.data,
    }
}