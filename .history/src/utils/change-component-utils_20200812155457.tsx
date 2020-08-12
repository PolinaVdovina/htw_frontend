import { fillPersonalDataAction } from "../redux/actions/user-personals"
import { changePersonalDataFetch as changePersonalDataFetch, deletePersonalDataFetch, changeEmployerAddressFetch } from "./fetchFunctions";
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";
import { addressGlue, genderIntToStr, jobApplGlue } from "./appliedFunc";
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

export const changeCompetenceSet = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data, '/personal/competence/attach');
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const competenceSetRaw: string[] = [...store.getState().userPersonalsReducer.competenceSet, ...data]
        const uniqueSet = new Set(competenceSetRaw);
        const competenceSet = Array.from(uniqueSet);
        await dispatch( fillPersonalDataAction({competenceSet: competenceSet}));
    }
    return msgInfo;
}

export const changeTypesEdu = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data, '/institution/type');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const typesEduMassRaw: string[] = [...store.getState().userPersonalsReducer.types, ...data]
        const uniqueSet = new Set(typesEduMassRaw);
        const typesEduMass = Array.from(uniqueSet);
        await dispatch( fillPersonalDataAction({types: typesEduMass}));
    }
    return msgInfo;
}

export const changeJobApplicance = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changeEmployerAddressFetch(store.getState().authReducer.token, data, '/personal/jobappll');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const newJobAppl = {
            ...data,
            id: msgInfo.id
        }
        const jobApplicantSet = [
            ...store.getState().userPersonalsReducer.jobApplicantSet,
            newJobAppl
        ]
        await dispatch( fillPersonalDataAction({
            jobApplicantSet: jobApplicantSet
        }));
    }
    return msgInfo;
}

export const changeEducations = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changeEmployerAddressFetch(store.getState().authReducer.token, data, '/personal/add-institution');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const newEducation = {
            ...data,
            //id: msgInfo.id   ??????????
        }
        const eduSet = [
            ...store.getState().userPersonalsReducer.education,
            newEducation
        ]
        await dispatch( fillPersonalDataAction({
            education: eduSet
        }));
    }
    return msgInfo;
}

export const deleteJobApplicant = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await deletePersonalDataFetch(store.getState().authReducer.token, data, '/personal/jobappll');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let jobAppl = [...store.getState().userPersonalsReducer.jobApplicantSet]
        for (let i = 0; i < jobAppl.length; i++) {
            if (jobAppl[i].id == data.id) {
                jobAppl.splice(i, 1);
            }
        }
        await dispatch( fillPersonalDataAction({jobApplicantSet: jobAppl}));
    }
    return msgInfo;
}

export const deleteCompetence = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, [data], '/personal/competence/detach');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const competenceSet = [...store.getState().userPersonalsReducer.competenceSet]
        for (let i = 0; i < competenceSet.length; i++)
            if (competenceSet[i] == data) 
            competenceSet.splice(i, 1);
        await dispatch( fillPersonalDataAction({competenceSet: competenceSet}));
    }
    return msgInfo;
}

export const deleteTypeEdu = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await deletePersonalDataFetch(store.getState().authReducer.token, [data], '/institution/type');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const typesEduMassRaw = [...store.getState().userPersonalsReducer.types]
        for (let i = 0; i < typesEduMassRaw.length; i++)
            if (typesEduMassRaw[i] == data) 
            typesEduMassRaw.splice(i, 1);
        await dispatch( fillPersonalDataAction({types: typesEduMassRaw}));
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
        let address = [...store.getState().userPersonalsReducer.address]
        for (let i = 0; i < address.length; i++)
            if (address[i].idFlat == data.idFlat) 
                address.splice(i, 1);
        await dispatch( fillPersonalDataAction({address: address}));
    }
    return msgInfo;
}

export const changeGender = async (dispatch, data) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data );
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction( {gender: genderIntToStr(data.gender)} ));
    }
    return msgInfo;
}