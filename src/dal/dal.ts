import Axios from 'axios';

let baseURL = "https://social-network.samuraijs.com/api/1.0/";

export let getUsers = (currentPage: any, pageSize: any) => {
    return Axios.get(baseURL + `users?page=${currentPage}&count=${pageSize}`, {
        withCredentials: true
    }).then(response => {
        return response.data;
    })
}