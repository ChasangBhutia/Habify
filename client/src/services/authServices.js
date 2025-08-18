import api from "./api";

export const loginUser = (loginData)=>{
    return api.post('/auth/login', loginData);
}