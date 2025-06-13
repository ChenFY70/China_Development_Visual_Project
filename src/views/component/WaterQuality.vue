<!-- WaterQuality.vue -->
<template>
  <div class="section">
    <h2 class="section-title">水源质量与污染💧</h2>
    <div class="chart-row">
    <div class="bar-chart">
        <h3>化学需氧量排放量/COD(万吨)变化</h3>
        <div class="chart" ref="waterQualityChart"></div>
    </div>
    <div class="chart-container">
        <h3>工业污水排放变化</h3>
        <div class="chart" ref="waterPollutionChart"></div>
    </div>
    </div>
  </div>

  <div class="summary-section">
  <h3>核心分析</h3>
  <div class="summary-content">
    <div class="summary-point">
      <div class="point-header">
        <span class="title">污染物排放趋势分化</span>
      </div>
      <p>2015-2023年间：<br>
        • <span class="highlight-down">COD下降24.7%</span>（2954→2223万吨）<br>
        • <span class="highlight-down">氨氮骤降48.1%</span>（229.9→119.3万吨）<br>
        • <span class="highlight-up">2023年总氮较2019年激增191%</span>（117.6→342.7万吨）</p>
    </div>
    <div class="summary-point">
      <div class="point-header">
        <span class="title">近三年污染反弹</span>
      </div>
      <p>对比2020年低点：<br>
        • <span class="highlight-up">COD回升16.2%</span><br>
        • <span class="highlight-up">氨氮增长20.2%</span><br>
        • <span class="highlight-down">石油类排放仍保持59.4%降幅</span><br>
        显示<span class="highlight">后疫情时期环保压力增大</span></p>
    </div>
    <div class="summary-point">
      <div class="point-header">
        <span class="title">治理成效亮点</span>
      </div>
      <p>• <span class="highlight-down">挥发酚降幅达95.1%</span>（988→48.6吨）<br>
         • <span class="highlight-down">总磷下降25.3%</span>（54.7→40.8万吨）<br>
         • <span class="highlight-down">石油类减排90%</span>（15192→1515吨）<br>
         体现<span class="highlight">重点污染物治理显著成效</span></p>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

const waterQualityChart = ref(null)
const waterPollutionChart = ref(null)
let chartInstances = []

onMounted(() => {
  nextTick(() => {
    initWaterQualityChart()
    initWaterPollutionChart()
  })
})

onBeforeUnmount(() => {
  chartInstances.forEach(instance => instance.dispose())
  chartInstances = []
})

const initWaterQualityChart = () => {
  const instance = echarts.init(waterQualityChart.value)
  chartInstances.push(instance)

  const years = ['2023','2022','2021','2020','2019','2018','2017','2016','2015']
  const codValues = [2223.50, 658.10, 608.88, 584.22, 567.14, 2564.76, 2530.98, 2595.84, 2954.37].reverse()

  instance.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '5%', right: '15%', bottom: '5%', top: '%', containLabel: true },
    xAxis: { 
      type: 'value',
      name: 'COD/万吨',
      axisLine: { lineStyle: { color: '#3a6187' } },
      splitLine: { lineStyle: { color: 'rgba(58, 97, 135, 0.2)' } }
    },
    yAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#3a6187' } },
      axisLabel: { color: '#333' }
    },
    series: [{
      name: 'COD',
      type: 'bar',
      data: codValues,
      barWidth: 16,
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#40916c' },
          { offset: 1, color: '#74c69d' }
        ])
      },
      label: {
        show: true,
        position: 'right',
        color: '#40916c',
        fontWeight: 'bold'
      }
    }]
  })
}


