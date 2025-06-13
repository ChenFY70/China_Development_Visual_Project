<template>
  <div class="section">
    <h2 class="section-title">空气质量与排放💨</h2>
    <div class="chart-row">
      <!-- 左侧省会城市AQI对比图表 -->
      <div class="chart-city-container">
        <div class="chart-header">
          <h3>省会城市AQI变化趋势 (2014-2024)</h3>
          <div class="city-selector">
            <select v-model="selectedCities[0]">
              <option value="">-- 选择城市1 --</option>
              <option v-for="city in capitalCities" :value="city">{{city}}</option>
            </select>
            <select v-model="selectedCities[1]">
              <option value="">-- 选择城市2 --</option>
              <option v-for="city in capitalCities" :value="city">{{city}}</option>
            </select>
            <select v-model="selectedCities[2]">
              <option value="">-- 选择城市3 --</option>
              <option v-for="city in capitalCities" :value="city">{{city}}</option>
            </select>
          </div>
        </div>
        <div class="chart" ref="capitalChart"></div>
      </div>
      
      <!-- 右侧上下排列的两个图表 -->
      <div class="right-column">
        <div class="chart-container">
          <h3>全国城市全年空气优良天数平均占比</h3>
          <div class="chart" ref="airQualityChart"></div>
        </div>
        <div class="chart-container">
          <h3>2016-2023年大气污染物排放趋势</h3>
          <div class="chart" ref="airEmissionChart"></div>
        </div>
      </div>
    </div>
    <div class="summary-section">
    <h3>空气质量核心分析</h3>
    <div class="summary-content">
      <div class="summary-point">
        <div class="point-header">
          <span class="title">优良天数持续改善</span>
        </div>
        <p>全国城市空气优良天数占比从2014年<span class="highlight">67.0%</span>提升至2023年<span class="highlight">84.9%</span>，
        年均增长<span class="highlight">2.0个百分点</span>，2020年后稳定在80%以上水平。</p>
      </div>
      
      <div class="summary-point">
        <div class="point-header">
          <span class="title">污染物排放反弹</span>
        </div>
        <p>2023年出现显著回升：<br>
        • 氮氧化物<span class="highlight-up">激增34.8%</span>（895→1207万吨）<br>
        • 颗粒物<span class="highlight-up">增长3.6%</span>（493→511万吨）<br>
        反映后疫情时期排放控制压力增大</p>
      </div>
      
      <div class="summary-point">
        <div class="point-header">
          <span class="title">治理成效亮点</span>
        </div>
        <p>• 二氧化硫排放量<span class="highlight-down">下降72.2%</span>（2016年855→2023年238万吨）<br>
        • 颗粒物排放<span class="highlight-down">减少68.2%</span>（2016年1608→2023年511万吨）<br>
        体现重点污染物治理显著成效</p>
      </div>
      
    </div>
  </div>
  </div>

  
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const capitalChart = ref(null)
const airQualityChart = ref(null)
const airEmissionChart = ref(null)
let chartInstances = []

// 省会城市和直辖市列表
const capitalCities = [
  '北京市', '天津市', '上海市', '重庆市', 
  '石家庄市', '太原市', '呼和浩特市', '沈阳市', 
  '长春市', '哈尔滨市', '南京市', '杭州市', 
  '合肥市', '福州市', '南昌市', '济南市', 
  '郑州市', '武汉市', '长沙市', '广州市', 
  '南宁市', '海口市', '成都市', '贵阳市', 
  '昆明市', '拉萨市', '西安市', '兰州市', 
  '西宁市', '银川市', '乌鲁木齐市'
]

// 选择的城市 (最多3个)
const selectedCities = ref(['北京市', '上海市', '广州市'])

