export default [
    {
        url: '/unsecured/user/login',
        method: 'post',
        response: (account: string, password: string) => {
            console.log(account, password)
            return {
                code: 200,
                msg: '成功',
                data: {
                    id: 1,
                    username: 'admin',
                    password: '123456',
                    avatar: 'https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png',
                    token: '123456',
                }
            }
        }
    }
]
