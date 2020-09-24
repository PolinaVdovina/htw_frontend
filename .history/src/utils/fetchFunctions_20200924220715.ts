import axios from "axios";

import { IMessageInfo, MessageStatus } from "./fetchInterfaces";
import { ITapeElementProps } from './../components/tape/posts/TapeElement';
import { ISearchCriteriaRequest } from "./search-criteria/types";

const rootUrl = "/api";

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
        const response = await axios.post(rootUrl+"/auth/login", {
            login: identity,
            password: password,
        });

        if (response.data.token && response.data.accountLogin) {
            returnData = {
                login: response.data.accountLogin,
                token: response.data.token,
                role: response.data.role,
                msgStatus: "ok"
            };
        }
        else {
            returnData = {
                msgStatus: "error",
                error: "Какая-нибудь ошибка!"
            };
        }
    }
    catch {
        returnData = {
            msgStatus: "error",
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

export const registerFetch = async (login, email, phone, password, role, nameOrg?) => {
    let returnData: IRegisterResponse;
    try {
        const response = await axios.post(rootUrl + "/auth/create", {
            login,
            phone,
            email,
            password,
            roles: role,
            nameOrg
        });

        if (response.data.token) {
            returnData = {
                login: login,
                token: response.data.token,
                msgStatus: "ok"
            };
        }
        else {
            returnData = {
                msgStatus: "error",
                error: "Какая-нибудь ошибка!"
            };
        }
    }
    catch
    {
        returnData = {
            msgStatus: "error",
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
        const response = await axios.get(rootUrl + "/" + role + "/get", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        returnData = response.data;
        returnData["msgStatus"] = "ok"
    }
    catch
    {
        returnData = {
            msgStatus: "error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }

    return returnData;
}


export const getEmployeesListFetch = async (token, url?) => {
    let returnData;
    url = url || "/employer/employee";
    try {
        const response = await axios.get(rootUrl + url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        returnData = response.data;
        returnData["msgStatus"] = "ok"
    }
    catch
    {
        returnData = {
            msgStatus: "error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }

    return returnData;
}

export const addEmployeeFetch = async (token, data, url?) => {
    let returnData;
    try {
        const response = await axios.post(rootUrl + url,

            data,

            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }

        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return msgInfo;
    }
    catch
    {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return msgInfo;
    }
}

export const changePasswordFetch = async (token, data) => {
    let returnData;
    try {
        const response = await axios.post(rootUrl + "/account/change-password",

            data,

            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }

        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return msgInfo;
    }
    catch
    {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return msgInfo;
    }
}

export const changePersonalDataFetch = async (token, data, url?) => {
    try {
        url = url || '/account/set';
        const response = await axios.post(rootUrl + url,  //{
                /*...*/data,

            //},
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
        };
        return msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return msgInfo;
    }
}

export const changeEmployerAddressFetch = async (token, data, url?) => {
    try {
        url = url || '/account/address';
        const response = await axios.post(rootUrl + url, {
            ...data,

        },
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return msgInfo;
    }
}

export const deletePersonalDataFetch = async (token, data, url?) => {
    try {
        url = url || '/account/address';
        const response = await axios.delete(rootUrl + url,  {
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
        const response = await axios.delete(rootUrl + url+'?entityId='+id,  {
                data: {},
                headers: {Authorization: 'Bearer ' + token},
            }
        );        

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
        };
        return msgInfo;
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return msgInfo;
    }
}

export const isValidTokenFetch = async (token: string) => {
    try {
        const response = await axios.post(rootUrl + "/account/set", {},
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );

        if (response.status == 200) {
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
        const userData = await axios.get(rootUrl + "/account/login?login=" + login,
            {
                headers: { Authorization: 'Bearer ' + token },
            });
        //alert(JSON.stringify(userData.data))
        return userData.data;
    }
    catch {
        return null;
    }
}


export const addVacancyFetch = async (token: string, vacancyData) => {
    try {
        const response = await axios.post(rootUrl + "/vacancy/add", vacancyData,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return {
            data: response.data,
            msgInfo
        };
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return {
            data: null,
            msgInfo
        };
    }
}


export const getOwnVacanciesFetch = async (token: string) => {
    try {
        const result = await axios.get(rootUrl + "/vacancy/getOwn",
            {
                headers: { Authorization: 'Bearer ' + token },
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
        const result = await axios.get(rootUrl + "/vacancy/getByLogin?login=" + login,
            {
                headers: { Authorization: 'Bearer ' + token },
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

        const result = await axios.post(rootUrl + "/vacancy/getByLoginAndDate",
            {
                login,
                minDate,
                limit,
            },
            {
                headers: { Authorization: 'Bearer ' + token },
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
        const result = await axios.get(rootUrl + "/vacancy/remove?vacancyId=" + vacancyId,
            {
                headers: { Authorization: 'Bearer ' + token },
            });
        //alert(JSON.stringify(userData.data))
        return MessageStatus.OK;
    }
    catch {
        return MessageStatus.ERROR;
    }
}


export const setAvatarFetch = async (token: string, file: File) => {
    try {
        let formData = new FormData();
        formData.append("avatar", file);
        const result = await axios.post(rootUrl + "/account/setAvatar", formData,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );
        return MessageStatus.OK;
    }
    catch {
        return MessageStatus.ERROR;
    }
}

export const addAchievementFetch = async (token: string, achievData, files: Array<File>) => {
    try {
        let formData = new FormData();
        /*if (files === undefined) return 0;
        for (let i = 0; i < files.length; i++) {
            let file: File;
            let fileOfList = files.item(i);
            if (fileOfList === null) {
                return 0;
            }
            else {
                file = fileOfList;
                formData.append("file[]", file);
            }
        }*/

        for (let i = 0; i < files.length; i++) {
            formData.append("file[]", files[i]);
        }

        const response = await axios.post(rootUrl + "/personal/achievements/add?title=" + achievData.title + "&description=" + achievData.description, 
            formData,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );

        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
            id: response.data
        };
        return {
            data: response.data,
            msgInfo
        };
    }
    catch {
        const msgInfo: IMessageInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return {
            data: null,
            msgInfo
        };
    }
}


/*exsdvport const addImageAchievFetch = async (token: string, files: FileList) => {
    try {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file: File;
            let fileOfList = files.item(i);
            if (fileOfList === null) {
                return 0;
            }
            else {
                file = fileOfList;
                formData.append("file[]", file);
            }
        }
        
        const result = await axios.post("/", formData,
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        );
        return MessageStatus.OK;
    }
    catch {
        return MessageStatus.ERROR;
    }
}*/

export const getAvatarUrl = (login: string): string => {
    return rootUrl + "/account/avatars/" + login
}


export const getApchiUrl = (filePath: string): string => {
    return rootUrl + "/personal/apchi/achievementFile/get?filepath=" + filePath
}


export const subscribeFetch = async (token: string, login: String): Promise<IMessageInfo> => {
    try {
        const result = await axios.get(rootUrl + "/account/subscribe?login="+login, { headers: { Authorization: 'Bearer ' + token } });
        return {
            msgStatus: MessageStatus.OK
        }
    } 
    catch {
        return {
            msgStatus: MessageStatus.ERROR,
            error: "undefined error"        // шобы напугать
        }
    }
}


export const unsubscribeFetch = async (token: string, login: string): Promise<IMessageInfo> => {
    try {
        const result = await axios.get(rootUrl + "/account/unsubscribe?login="+login, { headers: { Authorization: 'Bearer ' + token } });
        return {
            msgStatus: MessageStatus.OK
        }
    } 
    catch {
        return {
            msgStatus: MessageStatus.ERROR,
            error: "undefined error"        // шобы напугать
        }
    }
}

export const isUserOnlineFetch = async (token: string, login: string) => {
    try {
        const result = await axios.get(rootUrl + "/account/is-online?login="+login, { headers: { Authorization: 'Bearer ' + token } });
        return {
            msgStatus: MessageStatus.OK,
            result: result.data
        }
    } 
    catch {
        return {
            msgStatus: MessageStatus.ERROR,
            error: "undefined error"        // шобы напугать
        }
    }
}


export interface ISearchCriteriaResponse<T> {
    msgInfo: IMessageInfo,
    result: Array<T> | null
}

export const searchCriteriaFetch: <T> (url: string, token: string, requestData: ISearchCriteriaRequest | null) => Promise<ISearchCriteriaResponse<T>> =
    async (url, token, requestData) => {
        try {
            const result = await axios.post(rootUrl + url, requestData, { headers: { Authorization: 'Bearer ' + token } });
            return {
                msgInfo: {
                    msgStatus: MessageStatus.OK,
                },
                result: result.data,
            }
        }
        catch {
            return {
                msgInfo: {
                    msgStatus: MessageStatus.ERROR,
                    error: "undefined error"        // шобы напугать
                },
                result: null,
            }
        }
    }


export const toRespondFetch = async (token, id, url) => {
    try {
        const response = await axios.post(rootUrl + url+'?entityId=' + id.toString(), 
                null, 
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );        

        const msgInfo = {
            msgStatus: response.data.error || (response.data.status && response.data.status == 'error') ? MessageStatus.ERROR : MessageStatus.OK,
            vacancyDto: response.data
        };
        return msgInfo;
    }
    catch {
        const msgInfo = {
            msgStatus: MessageStatus.ERROR,
            error: "Проблемы с соединением",
        };
        return msgInfo;
    }
}

export const toRespondViewFetch = async (token, id, url) => {
    try {
        const result = await axios.post(rootUrl + url+'?vacancyId=' + id.toString(), 
                null, 
            {
                headers: {Authorization: 'Bearer ' + token},
            }
        );        

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

export const removeAchievFetch = async (token: string, id: number) => {
    try {
        const result = await axios.get(rootUrl+"/personal/achievements/delete?id=" + id,
            {
                headers: { Authorization: 'Bearer ' + token },
            });
        //alert(JSON.stringify(userData.data))
        return MessageStatus.OK;
    }
    catch {
        return MessageStatus.ERROR;
    }
}


