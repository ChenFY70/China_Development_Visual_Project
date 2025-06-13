
<template>
  <div class="dashboard">
    <div class="page-header">
      <h1 class="page-title">环境与资源</h1>
    </div>

    <div class="module-buttons">
      <button 
        class="module-btn" 
        :class="{ active: activeModule === 'air' }" 
        @click="activeModule = 'air'"
      >空气质量</button>
      <button 
        class="module-btn" 
        :class="{ active: activeModule === 'water' }" 
        @click="activeModule = 'water'"
      >水源质量</button>
      <button 
        class="module-btn" 
        :class="{ active: activeModule === 'energy' }" 
        @click="activeModule = 'energy'"
      >电力能源</button>
      <button 
        class="module-btn" 
        :class="{ active: activeModule === 'forest' }" 
        @click="activeModule = 'forest'"
      >森林与绿地</button>
    </div>

    <!-- 显示可视化内容模块 -->
    <component 
      :is="currentComponent" 
      v-if="activeModule"
    />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AirQuality from './component/AirQuality.vue'
import WaterQuality from './component/WaterQuality.vue'
import Energy from './component/Energy.vue'
import Forest from './component/Forest.vue'

const activeModule = ref('air') // 默认显示空气质量模块

const currentComponent = computed(() => {
  switch (activeModule.value) {
    case 'air': return AirQuality
    case 'water': return WaterQuality
    case 'energy': return Energy
    case 'forest': return Forest
    default: return null
  }
})

</script>

<style scoped>
.dashboard {
  max-width: 1920px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  padding: 2px 0;
  margin-bottom: 25px;
  margin-top: -20px;
  border-bottom: 1px solid rgba(64, 158, 255, 0.3);
  position: relative;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  background: #1b4332;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(79, 172, 254, 0.3);
  position: relative;
  display: inline-block;
}


.module-buttons {
  text-align: center;
  margin-bottom: 20px;
}

.module-buttons .module-btn {
  margin: 0 10px;
  padding: 8px 18px;
  font-size: 14px;
  background-color: transparent;
  border: 2px solid #38b000;
  color: #38b000;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
}

.module-buttons .module-btn:hover {
  background-color: #38b000;
  color: white;
}

.module-buttons .module-btn.active {
  background-color: #38b000;
  color: white;
}


@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-row {
    flex-direction: column;
  }
}
</style>