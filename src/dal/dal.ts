import { usersType, profileInfoType, photosType } from './../types/types';
import Axios from 'axios';


let instance = Axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "767f330b-ea1f-4316-94ad-051b6e7ad9dd"
    },
})

type getUsersType = {
    items: Array<usersType>,
    totalCount: number,
    error: string | null
}

type unfollowFollowTypes = {
    data?: {},
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`).then( response => {
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


type updateUserStatusType = {
    data?: {},
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

type savePhotoType = {
    data: {
        photos: photosType
    },
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

type saveProfileInfoType = {
    data?: {},
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<profileInfoType>(`profile/${userId}`)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateUserStatus(status: string) {
        return instance.put<updateUserStatusType>(`profile/status`, {status: status})
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
        return instance.put<saveProfileInfoType>(`profile`, profile)
    }
}

export enum resultCodeEnum {
    Success = 0,
    Error = 1
}

export enum resultCodeForCaptcha {
    CaptchaREquired = 10
}

type meType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: resultCodeEnum | null,
    messages: Array<string>
}

type loginType = {
    data: {
        userId?: number
    },
    resultCode: resultCodeEnum | resultCodeForCaptcha | null,
    messages: Array<string>
}

export const authApi = {
    me() {
        return instance.get<meType>(`auth/me`).then(result => result.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<loginType>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<loginType>(`auth/login`)
    }
}

type getCaptchaType = {
    url: string
}

export const securityApi = {
    getCaptcha() {
        return instance.get<getCaptchaType>(`security/get-captcha-url`);
    }
}