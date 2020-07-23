import { fillPersonalDataAction } from "../redux/actions/user-personals"
import { changePersonalDataFetch as changePersonalDataFetch, changeJobSeekerAddressFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";
import { addressGlue } from "./appliedFunc";


export const changeJobSeekerData = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(data);
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

