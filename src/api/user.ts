import request from "@/utils/request";
import type { MemberTypes } from "@/types/member";

export default {

    login: (loginParam: MemberTypes.LoginReqType) :Promise<MemberTypes.LoginResType> => {
        return request({
            url: '/unsecured/user/login',
            method: 'post',
            data: loginParam
        })
    }
}
