<!-- Energy.vue -->
<template>
  <div class="section">
    <h2 class="section-title">能源⚡️</h2>
      <div class="chart-row">
        <div class="chart-container">
          <h3>2010-2022年发电量变化趋势</h3>
          <div class="chart" ref="barChart"></div>
        </div>
        <div class="chart-container">
          <div class="chart-header">
            <div class="chart-title">
              <h3>电力消费结构占比</h3>
            </div>
            <select v-model="selectedYear" @change="updatePieChart">
              <option v-for="year in years" :value="year">{{year}}年</option>
            </select>
          </div>
          <div class="chart" ref="pieChart"></div>
        </div>
      </div>

  </div>

  <div class="summary-section">
    <h3 class="summary-title">核心数据分析</h3>
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-content">
          <h4>发电总量增长</h4>
          <p>2010-2022年间，中国发电总量从<span class="highlight">41,724亿千瓦时</span>增长至<span class="highlight">84,215亿千瓦时</span>，增幅达<span class="highlight">101.8%</span>，年均增长约6.1%。</p>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="summary-content">
          <h4>清洁能源发展</h4>
          <p>清洁能源(水电+核电+风电)占比从<span class="highlight">20.1%</span>提升至<span class="highlight">30.1%</span>，火电占比从<span class="highlight">79.9%</span>下降至<span class="highlight">69.9%</span>。</p>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="summary-content">
          <h4>工业用电占比下降</h4>
    <p>工业用电占比从2015年<span class="highlight">63.35%</span>降至2023年<span class="highlight">55.9%</span>，反映经济结构转型升级。</p>
        </div>
      </div>
      
      <div class="summary-card">
        <div class="summary-content">
          <h4>用电量增长趋势</h4>
          <p>2023年全社会用电量达<span class="highlight">94,393亿千瓦时</span>，较2015年增长<span class="highlight">62.7%</span>，年均增长约6.3%。</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const barChart = ref(null)
const pieChart = ref(null)
let chartInstances = []

const consumptionData = {
  years: ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  total: [94393.2, 88358.0, 85200.1, 77620.2, 74866.1, 71508.2, 65914.0, 61205.1, 58020.0],
  agriculture: [1944.1, 1757.0, 1596.5, 1422.1, 1336.2, 1242.5, 1175.1, 1091.9, 1039.8],
  industry: [60630.0, 57412.0, 56622.3, 52353.4, 50698.3, 49094.9, 46052.8, 42996.9, 41550.0],
  construction: [1053.2, 1091.0, 1132.9, 1011.1, 991.2, 887.8, 789.2, 725.6, 698.7],
  transportation: [2330.8, 2041.0, 1993.0, 1751.0, 1752.3, 1608.5, 1418.0, 1251.5, 1125.6],
  commerce: [4744.0, 4043.0, 3869.6, 3169.0, 3187.1, 2900.4, 2526.6, 2323.8, 2122.0],
  others: [9621.5, 8077.0, 7706.8, 6517.0, 6263.8, 5716.5, 4880.6, 4394.8, 3918.6],
  residential: [14069.6, 13936.0, 12278.9, 11396.5, 10637.2, 10057.6, 9071.6, 8420.6, 7565.2],
  loss: [3063.8,	3063.0,	3256.1,	3233.5,	3330.1,	3351.7,	3195.8,	3062.9,	2987.9]
}

const years = consumptionData.years
const selectedYear = ref(years[0]) 

onMounted(() => {
  initBarChart()
  initPieChart()
})

onBeforeUnmount(() => {
  chartInstances.forEach(instance => instance.dispose())
  chartInstances = []
})

const initBarChart = () => {
  const instance = echarts.init(barChart.value)
  chartInstances.push(instance)
  
  // 计算数据
  const years = ['2010','2012','2014','2016','2018','2020','2022'];
  const hydroData = [7221, 8721, 10728, 12317, 13044, 13552, 13522];
  const thermalData = [33319, 38928, 44001, 50963, 52201, 53302, 58888];
  const nuclearData = [738, 973, 1325, 2943, 3483, 3662, 4178];
  const windData = [446, 959, 1599, 3659, 4060, 4664, 7627];
  
  // 计算发电总量（水电+火电+核电+风电）
  const totalPower = years.map((_, i) => 
    hydroData[i] + thermalData[i] + nuclearData[i] + windData[i]
  );
  
  // 计算火力发电占比（百分比）
  const thermalPercent = years.map((_, i) => 
    (thermalData[i] / totalPower[i] * 100).toFixed(1)
  );
  
  // 计算清洁能源（水电+核电+风电）占比（百分比）
  const cleanEnergyPercent = years.map((_, i) => 
    ((hydroData[i] + nuclearData[i] + windData[i]) / totalPower[i] * 100).toFixed(1)
  );

  instance.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const total = totalPower[params[0].dataIndex];
        const thermalP = thermalPercent[params[0].dataIndex];
        const cleanP = cleanEnergyPercent[params[0].dataIndex];
        return `
          年份: ${params[0].name}<br/>
          发电总量: ${total} 亿千瓦时<br/>
          火力占比: ${thermalP}%<br/>
          清洁能源占比: ${cleanP}%
        `;
      }
    },
    legend: { 
      data: ['发电总量', '火力发电占比', '清洁能源占比'], 
      textStyle: { color: '#3a6187' }, 
    },
    grid: { left: '3%', right: '12%', bottom: '13%', top: '15%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: years,
      axisLine: { lineStyle: { color: '#3a6187' } }
    },
    yAxis: [
      // 左侧Y轴（发电总量）
      { 
        type: 'value', 
        name: '发电总量 (亿千瓦时)',
        position: 'left',
        axisLine: { 
          show: true, 
          lineStyle: { color: '#3a6187' } 
        },
        splitLine: { 
          lineStyle: { color: 'rgba(58, 97, 135, 0.3)' } 
        }
      },
      // 右侧Y轴（百分比）
      { 
        type: 'value', 
        name: '占比 (%)',
        position: 'right',
        min: 0,
        max: 100,
        axisLine: { 
          show: true, 
          lineStyle: { color: '#3a6187' } 
        },
        axisLabel: {
          formatter: '{value}%'
        },
        splitLine: { show: false }
      }
    ],
    series: [
      // 发电总量折线
      {
        name: '发电总量',
        type: 'line',
        yAxisIndex: 0, 
        data: totalPower,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 4 },
        itemStyle: { color: '#00c6ff' }
      },
      // 火力发电占比折线
      {
        name: '火力发电占比',
        type: 'line',
        yAxisIndex: 1,  
        data: thermalPercent,
        symbol: 'triangle',
        symbolSize: 10,
        lineStyle: { 
          width: 3,
          type: 'dashed'
        },
        itemStyle: { color: '#ff6b6b' }
      },
      // 清洁能源占比折线
      {
        name: '清洁能源占比',
        type: 'line',
        yAxisIndex: 1,  
        data: cleanEnergyPercent,
        symbol: 'rect',
        symbolSize: 10,
        lineStyle: { 
          width: 3,
          type: 'dotted'
        },
        itemStyle: { color: '#5fcf87' }
      }
    ]
  })
}

