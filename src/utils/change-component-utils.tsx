import { fillJobSeekerPersonalAction } from "../redux/actions/user-personals"
import { changeJobSeekerDataFetch as changeJobSeekerDataFetch, changeJobSeekerAddressFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";


export const changeJobSeekerData = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changeJobSeekerDataFetch(data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillJobSeekerPersonalAction(data));
    }
    return msgInfo;
}


export const changeJobSeekerAddress = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changeJobSeekerAddressFetch(data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillJobSeekerPersonalAction(data));
    }
    return msgInfo;
}

