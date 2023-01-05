import axios from 'axios'
import qs from 'querystring'

let baseUrl:string = 'https://api.pingcc.cn'
/* 
  二次封装get方法
  url：指调取的接口地址
  params：数据参数对象
*/
const get = (url:string, params = {}) => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          params,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  };
  
  /* 
      二次封装post方法
      url：指调取的接口地址
      params：数据参数对象
      isFile：是否有上传文件，默认不上传文件
    */
const post = (url:string, params:any = {}, isFile:boolean = false) => {
    let data:any;
    if (isFile) {
      // 有文件上传
      data = new FormData();
      for (let attr in params) {
        data.append(attr, params[attr]);
      }
    } else {
      // 没有文件上传，则把数据拼成查询字符串
      data = qs.stringify(params);
    }
  
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  };

  export default {
    get,
    post
  }