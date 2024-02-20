import { defineStore } from "pinia";
import type { MemberTypes } from "@/types/member";
/**
 * 用户store
 */
export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: JSON.parse(localStorage.getItem("user") || "null")
        }
    },
    actions: {
        setUser(user: MemberTypes.LoginResType) {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        getUser() {
            return this.user = (this.user || JSON.parse(localStorage.getItem('user') || 'null'))
        }
    }
})