const initPieChart = () => {
  const instance = echarts.init(pieChart.value)
  chartInstances.push(instance)
  updatePieChartData(instance, selectedYear.value)
}

const updatePieChart = () => {
  const instance = chartInstances.find(i => i._dom === pieChart.value)
  if (instance) {
    updatePieChartData(instance, selectedYear.value)
  }
}

const updatePieChartData = (instance, year) => {
  const index = consumptionData.years.indexOf(year)
  
  const data = [
    { 
      value: consumptionData.agriculture[index], 
      name: '农、林、牧、渔业', 
      itemStyle: { color: '#2ecc71' } 
    },
    { 
      value: consumptionData.industry[index], 
      name: '工业', 
      itemStyle: { color: '#e74c3c' } 
    },
    { 
      value: consumptionData.construction[index], 
      name: '建筑业', 
      itemStyle: { color: '#f1c40f' } 
    },
    { 
      value: consumptionData.transportation[index], 
      name: '交通运输、仓储和邮政业', 
      itemStyle: { color: '#3498db' } 
    },
    { 
      value: consumptionData.commerce[index], 
      name: '批发和零售业、住宿和餐饮业', 
      itemStyle: { color: '#9b59b6' } 
    },
    { 
      value: consumptionData.others[index], 
      name: '其他行业', 
      itemStyle: { color: '#1abc9c' } 
    },
    { 
      value: consumptionData.residential[index], 
      name: '居民生活', 
      itemStyle: { color: '#d35400' } 
    },
    { 
      value: consumptionData.residential[index], 
      name: '输配电损失量', 
      itemStyle: { color: '#ef476f' } 
    }
  ]
  
  instance.setOption({
    title: {
      text: `${year}年电力消费总量: ${consumptionData.total[index]}亿千瓦时`,
      left: 'center',
      top: 'bottom',
      textStyle: {
        fontSize: 14,
        color: '#3a6187'
      }
    },
    tooltip: { 
      trigger: 'item',
      formatter: '{b}: {c}亿千瓦时 ({d}%)'
    },
    legend: { 
      orient: 'vertical', 
      right: 10, 
      top: 'center', 
      textStyle: { color: '#3a6187' } 
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 8, borderColor: '#0a1a2f', borderWidth: 3 },
      label: { 
        color: '#3a6187',
        formatter: '{b}: {d}%'
      },
      emphasis: { 
        itemStyle: { 
          shadowBlur: 10, 
          shadowOffsetX: 0, 
          shadowColor: 'rgba(0, 0, 0, 0.5)' 
        } 
      },
      data: data
    }]
  })
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

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.chart-title {
  flex: 1;
  text-align: center;
}

.chart-title h3 {
  margin: 0;
  font-size: 16px;
  color: #52b788;
}

.chart {
  width: 100%;
  height: 100%;
}

.chart-header h3 {
  margin: 0;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid rgba(64, 158, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: #3a6187;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #4facfe;
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.summary-section {
  margin-top: 20px;
  background: rgba(216, 243, 220, 0.5);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(64, 158, 255, 0.1);
}

.summary-section h3:before {
  content: "🔍";
  margin-right: 8px;
}

.summary-title {
  font-size: 18px;
  color: #40916c;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(64, 158, 255, 0.2);
  display: flex;
  align-items: center;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  transition: transform 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;

}

.summary-card:nth-of-type(1)::before {
  content: "I";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-card:nth-of-type(2)::before {
  content: "I";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-card:nth-of-type(3)::before {
  content: "II";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-card:nth-of-type(4)::before {
  content: "II";
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  color: #3a6187;
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.summary-content h4 {
  margin: 0 0 8px 0;
  color: #2d6a4f;
  font-weight: 500;
  font-size: 20px;
}

.summary-content p {
  margin: 0;
  color: #3a6187;
  font-size: 14px;
  line-height: 1.5;
}

.highlight {
  font-weight: bold;
  color: #2d6a4f;
  background: rgba(82, 183, 136, 0.15);
  padding: 0 4px;
  border-radius: 3px;
}
</style>