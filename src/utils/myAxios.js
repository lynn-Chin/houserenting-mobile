import { Toast } from 'antd-mobile';
import Axios from 'axios'

/**
 * 封装axios：
 *      1. baseURL
 *      2. 优化请求返回值格式
 *      3. 加载中提示
 */

const myAxios = Axios.create({ baseURL: 'http://157.122.54.189:9060' });

//  控制加载提示的隐藏时机
let axiosCounter = 0;

 // 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前显示加载提示
    axiosCounter ++;
    console.log('提示');
    Toast.loading('加载中...', 0)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    axiosCounter --;

    if (axiosCounter === 0) {
        console.log('隐藏');
        //加载组件隐藏
        Toast.hide();
    }
    
    // 对响应数据做结构优化
    return response.data.body;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//  将新的axios导出
 export default myAxios;