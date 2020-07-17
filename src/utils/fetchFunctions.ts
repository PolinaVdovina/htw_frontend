import axios from "axios";

interface ILoginResponse {
    login?: string,
    token?: string,
    msgStatus?: string,
    error?: string,
}

export const login = async (identity, password) => {
    let returnData: ILoginResponse;
    try {
        const response =  await axios.post("auth/login", {
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
        const response =  await axios.post("auth/create", {
            login,
            email,
            password,
            role
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