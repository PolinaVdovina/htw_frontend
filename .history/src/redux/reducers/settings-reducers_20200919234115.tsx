interface ICommonState {
    phone?: boolean, 
    address?: boolean, 
    socmedia?: boolean
}

const initialState: ICommonState = {
    phone: true, 
    address: true, 
    socmedia: true
};

export function settingsReducer(state = initialState, action) : ICommonState {
    return {
        ...state,
        ...action.data,
    }
}