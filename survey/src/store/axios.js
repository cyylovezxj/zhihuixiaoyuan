// 做axios的默认设置
import axios from 'axios';

axios.defaults.baseURL = "http://120.78.164.247:9999";
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

export default axios;



