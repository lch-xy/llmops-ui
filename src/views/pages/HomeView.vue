<script setup lang="ts">
import { useAccountStore } from '@/stores/account.ts'

const accountStore = useAccountStore()

function updateName() {
  accountStore.update({ name: 'Arco' })
}
</script>
<template>
  <p>这是主页</p>
  <p>当前登陆的用户是：{{ accountStore.account.name }}</p>
  <p>当前登陆的邮箱是：{{ accountStore.account.email }}</p>
  <a-button type="primary" @click="updateName">更新用户名</a-button>
  <a-button type="primary" @click="accountStore.clear">重置</a-button>
  <router-link to="/space/apps">跳转到应用列表</router-link>
</template>

<style scoped></style>
