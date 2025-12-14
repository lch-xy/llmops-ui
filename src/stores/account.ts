import { defineStore } from 'pinia'
import { ref } from 'vue'

//初始值
const initAccount: { name: string; email: string; avator: string } = {
  name: 'zhangsan',
  email: 'zhangsan@163.com',
  avator: 'https://avatars.githubusercontent.com/u/2664567?v=4',
}

export const useAccountStore = defineStore('account', () => {
  // 1.定义数据
  const account = ref({ ...initAccount })

  // 2.函数
  function update(params: any): void {
    Object.assign(account.value, params)
  }

  function clear(): void {
    account.value = { ...initAccount }
  }
  return { account, update, clear }
})
