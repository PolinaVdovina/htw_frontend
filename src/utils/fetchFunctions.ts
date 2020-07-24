import axios from "axios";
import { store } from './../redux/store';
import { IMessageInfo, MessageStatus } from "./fetchInterfaces";

interface ILoginResponse {
    login?: string,
    token?: string,
    msgStatus?: string,
    error?: string,
    role?: string
}



export const login = async (identity, password) => {
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



export const register = async (login, email, phone, password, role) => {
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

export const getPersonalDataFetch = async () => {
    let returnData;
    try {
        const response =  await axios.get("/personal/get", {
            headers:{
                Authorization: 'Bearer ' + store.getState().authReducer.token
            }
        });

        returnData = response.data; 
        //alert(JSON.stringify(response.data))
        returnData["msgStatus"] = "ok"
            //{
            // name: response.data.name,
            // surname: response.data.surname,
            // middlename: response.data.middlename,
            // dateBirth: response.data.dateBirth,
            // phone: response.data.contactDetails.phone,
            // email: response.data.contactDetails.email,
            // msgStatus: "ok",
            // about: response.data.about,
            // address: response.data.address,
            //};
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

export const getEmployerFetch = async () => {
    let returnData;
    try {
        const response =  await axios.get("/employer/get", {
            headers:{
                Authorization: 'Bearer ' + store.getState().authReducer.token
            }
        });
        returnData =  {
            name: response.data.name,
            phone: response.data.contactDetails.phone,
            email: response.data.contactDetails.email,
            msgStatus: "ok",
            about: response.data.about,
            inn: response.data.inn,
            ogrn: response.data.ogrn
            //address: response.data.address,
        };
        //alert(JSON.stringify(returnData))
    }
    catch
    {
        alert('ошибка')
        returnData =  {
            msgStatus:"error",
            error: "Какая-нибудь ошибка с сетью!"
        };
    }

    return returnData;
}

export const changePersonalDataFetch = async (data, url?) => {
    try {
        url = url || '/account/set';
        const response = await axios.post(url,  {
                ...data,

            },
            {
                headers: {Authorization: 'Bearer ' + store.getState().authReducer.token},
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


/* export const changeJobSeekerAddressFetch = async (data) => {
    try {
        const response = await axios.post("/personal/setting/personal",  {
                ...data,

            },
            {
                headers: {Authorization: 'Bearer ' + store.getState().authReducer.token},
            }
        );
        
        const msgInfo: IMessageInfo = {
            msgStatus: response.data.error ?  MessageStatus.ERROR : MessageStatus.OK,
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
 */