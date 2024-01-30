import request from '@/utils/request'
import qs from 'qs'

export default {
  getCaptchaData: () => {
    return request({
      url: '/unsecured/captcha/data',
      method: 'get'
    })
  },
  checkCaptchaData: (data: any, key: string) => {
    return request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: '/api/go_captcha_check_data',
      data: qs.stringify({
        dots: data.join(','),
        key: key
      })
    })
  }
}
