import { defineStore } from 'pinia'
import { HistoryEnum } from '@/enums/enums'
/**
 * 搜索历史store
 */
export const useHistoryStore = defineStore(HistoryEnum.STORE_ID, {
  state: () => {
    return {
      searchList: [] as string[],
    }
  },
  actions: {
    /**
     * 保存搜索内容
     * 如果列表中已经存在该元素，则移除旧的，将新元素加入列表头部
     * 一旦列表长度达到MAX_SIZE，并且不存在重复的元素，则将最早的元素移除
     */
    saveSearchContent(content: string): void {
      if (content.trim() === '') {
        return
      }
      if (this.searchList.length === 0) {
        const data: string | null = localStorage.getItem(HistoryEnum.STORAGE_KEY)
        this.searchList = data ? (JSON.parse(data)) : []
      }
      // 如果长度为0，则直接插入数据即可
      if (this.searchList.length > 0) {
        // 寻找是否存在重复元素
        let ch : number = -1
        for (let i : number = 0; i < this.searchList.length; i++) {
          if (this.searchList[i] === content) {
            ch = i
            break
          }
        }
        // 移除重复的元素
        if (ch != -1) {
          this.searchList.splice(ch, 1)
        } else if (this.searchList.length >= HistoryEnum.MAX_SIZE) {
          this.searchList.pop()
        }
      }
      // 将新元素加入头部
      this.searchList.unshift(content)
      localStorage.setItem(HistoryEnum.STORAGE_KEY, JSON.stringify(this.searchList))
    },
    /**
     * 获取搜索历史
     */
    getSearchHistory(): string[] {
      if (this.searchList.length > 0) {
        return this.searchList
      }
      const data : string | null = localStorage.getItem(HistoryEnum.STORAGE_KEY)
      return data ? (this.searchList = JSON.parse(data)) : []
    },
    /**
     * 清空搜索记录
     */
    clearSearchHistory(): void {
      this.searchList = []
      localStorage.removeItem(HistoryEnum.STORAGE_KEY)
    },
    /**
     * 移除指定记录
     */
    removeSearchHistory(content: string): void {
      this.searchList = this.searchList.filter(item => item !== content)
      localStorage.setItem(HistoryEnum.STORAGE_KEY, JSON.stringify(this.searchList))
    }
  }
})