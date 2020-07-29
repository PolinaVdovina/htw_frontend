import { fillPersonalDataAction } from "../redux/actions/user-personals"
import { changePersonalDataFetch as changePersonalDataFetch, deletePersonalDataFetch, changeEmployerAddressFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";
import { addressGlue, genderIntToStr } from "./appliedFunc";
import { store } from './../redux/store';


export const changeJobSeekerData = async ( dispatch, data ) => {

    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction(data));
    }
    return msgInfo;
}

export const changeJobSeekerContactDetails = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token,{contactDetails: data});
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction(data));
    }
    return msgInfo;
}

export const changeJobSeekerAddress = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token,data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let address = addressGlue(data.address);
        await dispatch( fillPersonalDataAction({address}));
    }
    return msgInfo;
}

export const changeEmployerAddress = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changeEmployerAddressFetch(store.getState().authReducer.token, data, '/account/address');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let newAddress = {
            ...data.address,
            idFlat: msgInfo.id
        }
        const address = [...store.getState().userPersonalsReducer.address, newAddress]
        await dispatch( fillPersonalDataAction({address: address}));
    }
    return msgInfo;
}

export const deleteEmployerAddress = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await deletePersonalDataFetch(store.getState().authReducer.token, data, '/account/address');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const address = [...store.getState().userPersonalsReducer.address]
        for (let i = 0; i < address.length; i++)
            if (address[i].idFlat == data.idFlat) 
                address.splice(i, 1);
        await dispatch( fillPersonalDataAction({address: address}));
    }
    return msgInfo;
}

export const changeGender = async (dispatch, data) => {
    //alert(JSON.stringify(data.gender));
    //alert(JSON.stringify(genderIntToStr(data.gender)));
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data );
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction( {gender: genderIntToStr(data.gender)} ));
    }
    return msgInfo;
}