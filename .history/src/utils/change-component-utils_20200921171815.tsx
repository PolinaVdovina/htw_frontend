import { fillPersonalDataAction } from "../redux/actions/user-personals"
import { changePersonalDataFetch as changePersonalDataFetch, deletePersonalDataFetch, changeEmployerAddressFetch, changePasswordFetch } from "./fetchFunctions";
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
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data.competenceSet, '/personal/competence/attach');
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let competenceSetRaw: string[];
        if (store.getState().userPersonalsReducer.competenceSet) {
            competenceSetRaw = [...store.getState().userPersonalsReducer.competenceSet, ...data.competenceSet]
        }
        else {
            competenceSetRaw = [...data.competenceSet]
        }
        const uniqueSet = new Set(competenceSetRaw);
        const competenceSet = Array.from(uniqueSet);
        await dispatch( fillPersonalDataAction({competenceSet: competenceSet}));
    }
    return msgInfo;
}

export const changeIndustrySet = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data.industry, '/employer/industry/attach');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let industrySetRaw: string[];
        if (store.getState().userPersonalsReducer.industry) {
            industrySetRaw = [...store.getState().userPersonalsReducer.industry, ...data.industry]
        }
        else {
            industrySetRaw = [...data.industry]
        }
        const uniqueSet = new Set(industrySetRaw);
        const industrySet = Array.from(uniqueSet);
        await dispatch( fillPersonalDataAction({industry: industrySet}));
    }
    return msgInfo;
}

export const changeTypesEdu = async ( dispatch, data ) => {
    //alert(Array.isArray(data))
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data.types, '/institution/type');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let typesEduMassRaw: string[];
        if (store.getState().userPersonalsReducer.types) {
            typesEduMassRaw  = [...store.getState().userPersonalsReducer.types, ...data.types]
        }
        else {
            typesEduMassRaw  = [...data.types]
        }
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
        let jobApplicantSet;
        if (store.getState().userPersonalsReducer.jobApplicantSet) {
            jobApplicantSet = [
                ...store.getState().userPersonalsReducer.jobApplicantSet,
                newJobAppl
            ]
        }
        else {
            jobApplicantSet = [newJobAppl]
        }       
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
            id: msgInfo.id 
        }
        let eduSet;
        if (store.getState().userPersonalsReducer.education) {
            eduSet = [
                ...store.getState().userPersonalsReducer.education,
                newEducation
            ]
        }
        else {
            eduSet = [newEducation]
        }
        
        await dispatch( fillPersonalDataAction({
            education: eduSet
        }));
    }
    return msgInfo;
}

export const changeEducationsDamaged = async ( dispatch, data ) => {
    let postData = {
        ...data
    }
    
    for (let i = 0; i < store.getState().userPersonalsReducer.education.length; i++) {
        if (store.getState().userPersonalsReducer.education[i].startDate == null) {
            postData.id = store.getState().userPersonalsReducer.education[i].id;
            let eduMass = [...store.getState().userPersonalsReducer.education]
            eduMass.splice(i, 1);
            await dispatch( fillPersonalDataAction({education: eduMass}));
            break;
        }
    }

    const msgInfo: IMessageInfo = await changeEmployerAddressFetch(store.getState().authReducer.token, postData, '/personal/add-institution');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const newEducation = {
            ...data,
            id: msgInfo.id 
        }
        let eduSet;
        if (store.getState().userPersonalsReducer.education) {
            eduSet = [
                ...store.getState().userPersonalsReducer.education,
                newEducation
            ]
        }
        else {
            eduSet = [newEducation]
        }
        
        await dispatch( fillPersonalDataAction({
            education: eduSet
        }));
    }
    return msgInfo;
}

export const deleteEducation = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await deletePersonalDataFetch(store.getState().authReducer.token, data, '/personal/delete-institution');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let eduMass = [...store.getState().userPersonalsReducer.education]
        for (let i = 0; i < eduMass.length; i++) {
            if (eduMass[i].id == data.id) {
                eduMass.splice(i, 1);
            }
        }
        await dispatch( fillPersonalDataAction({education: eduMass}));
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

export const deleteIndustry = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await deletePersonalDataFetch(store.getState().authReducer.token, data, '/employer/industry/detach');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let industrySet = [...store.getState().userPersonalsReducer.industry]
        for (let i = 0; i < industrySet.length; i++) {
            if (industrySet[i] == data) {
                industrySet.splice(i, 1);
            }
        }
        await dispatch( fillPersonalDataAction({industry: industrySet}));
    }
    return msgInfo;
}

export const deleteCompetence = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data, '/personal/competence/detach');
    if(msgInfo.msgStatus == MessageStatus.OK) {
        const competenceSet = [...store.getState().userPersonalsReducer.competenceSet]
        for (let i = 0; i < competenceSet.length; i++)
            if (competenceSet[i].name == data.name && competenceSet[i].group == data.group) 
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
        let address;
        if (store.getState().userPersonalsReducer.address) {
            address = [...store.getState().userPersonalsReducer.address, newAddress]
        }
        else {
            address = [newAddress]
        } 
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

export const changeJobSeekerWorkData = async ( dispatch, data ) => {
    //data[Object.keys(data)[0]]
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, {}, "/personal/status?name=" + data[Object.keys(data)[0]]);
    //alert(msgInfo.msgStatus==MessageStatus.OK)
    if(msgInfo.msgStatus == MessageStatus.OK) {
        await dispatch( fillPersonalDataAction(data));
    }
    return msgInfo;
}

export const changePassword = async ( dispatch, data ) => {
    const msgInfo: IMessageInfo = await changePasswordFetch(store.getState().authReducer.token, data);
    await dispatch() msgInfo.id
    return msgInfo;
}

export const changeJobSeekerEmploymentData = async ( dispatch, data ) => {
    const key = Object.keys(data)[0]; 
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, data[key], urls[key].add);
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let uniqueSet;
        if (store.getState().userPersonalsReducer[key]) {
            let tempMass = [...data[key], ...store.getState().userPersonalsReducer[key]]
            uniqueSet = new Set(tempMass);
        }            
        else {
            let tempMass = [...data[key], []];
            uniqueSet = new Set(tempMass)
        }
            
        
        const dataSet = Array.from(uniqueSet); 
 
        await dispatch( fillPersonalDataAction({[key]: dataSet}));
    }
    return msgInfo;
}

export const deleteJobSeekerEmploymentData = async ( dispatch, data ) => {
    const key = 'employment'; 
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, {}, urls[key].delete + data);
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let newData = [...store.getState().userPersonalsReducer[key]]
        for (let i = 0; i < newData.length; i++)
            if (newData[i] == data) 
                newData.splice(i, 1);
        await dispatch( fillPersonalDataAction({[key]: newData}));
    }
    return msgInfo;
}

export const deleteJobSeekerVacancyTypeData = async ( dispatch, data ) => {
    const key = 'vacancyTypes'; 
    const msgInfo: IMessageInfo = await changePersonalDataFetch(store.getState().authReducer.token, {}, urls[key].delete + data);
    if(msgInfo.msgStatus == MessageStatus.OK) {
        let newData = [...store.getState().userPersonalsReducer[key]]
        for (let i = 0; i < newData.length; i++)
            if (newData[i] == data) 
                newData.splice(i, 1);
        await dispatch( fillPersonalDataAction({[key]: newData}));
    }
    return msgInfo;
}

const urls = {
    employment: {
        add: "/personal/add-employment",
        delete: "/personal/delete-employment?name="
    },
    vacancyTypes: {
        add: "/personal/add-vacancy-type",
        delete: "/personal/delete-vacancy-type?name="
    }
}