// 省会城市AQI数据 (从Excel中提取)
const capitalAQIData = {
  '北京市': [124.90, 122.41, 113.23, 101.49, 93.07, 86.36, 78.66, 78.22, 72.50, 82.25, 81.79],
  '天津市': [119.57, 103.12, 104.08, 106.68, 97.28, 99.90, 90.72, 85.43, 79.31, 95.82, 93.16],
  '上海市': [82.61, 89.19, 80.94, 82.61, 72.67, 72.27, 68.13, 63.82, 65.04, 66.87, 70.57],
  '重庆市': [95.19, 81.87, 81.05, 79.92, 71.70, 72.28, 67.03, 61.68, 62.26, 66.53, 62.06],
  '石家庄市': [167.51, 123.27, 136.05, 131.98, 120.53, 116.88, 102.89, 98.36, 91.47, 99.47, 99.05],
  '太原市': [106.05, 95.15, 103.13, 113.10, 104.33, 103.80, 97.79, 100.90, 89.87, 95.61, 98.67],
  '呼和浩特市': [88.36, 86.90, 84.14, 89.38, 86.99, 80.55, 84.17, 82.16, 66.18, 81.95, 87.94],
  '沈阳市': [109.52, 109.88, 90.39, 89.82, 74.78, 80.56, 78.81, 69.87, 64.48, 73.44, 78.66],
  '长春市': [98.93, 101.15, 81.55, 82.70, 62.70, 70.74, 73.10, 61.06, 58.96, 69.68, 71.54],
  '哈尔滨市': [105.64, 101.90, 79.00, 91.27, 69.08, 73.22, 77.04, 67.15, 65.62, 71.46, 73.23],
  '南京市': [106.31, 95.91, 90.31, 85.13, 84.29, 84.65, 73.32, 72.87, 73.54, 74.22, 74.75],
  '杭州市': [94.22, 89.77, 85.75, 83.85, 78.66, 79.90, 67.65, 67.98, 70.90, 70.56, 73.23],
  '合肥市': [107.71, 91.41, 89.46, 93.18, 84.00, 85.39, 71.62, 70.51, 72.53, 73.29, 75.68],
  '福州市': [66.23, 56.56, 54.66, 59.55, 57.76, 55.05, 51.52, 46.12, 51.82, 51.85, 54.90],
  '南昌市': [76.54, 70.71, 73.62, 74.61, 64.39, 70.68, 65.24, 65.06, 67.71, 67.96, 64.06],
  '济南市': [132.61, 129.06, 117.48, 110.38, 105.63, 106.17, 96.79, 95.49, 86.32, 99.27, 95.38],
  '郑州市': [121.42, 134.07, 124.10, 119.12, 113.27, 110.75, 99.18, 95.07, 95.27, 98.92, 98.22],
  '武汉市': [115.80, 104.96, 92.65, 88.54, 84.37, 87.73, 72.35, 76.51, 75.35, 79.07, 76.15],
  '长沙市': [101.02, 87.78, 82.80, 84.58, 80.90, 83.46, 70.97, 75.19, 69.98, 71.05, 67.60],
  '广州市': [81.12, 71.01, 69.89, 75.13, 72.24, 74.43, 64.55, 64.82, 61.02, 60.15, 53.00],
  '南宁市': [74.49, 64.91, 58.93, 57.56, 55.45, 54.48, 49.96, 53.80, 50.33, 50.48, 43.97],
  '海口市': [42.99, 43.48, 43.04, 44.61, 41.15, 46.51, 42.61, 42.39, 42.09, 44.61, 40.32],
  '成都市': [107.84, 101.29, 100.82, 97.65, 84.50, 76.49, 76.53, 74.37, 76.03, 78.01, 74.65],
  '贵阳市': [69.81, 60.54, 61.62, 54.70, 52.42, 49.96, 45.32, 47.18, 42.75, 48.27, 44.20],
  '昆明市': [59.63, 54.52, 55.36, 55.78, 52.95, 54.69, 48.98, 50.46, 47.76, 54.16, 54.84],
  '拉萨市': [61.80, 64.05, 73.50, 58.60, 57.40, 52.62, 50.48, 48.99, 52.11, 59.10, 65.19],
  '西安市': [111.61, 96.17, 116.19, 122.02, 109.90, 103.61, 92.04, 90.26, 101.00, 99.53, 100.70],
  '兰州市': [94.93, 90.47, 100.04, 102.12, 97.53, 81.87, 78.50, 87.26, 79.85, 90.03, 92.81],
  '西宁市': [92.12, 83.18, 86.50, 84.10, 83.18, 69.84, 69.30, 76.59, 69.85, 72.18, 78.14],
  '银川市': [89.88, 90.86, 95.68, 97.60, 88.56, 75.49, 80.88, 85.18, 76.58, 87.01, 92.75],
  '乌鲁木齐市': [109.22, 103.22, 109.58, 109.52, 97.04, 90.97, 89.36, 82.94, 82.59, 80.17, 82.84]
}

