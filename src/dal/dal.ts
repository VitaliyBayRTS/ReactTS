import { usersType, profileInfoType, photosType } from './../types/types';
import Axios from 'axios';
import { FilterType } from '../redux/usersReducer';


let instance = Axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "fdd75b8c-6436-43ef-9820-ed9356461c34"
    },
})

export type getUsersType = {
    items: Array<usersType>,
    totalCount: number,
    error: string | null
}

export type unfollowFollowTypes = {
    data?: {},
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
        .then( response => {
            return response.data;
        })
    },
    unfollow(userId: number) {
        return instance.delete<unfollowFollowTypes>(`follow/${userId}`).then( response => {
            return response.data;
        })
    },
    follow(userId: number) {
        return instance.post<unfollowFollowTypes>(`follow/${userId}`).then((response) => {
            return response.data;
        })
    },
    getProfile(userId: number | null) {
        console.warn("Obsolete method. Please use profileAPI.")
        return profileAPI.getProfile(userId)
    }
}


export type updateUserStatusType = {
    data?: {},
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export type savePhotoType = {
    data: {
        photos: photosType
    },
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export type saveProfileInfoType = {
    data?: {},
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<profileInfoType>(`profile/${userId}`).then(response => {
            return response.data
        })
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => {return response.data})
    },
    updateUserStatus(status: string) {
        return instance.put<updateUserStatusType>(`profile/status`, {status: status}).then(response => response.data)
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put<savePhotoType>(`profile/photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfileInfo(profile: profileInfoType) {
        return instance.put<saveProfileInfoType>(`profile`, profile).then(response => response.data)
    }
}

export enum resultCodeEnum {
    Success = 0,
    Error = 1
}

export enum resultCodeForCaptcha {
    CaptchaRequired = 10
}

export type meType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export type loginType = {
    data: {
        userId?: number
    },
    resultCode: resultCodeEnum | resultCodeForCaptcha,
    messages: Array<string>
}

export const authApi = {
    me() {
        return instance.get<meType>(`auth/me`).then(result => result.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<loginType>(`auth/login`, {email, password, rememberMe, captcha}).then( response => response.data)
    },
    logout() {
        return instance.delete<loginType>(`auth/login`).then(response => response.data)
    }
}

export type getCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<getCaptchaType>(`security/get-captcha-url`).then(response => response.data)
    }
}