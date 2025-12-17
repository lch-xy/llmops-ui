// 1.接口超时，100s
// 2.不需要写api前缀，比如http://localhost:5000
// 3.我们经常使用get和post，需要对着两个方法进行封装
// 4.每次获取数据都要使用response.json()才可以获取数据，需要封装

import { API_PREFIX } from '@/config'

// 接口超时，100s
const TIME_OUT = 100 * 1000

console.log('API_PREFIX', API_PREFIX)

// 基础的fetch请求配置
const baseFetchOptions = {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
}

// fetch参数类型 ，Omit代表删除某个字段，& 表示交叉类型（类型合并）
type FetchOptionType = Omit<RequestInit, 'body'> & {
  params?: Record<string, any>
  body?: BodyInit | Record<string, any> | null
}

// 封装基础的fetch请求
const baseFetch = <T>(url: string, fetchOptions: FetchOptionType): Promise<T> => {
  // 1.将所有配置信息合并起来
  const options: typeof baseFetchOptions & FetchOptionType = Object.assign(
    {},
    baseFetchOptions,
    fetchOptions,
  )

  // 2.组装url let可以重新赋值 const不可以赋值
  let urlWithPrefix = `${API_PREFIX}${url.startsWith('/') ? url : `/${url}`}`

  // 3.结构出对应的请求方法， param bodu参数
  const { method, params, body } = options

  // 4.如果方法为GET并传递了参数，则处理参数信息
  if (method === 'GET' && params) {
    const paramsArray: string[] = []
    Object.keys(params).forEach((key) => {
      paramsArray.push(`${key}=${encodeURIComponent(params[key])}`)
    })
    if (urlWithPrefix.search(/\?/) === -1) {
      urlWithPrefix += `?${paramsArray.join('&')}`
    } else {
      urlWithPrefix += `&${paramsArray.join('&')}`
    }

    // 5.删除params参数
    delete options.params
  }

  // 6.处理传递的post参数
  if (body) options.body = JSON.stringify(body)

  //构建超时处理
  return Promise.race([
    // 超时处理
    new Promise((reject) => {
      setTimeout(() => {
        reject('请求超时')
      }, TIME_OUT)
    }),
    new Promise((resolve, reject) => {
      globalThis
        .fetch(urlWithPrefix, options as RequestInit)
        .then((res) => {
          resolve(res.json())
        })
        .catch((error) => {
          reject(error)
        })
    }),
  ]) as Promise<T>
}

// 封装基础的fetch请求
export const request = <T>(url: string, options = {}) => {
  return baseFetch<T>(url, options)
}

// 封装基础get请求
export const get = <T>(url: string, options = {}) => {
  return request<T>(url, Object.assign({}, options, { method: 'GET' }))
}

// 封装基础post请求
export const post = <T>(url: string, options = {}) => {
  return request<T>(url, Object.assign({}, options, { method: 'POST' }))
}
