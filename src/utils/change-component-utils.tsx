import { fillJobSeekerPersonalAction } from "../redux/actions/user-personals"
import { changeJobSeekerNameFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";


export const changeJobSeekerName = async ( dispatch, data ) => {
    alert("dsfdsf");
    const msgInfo: IMessageInfo = await changeJobSeekerNameFetch(data);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillJobSeekerPersonalAction(data));
    }
    return msgInfo;
}