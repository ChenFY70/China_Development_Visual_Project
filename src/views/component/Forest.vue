<!-- Forest.vue -->
<template>
  <div class="section">
    <h2 class="section-title">森林与绿色空间🌳</h2>
      <div class="chart-row">
        <div class="chart-container">
          <h3>森林覆盖率变化（近年）</h3>
          <div class="chart" ref="forestChangeChart"></div>
        </div>
        <div class="chart-container">
          <h3>森林面积增长趋势</h3>
          <div class="chart" ref="urbanGreenChart"></div>
        </div>
      </div>
  </div>
  <div class="summary-section">
      <h3>森林资源核心分析</h3>
      <div class="summary-content">
        <div class="summary-point">
          <div class="point-header">
            <span class="title">覆盖率提升</span>
          </div>
          <p>森林覆盖率：<br>
          • 2008年：<span class="highlight">20.4%</span><br>
          • 2018年：<span class="highlight">23.0%</span><br>
          • 2023年：<span class="highlight">24.8%</span><br>
          提前实现<span class="highlight">"2025年24.1%"</span>目标</p>
        </div>

        <div class="summary-point">
          <div class="point-header">
            <span class="title">持续稳定增长</span>
          </div>
          <p>每个统计周期均实现增长：<br>
          • 2008→2013年：<span class="highlight">+6.1%</span>（1.95→2.07亿公顷）<br>
          • 2013→2018年：<span class="highlight">+6.1%</span>（2.07→2.20亿公顷）<br>
          • 预计2023年数据将延续增长趋势</p>
        </div>
        
        
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const forestChangeChart = ref(null)
const urbanGreenChart = ref(null)
let chartInstances = []

onMounted(() => {
  initForestChangeChart()
  initUrbanGreenChart()
})

onBeforeUnmount(() => {
  chartInstances.forEach(instance => instance.dispose())
  chartInstances = []
})

const initForestChangeChart = () => {
  const instance = echarts.init(forestChangeChart.value)
  chartInstances.push(instance)
  instance.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '15%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: ['2008','2013','2018','2023'],
      axisLine: { lineStyle: { color: '#3a6187' } }
    },
    yAxis: { 
      type: 'value', 
      name: '百分比 (%)',
      axisLine: { show: true, lineStyle: { color: '#3a6187' } },
      splitLine: { lineStyle: { color: 'rgba(58, 97, 135, 0.3)' } },
      min: 15,
      max: 25
    },
    series: [{
      name: '覆盖率',
      type: 'line',
      smooth: true,
      data: [20.4, 21.6, 23, 23, 24.8],
      lineStyle: { width: 3, color: '#27ae60' },
      itemStyle: { color: '#27ae60' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(39, 174, 96, 0.3)' },
          { offset: 1, color: 'rgba(39, 174, 96, 0.05)' }
        ])
      },
      symbolSize: 8
    }]
  })
}

const initUrbanGreenChart = () => {
  const instance = echarts.init(urbanGreenChart.value);
  chartInstances.push(instance);
  
  // 准备数据
  const years = ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023'];
  
  // 森林面积数据（万公顷）
  const forestData = [
    19545.22, 19545.22, 19545.22, 19545.22, // 2005-2008
    20768.73, 20768.73, 20768.73, 20768.73, // 2009-2012
    22044.62, 22044.62, 22044.62, 22044.62, // 2013-2016
    22044.62, 22044.62, 22044.62, 22044.62, // 2017-2020
    22044.62, 22044.62, 22044.62            // 2021-2023
  ];
  
  // 人工林面积数据（万公顷）
  const manMadeData = [
    6168.84, 6168.84, 6168.84, 6168.84,    // 2005-2008
    6933.38, 6933.38, 6933.38, 6933.38,    // 2009-2012
    8003.1, 8003.1, 8003.1, 8003.1,        // 2013-2016
    8003.1, 8003.1, 8003.1, 8003.1,        // 2017-2020
    8003.1, 8003.1, 8003.1                 // 2021-2023
  ];

  instance.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        return `${params[0].name}<br/>
                ${params[0].marker} ${params[0].seriesName}: ${params[0].value} 万公顷<br/>
                ${params[1].marker} ${params[1].seriesName}: ${params[1].value} 万公顷`;
      }
    },
    grid: {
      left: '3%',
      right: '7%',  
      bottom: '15%', 
      top: '15%',
      containLabel: true
    },
    legend: {
      data: ['森林面积', '人工林面积'],
      textStyle: { color: '#3a6187' },
      top: 'top'
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: {
        rotate: 45,
        interval: 0,
        color: '#3a6187'
      },
      axisLine: { lineStyle: { color: '#3a6187' } }
    },
    yAxis: {
      type: 'value',
      name: '万公顷',
      nameTextStyle: { color: '#3a6187' },
      axisLabel: { color: '#3a6187' },
      axisLine: { show: true, lineStyle: { color: '#3a6187' } },
      splitLine: { lineStyle: { color: 'rgba(58, 97, 135, 0.3)' } }
    },
    series: [
      {
        name: '森林面积',
        type: 'line',
        step: 'start',
        data: forestData,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#1abc9c' }
      },
      {
        name: '人工林面积',
        type: 'line',
        step: 'start',
        data: manMadeData,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        itemStyle: { color: '#3498db' }
      }
    ]
  });
}

</script>

<style scoped>
.section {
  background: rgba(255, 255, 204, 0.2);
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
}

.chart-container {
  flex: 1;
  background: rgba(216, 243, 220, 0.5);
  border-radius: 8px;
  padding: 10px;
  min-height: 250px;
  position: relative;
  overflow: hidden;
  margin-top: 0px;
  border: 1px solid rgba(64, 158, 255, 0.1);
}

.chart-container::before {
  content: "I.";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.chart-container:nth-of-type(2)::before {
  content: "II.";
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
  background: rgba(216, 243, 220, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(46, 125, 50, 0.2);
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.1);
}

.summary-section h3 {
  font-size: 18px;
  color: #2d6a4f;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(46, 125, 50, 0.3);
  display: flex;
  align-items: center;
}

.summary-section h3:before {
  content: "🔍";
  margin-right: 8px;
  color: #2d6a4f;
}

.summary-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.summary-point {
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.summary-point:nth-of-type(1)::before {
  content: "I";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:nth-of-type(2)::before {
  content: "II";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-point:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(82, 183, 136, 0.15);
}

.point-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.point-header .title {
  margin: 0 0 8px 0;
  font-weight: 500;
  color: #2d6a4f;
  font-size: 20px;
}

.summary-point p {
  color: #333;
  line-height: 1.7;
  font-size: 14px;
  margin: 0;
}

.highlight {
  color: #2d6a4f;
  font-weight: 600;
  background: rgba(82, 183, 136, 0.15);
  padding: 0 4px;
  border-radius: 3px;
}

.highlight-warning {
  color: #e67e22;
  font-weight: 600;
  background: rgba(230, 126, 34, 0.1);
  padding: 0 4px;
  border-radius: 3px;
}
</style>