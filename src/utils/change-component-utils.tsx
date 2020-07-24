import { fillPersonalDataAction } from "../redux/actions/user-personals"
import { changePersonalDataFetch as changePersonalDataFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";
import { addressGlue, genderIntToStr } from "./appliedFunc";


export const changeJobSeekerData = async ( dispatch, data ) => {

    const msgInfo: IMessageInfo = await changePersonalDataFetch(data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction(data));
    }
    return msgInfo;
}

export const changeJobSeekerContactDetails = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch({contactDetails: data});
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction(data));
    }
    return msgInfo;
}

export const changeJobSeekerAddress = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let address = addressGlue(data.address);
        await dispatch( fillPersonalDataAction({address}));
    }
    return msgInfo;
}

export const changeGender = async (dispatch, data) => {
    //alert(JSON.stringify(data.gender));
    //alert(JSON.stringify(genderIntToStr(data.gender)));
    const msgInfo: IMessageInfo = await changePersonalDataFetch( data );
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction( {gender: genderIntToStr(data.gender)} ));
    }
    return msgInfo;
}