export namespace MemberTypes {

    export interface LoginReqType {
        username: string
        password: string
    }

    export interface LoginResType {
        id: number
        username: string
        password: string
        avatar: string
        token: string
    }
}
