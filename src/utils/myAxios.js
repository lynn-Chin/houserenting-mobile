import Axios from 'axios'

/**
 * 封装axios：
 *      1. baseURL
 *      2. 优化请求返回值格式
 */

 const newAxios = Axios.create({ baseURL: 'http://157.122.54.189:9060' });

 /**
  * 封装思路：
  *     1. axios请求是异步的，所以应该返回一个Promise函数
  *     2. 接收用户传递的参数
  *     3. 获取到请求的返回值后，用resolve返回
  *     4. 获取到请求的错误提示后，用reject返回
  */
 const myAxios = (params) => {
     return new Promise( (resolve, reject) => {
         newAxios({
             ...params
         }).then( res => {
             resolve(res.data.body)
         }).catch(res => {
             reject(res)
         })
     })
 }

//  将新的axios导出
 export default myAxios;