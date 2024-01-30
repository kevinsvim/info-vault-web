/**
 * API相关类型
 */
export namespace ApiTypes {
    export interface ResponseDataType<T = any> {
        /* 响应内容 */
        data: T,
        /* 响应信息 */
        msg: string,
        /* 响应状态码 */
        code: number,
        /* 接口是否成功返回 */
        success: boolean,
    }
}

