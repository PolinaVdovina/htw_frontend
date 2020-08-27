import axios from "axios";

import { IMessageInfo, MessageStatus } from "./fetchInterfaces";
import { ITapeElementProps } from './../components/tape/posts/TapeElement';

interface ILoginResponse {
    login?: string,
    token?: string,
    msgStatus?: string,
    error?: string,
    role?: string
}

export const loginFetch = async (identity, password) => {
    let returnData: ILoginResponse;
    try {
        const response =  await axios.post("/auth/login", {
            login: identity,
            password: password,
        });

        if(response.data.token && response.data.accountLogin) {
            returnData =  {
                login: response.data.accountLogin,
                token: response.data.token,
                role: response.data.role,
                msgStatus: "ok"
            };
        }
        else {
            returnData =  {
                msgStatus:"error",
                error: "Какая-нибудь ошибка!"
            };
        }
    }
    catch {
        returnData =  {
            msgStatus:"error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }
    return returnData;
}

interface IRegisterResponse {
    login?: string,
    token?: string,
    msgStatus?: string,
    error?: string,
}

export const registerFetch = async (login, email, phone, password, role) => {
    let returnData: IRegisterResponse;
    try {
        const response =  await axios.post("/auth/create", {
            login,
            phone,
            email,
            password,
            roles:role,
        });

        if(response.data.token) {
            returnData =  {
                login: login,
                token: response.data.token,
                msgStatus: "ok"
            };
        }
        else {
            returnData =  {
                msgStatus:"error",
                error: "Какая-нибудь ошибка!"
            };
        }
    }
    catch
    {
        returnData =  {
            msgStatus:"error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }

    return returnData;
}


// interface IJobSeekerResponse {
//     email: string,
//     phone: string,
//     surname: string,
//     name: string,
//     middlename: string,
//     name: string,
//     name: string,
//     name: string,
//     name: string,
//     name: string,
// }

export const getPersonalDataFetch = async (token, role: string) => {
    let returnData;
    try {
        const response =  await axios.get("/" + role + "/get", {
            headers:{
                Authorization: 'Bearer ' + token
            }
        });

        returnData = response.data; 
        returnData["msgStatus"] = "ok"
    }
    catch
    {
        returnData =  {
            msgStatus:"error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }

    return returnData;
}


export const getEmployeesListFetch = async (token, url?) => {
    let returnData;
    url = url || "/employer/employee";
    try {
        const response =  await axios.get(url, {
            headers:{
                Authorization: 'Bearer ' + token
            }
        });

        returnData = response.data; 
        returnData["msgStatus"] = "ok"
    }
    catch
    {
        returnData =  {
            msgStatus:"error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }

    return returnData;
}

export const addEmployeeFetch = async (token, data, url?) => {
    let returnData;
    url = url || "/employer/employee";
    try {
        const response =  await axios.post(url,             
            
                data,
                
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }           
        
        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ?  MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return  msgInfo;
    }
    catch
    {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return  msgInfo;
    }
}

export const changePersonalDataFetch = async (token, data, url?) => {
    try {
        url = url || '/account/set';
        const response = await axios.post(url,  //{
                /*...*/data,

            //},
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );
        
        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ?  MessageStatus.ERROR : MessageStatus.OK,
        };
        return  msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return  msgInfo;
    }
}

export const changeEmployerAddressFetch = async (token, data, url?) => {
    try {
        url = url || '/account/address';
        const response = await axios.post(url,  {
                ...data,

            },
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );
        
        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ?  MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return  msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return  msgInfo;
    }
}

export const deletePersonalDataFetch = async (token, data, url?) => {
    try {
        url = url || '/account/address';
        const response = await axios.delete(url,  {
                data: data,
                headers: {Authorization: 'Bearer ' + token},
            }
        );        
        
        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ?  MessageStatus.ERROR : MessageStatus.OK,
        };
        return  msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return  msgInfo;
    }
}

export const deleteEntity = async (token, id, url) => {
    try {
        const response = await axios.delete(url+'?entityId='+id,  {
                data: {},
                headers: {Authorization: 'Bearer ' + token},
            }
        );        
        
        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ?  MessageStatus.ERROR : MessageStatus.OK,
        };
        return  msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return  msgInfo;
    }
}

export const isValidTokenFetch = async (token: string) => {
    try {
        const response = await axios.post("/account/set",  {},
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );

        if(response.status == 200) {
            return true;
        } else {
            return false;
        }
    }
    catch {
        return false;
    }
}


export const getAccountDataFetch = async (token: string, login: string) => {
    try {
        const userData = await axios.get("/account/login?login="+login,
        {
            headers: {Authorization: 'Bearer ' + token},
        });
        //alert(JSON.stringify(userData.data))
        return userData.data;
    }
    catch {
        return null;
    }
}


export const addVacancyFetch = async(token: string, vacancyData) => {
    try {
        const response = await axios.post("/vacancy/add",  vacancyData,
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );
        
        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ?  MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return  msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return  msgInfo;
    }
}


export const getOwnVacanciesFetch = async (token: string) => {
    try {
        const result = await axios.get("/vacancy/getOwn",
        {
            headers: {Authorization: 'Bearer ' + token},
        });
        //alert(JSON.stringify(userData.data))
        return result.data;
    }
    catch {
        return null;
    }
}


export const getVacanciesByLoginFetch = async (token: string, login: string) => {
    try {
        const result = await axios.get("/vacancy/getByLogin?login="+login,
        {
            headers: {Authorization: 'Bearer ' + token},
        });
        //alert(JSON.stringify(userData.data))
        return result.data;
    }
    catch {
        return null;
    }
}

interface IFetchResult {
    createdDate: string,

}


export interface ITapeFetch {
    msgInfo: IMessageInfo;
    tapeElements?: Array<IFetchResult> | null;
}

export const getVacanciesByLoginAndMinDateFetch = async (token: string, login: string, minDate?: string | null, limit?: number) => {
    try {

        const result = await axios.post("/vacancy/getByLoginAndDate",
        {
            login,
            minDate,
            limit,
        },
        {
            headers: {Authorization: 'Bearer ' + token},
        });
        //alert(JSON.stringify(userData.data))
        const returnData: ITapeFetch = {
            msgInfo: {
                msgStatus: MessageStatus.OK
            },
            tapeElements: result.data
        }
        return returnData;
    }
    catch {
        const returnData: ITapeFetch = {
            msgInfo: {
                msgStatus: MessageStatus.ERROR
            },
        }
        return returnData;
    }
}



export const removeVacancyFetch = async (token: string, vacancyId: number) => {
    try {
        const result = await axios.get("/vacancy/remove?vacancyId="+vacancyId,
        {
            headers: {Authorization: 'Bearer ' + token},
        });
        //alert(JSON.stringify(userData.data))
        return MessageStatus.OK;
    }
    catch {
        return MessageStatus.ERROR;
    }
}


export const setAvatarFetch = async(token: string, file: File ) => {
    try {
        let formData = new FormData();
        formData.append("avatar", file);
        const result = await axios.post("/account/setAvatar", formData,
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );
        return MessageStatus.OK;
        }
    catch {
        return MessageStatus.ERROR;
    }
}

export const getAvatarUrl = (login: string):string => {
    return "/account/avatars/"+login
}