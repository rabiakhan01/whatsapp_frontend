export const baseURL = import.meta.env.VITE_API_ENDPOINT + "/api/v1";


export const endPoints = {
    register: `${baseURL}/auth/register`,
    login: `${baseURL}/auth/login`,
}