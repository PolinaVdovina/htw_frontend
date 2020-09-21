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
        phone: action.phone ? action.phone : state.phone,
        address: action.address ? action.address : state.address,
        socmedia: action.socmedia ? action.socmedia : state.socmedia,
    }
}