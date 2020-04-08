import { unfollow } from './../redux/usersReducer';
import Axios from 'axios';


let instance = Axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "91630e37-cb0d-4a53-8f4c-2f5b7ec1d93b"
    }
})

export const usersAPI = {
    getUsers(currentPage: any, pageSize: any) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then( response => {
            return response.data;
        })
    },
    unfollow(userId: any) {
        return instance.delete(`follow/${userId}`).then( response => {
            return response.data;
        })
    },
    follow(userId: any) {
        return instance.post(`follow/${userId}`).then((response) => {
            return response.data;
        })
    },
    getProfile(userId: any) {
        return instance.get(`profile/` + userId);
    }
}

export const authApi = {
    me() {
        return instance.get(`auth/me`);
    }
}