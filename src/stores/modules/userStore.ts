import { defineStore } from "pinia";
import type { MemberTypes } from "@/types/member";
/**
 * 用户store
 */
export const useUserStore = defineStore("user", {
    state: () => {
        return {
            avatar: localStorage.getItem("avatar") || "",
            username: localStorage.getItem("username") || "",
            userId: localStorage.getItem("userId") || "",
            access_token: localStorage.getItem("access_token") || "",
            refresh_token: localStorage.getItem("refresh_token") || "",
        }
    },
    actions: {
        setUser(user: MemberTypes.LoginResType) {
            this.avatar = user.avatar
            this.username = user.username
            this.userId = String(user.id)
            this.access_token = user.access_token
            this.refresh_token = user.refresh_token

            localStorage.setItem("avatar", user.avatar)
            localStorage.setItem("userId", String(user.id))
            localStorage.setItem("username", user.username)
            localStorage.setItem('access_token', user.access_token)
            localStorage.setItem('refresh_token', user.refresh_token)
        },
    }
})