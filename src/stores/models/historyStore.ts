import { defineStore } from 'pinia'

/**
 * 搜索历史store
 */
export const useHistoryStore = defineStore('history', {
  state: () => {
    return {
      searchList: []
    }
  },
  actions: {
    saveSearchContent(content: string) {
      // 检查是否重复
       this.searchList = JSON.parse(localStorage.getItem('searchHistory'))
      if (this.searchList) {
        let ch = -1
        for (let i = 0; i < this.searchList.length; i++) {
          if (searchList[i] === content) {
            ch = i
            break
          }
        }
        searchList.slice(ch, 1)

      }
    }
  }
})
