import api from "./api";

export const createUser = (userData)=>{
    return api.post('/auth/register', userData);
}

export const loginUser = (userData)=>{
    return api.post('/auth/login', userData);
}

export const logoutUser = ()=>{
    return api.post('/auth/logout');
}

export const getUser = ()=>{
    return api.get('/auth/');
}