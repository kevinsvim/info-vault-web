import { ElNotification } from 'element-plus'
const openS = (msg: string = 'Success', title: string = '验证通过') => {
    ElNotification({
        title: title,
        message: msg,
        type: 'success',
    })
}
const openF = (msg: string = "Failed", title: string = '验证失败') => {
    ElNotification({
        title: title,
        message: msg,
        type: 'error',
    })
}

export { openS, openF }