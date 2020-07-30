import axios from "axios";

import { IMessageInfo, MessageStatus } from "./fetchInterfaces";

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