const initWaterPollutionChart = () => {
  const instance = echarts.init(waterPollutionChart.value)
  chartInstances.push(instance)

  const years = Array.from({ length: 2023 - 2015 + 1 }, (_, i) => 2015 + i)

  const pollutionData = {
    2015: [229.91,461.33,54.68,15192,988.2],
    2016: [56.77,123.55,9,11599.4,272.1],
    2017: [50.87,120.26,6.96,7639.3,244.1],
    2018: [49.44,120.21,6.42,7157.7,174.5],
    2019: [46.25,117.65,5.94,6293,147.1],
    2020: [99.27,320.73,34.64,3734,59.8],
    2021: [87.68,325.97,34.47,2217.5,51.8],
    2022: [82.03,317.2,34.6,1557.6,45.2],
    2023: [119.34,342.73,40.84,1514.9,48.6]
  }

  const indicators = [
    { name: '氨氮', min: 0, max: 250},
    { name: '总氮', min: 0, max: 500},
    { name: '总磷', min: 0, max: 60},
    { name: '石油类', min: 3000, max: 16000},
    { name: '挥发酚', min: 0, max: 1000}
  ]

  // 行列排布设置
  const cols = 3
  const rows = Math.ceil(years.length / cols)

  const grids = []
  const radars = []
  const series = []

  years.forEach((year, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)

    const gridIndex = idx
    const leftPercent = (col * (100 / cols)) + 5
    const topPercent = (row * (100 / rows)) + 5

    // 网格配置
    grids.push({
      left: `${leftPercent}%`,
      top: `${topPercent}%`,
      bottom: '10%',
      width: `${90 / cols}%`,
      height: `${90 / rows}%`,
      containLabel: true
    })

    // 雷达图配置
    radars.push({
      indicator: indicators,
      center: [`${leftPercent + (90 / cols) / 2 - 5}%`, `${topPercent + (90 / rows) / 2}%`],
      radius: '22%',
      axisName: {
        color: '#a0d468',
        fontSize: 12
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(116, 198, 157, 0.2)', 'rgba(183, 228, 199, 0.1)']
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(100, 200, 100, 0.3)'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(100, 200, 100, 0.5)'
        }
      }
    })

    // 数据系列配置
    series.push({
      type: 'radar',
      radarIndex: idx,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { 
        width: 2,
        color: '#4facfe'
      },
      areaStyle: {
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
          { offset: 0, color: 'rgba(79, 172, 254, 0.5)' },
          { offset: 1, color: 'rgba(79, 172, 254, 0.1)' }
        ])
      },
      emphasis: {
        lineStyle: {
          width: 3,
          color: '#00ffaa'
        },
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: 'rgba(0, 255, 170, 0.7)' },
            { offset: 1, color: 'rgba(0, 255, 170, 0.2)' }
          ])
        }
      },
      data: [{
        value: pollutionData[year],
        name: year.toString()
      }]
    })
    
    
  })

  instance.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 40, 20, 0.8)',
      borderColor: '#4facfe',
      textStyle: {
        color: '#fff'
      }
    },
    graphic: years.map((year, idx) => {
      const col = idx % cols
      const row = Math.floor(idx / cols)
      const leftPercent = (col * (100 / cols)) + 7
      const topPercent = (row * (100 / rows)) + 7

      return {
        type: 'text',
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        style: {
          text: year.toString(),
          fill: '#fff',
          fontSize: 10,
          fontWeight: 'bold',
          backgroundColor: 'rgba(0, 100, 0, 0.5)',
          padding: [3, 6],
          borderRadius: 4
        }
      }
    }),
    grid: grids,
    radar: radars,
    series: series
  })
}

</script>

<style scoped>
.section {
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 20px rgba(168, 60, 60, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 500px;
  flex-direction: column;
}

.section-title {
  font-size: 22px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(64, 158, 255, 0.3);
  color: #40916c;
  display: flex;
  align-items: center;
}

.chart-row {
  display: flex;
  flex: 1;
  gap: 15px;
  height: 100%; 
}

.bar-chart {
  flex: 1;
  border-radius: 8px;
  padding: 0px;
  position: relative;
  overflow: visible;  
}

.bar-chart::before {
  content: "I.";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.bar-chart h3 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  color: #52b788;
}

.chart-container {
  flex: 1.65;
  border-radius: 8px;
  padding: 0px;
  background-color: rgba(116, 198, 157, 0.1);
  min-height: 700px; 
  position: relative;
  overflow: visible; 
}

.chart-container::before {
  content: "II.";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.chart-container h3 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  color: #52b788;
}

.chart {
  width: 100%;
  height: 100%; 
  min-height: 600px;
}

.summary-section {
  margin-top: 25px;
  padding: 20px;
  background: rgba(116, 198, 157, 0.08);
  border-radius: 10px;
  border: 1px solid rgba(64, 158, 255, 0.15);
  box-shadow: 0 2px 12px rgba(116, 198, 157, 0.1);
}

.summary-section h3 {
  font-size: 18px;
  color: #40916c;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(64, 158, 255, 0.3);
  display: flex;
  align-items: center;
}

.summary-section h3:before {
  content: "🔍";
  margin-right: 8px;
}

.summary-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.summary-point {
  flex: 1;
  min-width: 300px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  position: relative; 
}

.summary-point:nth-of-type(1)::before {
  content: "I";
  position: absolute;
  top: 6px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:nth-of-type(2)::before {
  content: "I、II";
  position: absolute;
  top: 0px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:nth-of-type(3)::before {
  content: "II";
  position: absolute;
  top: 6px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(116, 198, 157, 0.2);
}

.point-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.point-header .title {
  margin: 0 0 8px 0;
  font-weight: 500;
  color: #2d6a4f;
  font-size: 20px;
}

.summary-point p {
  color: #333;
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.highlight {
  color: #e63946;
  font-weight: 600;
  background: rgba(230, 57, 70, 0.08);
  padding: 0 4px;
  border-radius: 3px;
}

.highlight-down {
  color: #40916c;
  font-weight: 600;
  background: rgba(64, 145, 108, 0.1);
  padding: 0 4px;
  border-radius: 3px;
}
.highlight-up {
  color: #e63946;
  font-weight: 600;
  background: rgba(230, 57, 70, 0.1);
  padding: 0 4px;
  border-radius: 3px;
}
</style>
