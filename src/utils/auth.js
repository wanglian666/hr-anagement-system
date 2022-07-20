// token存储到本地
import Cookies from 'js-cookie';
const TokenKey = 'hrsass-token'; // 设置一个独一无二的key
const TimeKey = 'hrsass-timestamp';

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}


// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(TimeKey, Date.now())
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
