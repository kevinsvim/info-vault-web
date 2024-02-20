import request from "@/utils/request";
import type { ApiTypes } from "@/types/api";
import type { MemberTypes } from "@/types/member";

export default {

    login: (loginParam: MemberTypes.LoginReqType) :Promise<ApiTypes.ResponseDataType> => {
        return request({
            url: '/unsecured/user/login',
            method: 'post',
            data: loginParam
        })
    }
}