// 年份数据
const years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']

onMounted(async () => {
  await nextTick()
  initCapitalChart()
  initAirQualityChart()
  initAirEmissionChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstances.forEach(instance => instance.dispose())
  chartInstances = []
})

const handleResize = () => {
  chartInstances.forEach(instance => instance.resize())
}

// 监听城市选择变化
watch(selectedCities, () => {
  updateCapitalChart()
}, { deep: true })

// 初始化省会城市AQI图表
const initCapitalChart = () => {
  const instance = echarts.init(capitalChart.value)
  chartInstances.push(instance)
  updateCapitalChart(instance)
}

// 更新省会城市AQI图表
const updateCapitalChart = () => {
  const instance = chartInstances.find(i => i._dom === capitalChart.value)
  if (!instance) return
  
  const series = selectedCities.value
    .filter(city => city && capitalAQIData[city])
    .map(city => ({
      name: city,
      type: 'line',
      smooth: true,
      data: capitalAQIData[city],
      symbolSize: 8,
      lineStyle: {
        width: 3
      },
      emphasis: {
        focus: 'series'
      }
    }))

  instance.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        let result = `${params[0].axisValue}年<br/>`
        params.forEach(param => {
          result += `${param.marker} ${param.seriesName}: ${param.value}<br/>`
        })
        return result
      }
    },
    legend: {
      data: selectedCities.value.filter(city => city),
      right: 10,
      top: 0,
      textStyle: {
        color: '#3a6187'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: years,
      axisLine: {
        lineStyle: {
          color: '#3a6187'
        }
      },
      axisLabel: {
        rotate: 30,
        margin: 15
      }
    },
    yAxis: {
      type: 'value',
      name: 'AQI指数',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3a6187'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(58, 97, 135, 0.3)'
        }
      }
    },
    series: series,
    color: ['#c23531', '#61a0a8', '#d48265']
  })
}

