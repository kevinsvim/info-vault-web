import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            // 目前支持light, dark
            themeMode: 'light',
        }
    },
    actions: {
        toggleTheme(mode: string) {
            this.themeMode = mode;
            document.documentElement.setAttribute( "theme-mode", mode);
            localStorage.setItem("theme-mode", mode)


        },
        initializeTheme() {
            this.themeMode = localStorage.getItem('theme-mode') || 'light';
            document.documentElement.setAttribute( "theme-mode", this.themeMode);
        },
        setTheme(mode: string) {
            localStorage.setItem("theme-mode", mode)
        }
    }
})

