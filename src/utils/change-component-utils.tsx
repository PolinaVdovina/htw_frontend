import { fillPersonalDataAction } from "../redux/actions/user-personals"
import { changePersonalDataFetch as changePersonalDataFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";


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
        let address: string | null = null;
        if(data.address) {
            address = '';
            if(data.address.region)
                address += data.address.region;
            
            if(data.address.city)
                address += ', г ' + data.address.city;

            if(data.address.street)
                address += ', ' + data.address.street

            if(data.address.house)
                address += ', д ' + data.address.house;
        
            if(data.address.flat)
                address += ', кв ' + data.address.flat;
        }

        await dispatch( fillPersonalDataAction({address}));
    }
    return msgInfo;
}