const initAirQualityChart = () => {
  if (!airQualityChart.value || airQualityChart.value.clientWidth === 0) {
    setTimeout(initAirQualityChart, 100)
    return
  }

  const percentageData = [244.54, 277.25, 285.81, 282.11, 283.45, 294.62, 315.14, 315.47, 310.72, 310.00, 318.23]
    .map(v => parseFloat((v / 3.65).toFixed(2)));

  // 计算平均值
  const averageValue = parseFloat((
    percentageData.reduce((sum, val) => sum + val, 0) / percentageData.length
  ).toFixed(2));

  const instance = echarts.init(airQualityChart.value)
  chartInstances.push(instance)
  instance.setOption({
    tooltip: { 
      trigger: 'axis',
      formatter: params => {
        const value = parseFloat(params[0].value).toFixed(2);
        return `${params[0].axisValue}年<br/>优良天数占比: ${value}%`;
      }
    },
    grid: { 
      left: '3%', 
      right: '4%',
      bottom: '10%',
      top: '20%', 
      containLabel: true 
    },
    xAxis: { 
      type: 'category', 
      data: ['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'],
      axisLine: { lineStyle: { color: '#3a6187' } },
      axisLabel: {
        rotate: 30,
        margin: 15 
      }
    },
    yAxis: { 
      type: 'value', 
      name: '优良天数占比(%)',
      min: 60,
      max: 90, 
      axisLine: { show: true, lineStyle: { color: '#3a6187' } },
      splitLine: { lineStyle: { color: 'rgba(58, 97, 135, 0.3)' } },
      axisLabel: {
        formatter: '{value}%' 
      }
    },
    series: [{
      name: '优良天数占比',
      type: 'line',
      smooth: true,
      data: percentageData,
      lineStyle: { width: 3, color: '#4facfe' },
      itemStyle: { color: '#4facfe' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(79, 172, 254, 0.3)' },
          { offset: 1, color: 'rgba(79, 172, 254, 0.05)' }
        ])
      },
      symbolSize: 8,
      markLine: {
        silent: true,
        data: [
          { 
            type: 'average', 
            name: '平均值',
            label: {
              formatter: `平均: ${averageValue}%`,
              position: 'middle'
            },
            lineStyle: {
              type: 'dashed',
              color: '#ff9f43'
            }
          }
        ]
      }
    }]
  })
}
const initAirEmissionChart = () => {
  if (!airEmissionChart.value || airEmissionChart.value.clientHeight === 0) {
    setTimeout(initAirEmissionChart, 100)
    return
  }

  const instance = echarts.init(airEmissionChart.value)
  chartInstances.push(instance)
  
  const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const noxData = [1503.3, 1348.4, 1288.44, 1233.85, 1019.66, 988.38, 895.74, 1207.29]; // 氮氧化物排放量(万吨)
  const so2Data = [854.89, 610.84, 516.12, 457.29, 318.22, 274.78, 243.52, 237.97];     // 二氧化硫排放量(万吨)
  const pmData = [1608.01, 1284.92, 1132.26, 1088.48, 611.4, 537.38, 493.38, 510.96];    // 颗粒物排放量(万吨)
  
  instance.setOption({
    color: ['#80FFA5', '#00DDFF', '#37A2FF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let result = params[0].axisValue + '<br/>';
        let total = 0;
        params.forEach(function(item) {
          result += item.marker + ' ' + item.seriesName + ': ' + item.value + '万吨<br/>';
          total += item.value;
        });
        result += '<b>总量: ' + total + '万吨</b>';
        return result;
      }
    },
    legend: {
      data: ['氮氧化物', '二氧化硫', '颗粒物'],
      itemWidth: 12,
      itemHeight: 12
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: years,
      axisLine: {
        lineStyle: {
          color: '#3a6187'
        }
      },
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '排放量(万吨)',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3a6187'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(58, 97, 135, 0.3)'
        }
      }
    },
    series: [
      {
        name: '氮氧化物',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
          
        },
        emphasis: {
          focus: 'series'
        },
        data: noxData
      },
      {
        name: '二氧化硫',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: so2Data
      },
      {
        name: '颗粒物',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: pmData
      }
    ]
  });
  
  // 响应式调整
  window.addEventListener('resize', function() {
    instance.resize();
  });
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
  height: 500px;
}

.chart-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.city-selector {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.city-selector select {
  flex: 1;
  min-width: 120px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(64, 158, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: #3a6187;
  cursor: pointer;
}

.city-selector select:focus {
  outline: none;
  border-color: #4facfe;
}

.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.chart-city-container {
  background-color: rgba(116, 198, 157, 0.1);
  border-radius: 8px;
  padding: 10px;
  position: relative;
  overflow: hidden;
  width: 60%;
}

.chart-city-container::before {
  content: "I.";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.chart-city-container h3 {
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  color: #52b788;
}

.chart-container {
  flex: 1;
  background-color: rgba(116, 198, 157, 0.1);
  border-radius: 8px;
  padding: 10px;
  position: relative;
  overflow: hidden;
  margin-top: 0px;
  border: 1px solid rgba(64, 158, 255, 0.1);
  min-height: 240px;
}

.chart-container::before {
  content: "II.";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.chart-container:nth-of-type(2)::before {
  content: "III.";
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
}

.summary-section {
  margin-top: 25px;
  padding: 20px;
  background: rgba(116, 198, 157, 0.08);
  border-radius: 10px;
  border: 1px solid rgba(64, 158, 255, 0.15);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.summary-section h3 {
  font-size: 18px;
  color: #40916c;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(255, 107, 107, 0.3);
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
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  position: relative;
}

.summary-point:nth-of-type(1)::before {
  content: "II";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:nth-of-type(2)::before {
  content: "III";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:nth-of-type(3)::before {
  content: "III";
  position: absolute;
  top: 10px;
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
  color: #40916c;
  font-weight: 600;
  background: rgba(64, 145, 108, 0.1);
  padding: 0 4px;
  border-radius: 3px;
}

.highlight-down {
  color: #40916c;
  font-weight: 600;
}

.highlight-up {
  color: #e63946;
  font-weight: 600;
}
</style>
