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

export function dialogReducer(state = initialState, action) : ICommonState {
    return {
        phone: action.phone ? action.phone : initialState.phone,
        address: action.address ? action.address : initialState.address,
        socmedia: action.socmedia ? action.socmedia : initialState.socmedia,
    }
}