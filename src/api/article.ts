import request from '@/utils/request'
import type { BlogTypes } from '@/types/blog'
export default {

    saveArticle(article: BlogTypes.ArticleType) {
        return request({
            url: '/secured/article/save',
            method: 'post',
            data: article
        })
    }
}