<template>
  <div class="welcome-container">
    <h1 class="welcome-title">中国社会发展情况可视化分析</h1>
    <p class="welcome-subtitle">欢迎查看我们的数据分析与可视化结果</p>
    <button class="enter-btn" @click="enterMain">进入系统</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const enterMain = () => {
  router.push('/main')
}
</script>
