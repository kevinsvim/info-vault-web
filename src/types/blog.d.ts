/**
 * 文章相关类型
 */
export namespace BlogTypes {
    export interface ArticleType {
        /* 文章标题 */
        title: string,
        /* 文章内容 */
        content: string,
        /* 文章封面 */
        cover: string,
        /* 创作声明 */
        statement: string,
        /* 文章类型 */
        type: number,
        /* 原文链接 */
        source: string,
        /* 是否授权文章 */
        isAuthorized: boolean,
        /* 可见范围 */
        range: number
    }
}