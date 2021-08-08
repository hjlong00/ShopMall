import axios from 'axios'


export function request (config) {
  // 1,创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  instance.interceptors.request.use(
    //请求成功的拦截
    config => {
      return config       //拦截后放行
    },
    //请求失败的拦截
    err => {
      console.log(err);
    })

  // 2.2 响应拦截
  instance.interceptors.response.use(
    // 响应成功的拦截
    res => {
      return res.data
    },
    // 响应失败的拦截
    err => {
      console.log(err);
    })
    
  // 3,发送真正的网络请求
  return instance(config)
}
