import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
    id: 'sidebar',
    state: () => {
      return {
          anchorList: [
              {
                  id: 1,
                  anchor: 'hot',
                  text: '热门工具',
                  iconClass: 'icon-tool'
              },
              {
                  id: 2,
                  anchor: 'online',
                  text: '在线工具',
                  iconClass: 'icon-tool'
              },
              {
                  id: 3,
                  anchor: 'text',
                  text: '文本工具',
                  iconClass: 'icon-tool'
              },
              {
                  id: 4,
                  anchor: 'usually',
                  text: '常用工具',
                  iconClass: 'icon-tool'
              },
              {
                  id: 5,
                  anchor: 'compile',
                  text: '编译工具',
                  iconClass: 'icon-tool'
              },
              {
                  id: 6,
                  anchor: 'other',
                  text: '其它工具',
                  iconClass: 'icon-tool'
              }
          ],
          anchor: '',
      }
    },
    actions: {
        setAnchor(anchor: string) {
            this.anchor = anchor || ''
        },
        scrollTo(offsetTop: number) {
            const parent = document.querySelector('#app')
            parent?.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            })
        },
        anchorPosition(anchor: string) {
            const element = document.querySelector(anchor)
            this.scrollTo(element?.scrollTop || 0)
            this.setAnchor(anchor)
        }
    }
})
