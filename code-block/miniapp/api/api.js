import wepy from 'wepy'
const urlPrefix = 'https://questionminiapp.yuntask.com/api/v1'
const header = {'content-type': 'application/x-www-form-urlencoded' }
export const login = (data = {}) => wepy.request({ method: 'POST', url: `${urlPrefix}/user/login`, data, header }).then(res => res.data) // 登录
