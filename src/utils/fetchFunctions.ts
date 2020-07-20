import axios from "axios";
import { store } from './../redux/store';

interface ILoginResponse {
    login?: string,
    token?: string,
    msgStatus?: string,
    error?: string,
}

export const login = async (identity, password) => {
    let returnData: ILoginResponse;
    try {
        const response =  await axios.post("/auth/login", {
            accountLogin: identity,
            password: password,
        });

       

        if(response.data.token && response.data.accountLogin) {
            returnData =  {
                login: response.data.accountLogin,
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

export const register = async (login, email, password, role) => {
    let returnData: IRegisterResponse;
    try {
        const response =  await axios.post("/auth/create", {
            login,
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

export const getJobSeeker = async () => {
    let returnData;
    try {
        const response =  await axios.get("/personal/get", {
            headers:{
                Authorization: 'Bearer ' + store.getState().authReducer.token
            }
        });

        returnData =  {
            name: response.data.name,
            surname: response.data.surname,
            middlename: response.data.middlename,
            msgStatus: "ok"
        };
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

