<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { debugApp } from '@/services/app.ts'
import { useRoute } from 'vue-router'

// 定义交互所需要的数据
const query = ref('')
const messages = ref([])
const isLoading = ref(false)
const route = useRoute()

const clearMessages = () => {
  messages.value = []
}

const send = async () => {
  if (!query.value) {
    Message.error('用户提问不能为空')
    return
  }
  if (isLoading.value) {
    Message.warning('请等待上一条消息回复完成')
    return
  }

  try {
    // 提取用户输入
    const humanQuery = query.value
    messages.value.push({
      role: 'human',
      content: humanQuery,
    })
    // 清空输入框
    query.value = ''
    isLoading.value = true

    // 发起api请求
    const response = await debugApp(route.params.app_id as string, humanQuery)
    const content = response.data.content

    messages.value.push({
      role: 'ai',
      content: content,
    })
  } finally {
    isLoading.value = false
  }

  isLoading.value = false
}
</script>

<template>
  <!-- 最外层容器，内容撑满整个屏幕 -->
  <div class="h-screen flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="flex items-center h-[74px] bg-gray-100 border-b border-gray-200 px-4">
      顶部导航栏
    </header>
    <!-- 底部内容区 -->
    <div class="flex flex-row h-[calc(100vh-74px)]">
      <!-- 左侧的编排 -->
      <div class="w-2/3 bg-gray-50 h-full">
        <header class="flex items-center h-16 border-b border-gray-200 px-7 text-xl text-gray-700">
          应用编排
        </header>
        <div class="flex flex-row h-[calc(100%-64px)]">
          <div class="flex-1 border-r border-gray-200 p-6">人设与回复逻辑</div>
          <div class="flex-1 p-6">应用能力</div>
        </div>
      </div>
      <!-- 右侧调试与预览 -->
      <div class="flex flex-col w-1/3 bg-white h-full">
        <!-- 调试与预览 -->
        <header
          class="flex-1 items-center h-16 px-4 text-xl bg-white border-b border-b-gray-200 shadow-sm"
        >
          调试与预览
        </header>
        <!-- 调试对话界面 -->
        <div class="h-full min-h-0 px-6 py-7 overflow-x-hidden overflow-y-scroll scrollbar-w-none">
          <!-- 人了消息 -->
          <div class="flex flex-row gap-2 mb-6" v-for="message in messages" :key="message.content">
            <!-- 头像 -->
            <a-avatar
              v-if="message.role === 'human'"
              :style="{ backgroundColor: '#3370ff' }"
              class="flex-shrink-0"
              :size="30"
            >
              <icon-apps />
            </a-avatar>
            <a-avatar
              v-else
              :style="{ backgroundColor: '#00d0b6' }"
              class="flex-shrink-0"
              :size="30"
            >
              <icon-apps />
            </a-avatar>
            <!-- 实际消息 -->
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">
                {{ message.role === 'human' ? '用户' : 'GPT聊天机器人' }}
              </div>
              <div
                v-if="message.role === 'human'"
                class="max-w-max bg-blue-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                {{ message.content }}
              </div>
              <div
                v-else
                class="max-w-max bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                {{ message.content }}
              </div>
            </div>
          </div>
          <!-- 没有任何数据时 -->
          <div
            v-if="!messages.length"
            class="mt-[200px] flex flex-col items-center justify-center gap-2"
          >
            <a-avatar :size="70" shape="square" :style="{ backgroundColor: '#00d0b6' }">
              <icon-apps />
            </a-avatar>
            <div class="text-2xl font-semibold text-gray-900">GPT聊天机器人</div>
          </div>
          <!-- AI加载状态 -->
          <div v-if="isLoading" class="flex flex-row gap-2 mb-6">
            <!-- 头像 -->
            <a-avatar :style="{ backgroundColor: '#00d0b6' }" class="flex-shrink-0" :size="30">
              <icon-apps />
            </a-avatar>
            <!-- 实际消息 -->
            <div class="flex flex-col gap-2">
              <div class="font-semibold text-gray-700">GPT聊天机器人</div>
              <div
                class="max-w-max bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-2xl leading-5"
              >
                <icon-loading />
              </div>
            </div>
          </div>
        </div>
        <!-- 调试对话输入框 -->
        <div class="w-full flex-shrink-0 flex flex-col">
          <!-- 顶部输入框 -->
          <div class="px-6 flex items-center gap-4">
            <!-- 清除按钮 -->
            <a-button class="flex-shrink-0" type="text" shape="circle" @click="clearMessages">
              <template #icon>
                <icon-empty size="16" :style="{ color: '#374151' }" />
              </template>
            </a-button>
            <!-- 输出框组件 -->
            <div
              class="h-[50px] flex items-center gap-2 px-4 flex-1 border border-gray-200 rounded-full"
            >
              <input type="text" class="flex-1 outline-0" v-model="query" @keyup.enter="send" />
              <a-button type="text" shape="circle">
                <template #icon>
                  <icon-plus-circle size="16" :style="{ color: '#374151' }" />
                </template>
              </a-button>
              <a-button type="text" shape="circle" @click="send">
                <template #icon>
                  <icon-send size="16" :style="{ color: '#374151' }" />
                </template>
              </a-button>
            </div>

            <!-- 底部提示文字 -->
            <div class="text-center text-gray-500 text-xs py-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
