import api from './api';

export const fetchUsersByEmail = async (email) => {
    return api.get(`/users/search?email=${email}`);
}