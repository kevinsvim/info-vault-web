import { defineStore } from "pinia";

/**
 * 主题store
 */
export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            // 目前支持light, dark
            themeMode: 'light',
        }
    },
    actions: {
        toggleTheme(mode: 'light' | 'dark') {
            this.themeMode = mode;
            document.documentElement.setAttribute( "theme-mode", mode);
            localStorage.setItem("theme-mode", mode)


        },
        initializeTheme() : string {
            this.themeMode = localStorage.getItem('theme-mode') || 'light';
            document.documentElement.setAttribute( "theme-mode", this.themeMode);
            return this.themeMode
        },
        setTheme(mode: 'dark' | 'light') {
            localStorage.setItem("theme-mode", mode)
        }
    }
})

