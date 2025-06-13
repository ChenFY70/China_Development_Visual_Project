<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">医疗</h1>
    </div>
    
    <div class="content-container">
      <!-- 医疗资源分布视图 -->
      <div class="content-section distribution-section">
        <h3 class="section-title">当前省市医疗资源分布(2024年)</h3>
        
        <!-- 分布图指标选择器 -->
        <div class="metric-selector">                          
          <button 
            v-for="metric in metrics" 
            :key="metric.value"
            @click="selectedDistributionMetric = metric.value"
            :class="{ active: selectedDistributionMetric === metric.value }"
          >
            {{ metric.label }}
          </button>
        </div>
        
        <!-- 柱状图 -->
        <div ref="barChartRef" class="chart-container" style="height: 400px;"></div>
        
        <!-- 数据卡片 -->
        <div class="data-grid">
          <div class="data-card">
            <h4>资源最丰富省市</h4>
            <p style="font-size: 1rem; color: #27ae60;">{{ topProvince.name }} ({{ formatNumber(topProvince.value) }} {{ distributionMetricUnit }})</p>
          </div>
          <div class="data-card">
            <h4>资源最紧缺省市</h4>
            <p style="font-size: 1rem; color: #e74c3c;">{{ bottomProvince.name }} ({{ formatNumber(bottomProvince.value) }} {{ distributionMetricUnit }})</p>
          </div>
        </div>
      </div>
      
      <!-- 医疗资源时序趋势视图 -->
      <div class="content-section trend-section">
        <h3 class="section-title">近10年医疗资源变化趋势（2015-2023年）</h3>
        
        <!-- 双列布局容器 -->
        <div class="trend-columns">
          <!-- 左侧：全国/顶部/底部趋势图 -->
          <div class="trend-left">
            <div class="trend-header">
              <h3 class="sub-section-title">全国及重点省市趋势</h3>
              
              <!-- 全国趋势指标选择器 -->
              <div class="metric-selector small">                          
                <button 
                  v-for="metric in metrics" 
                  :key="metric.value"
                  @click="selectedNationalMetric = metric.value"
                  :class="{ active: selectedNationalMetric === metric.value }"
                >
                  {{ metric.label }}
                </button>
              </div>
            </div>
            
            <div class="trend-controls">
              <div class="region-selector">
                <select v-model="selectedRegion">
                  <option value="national">全国平均</option>
                  <option value="top">资源最丰富省市</option>
                  <option value="bottom">资源最紧缺省市</option>
                </select>
              </div>
              
              <!-- 左侧独立按钮组 -->
              <div class="display-toggle">
                <button 
                  @click="setDisplayTypeNational('absolute')"
                  :class="{ active: displayTypeNational === 'absolute' }"
                >
                  显示总量
                </button>
                <button 
                  @click="setDisplayTypeNational('growth')"
                  :class="{ active: displayTypeNational === 'growth' }"
                >
                  显示增长率
                </button>
              </div>
            </div>
            
            <!-- 左侧时序图 -->
            <div ref="trendChartRef" class="chart-container" style="height: 300px;"></div>
            
            <!-- 趋势分析 -->
            <div class="trend-info">
              <h4>趋势分析</h4>
              <p v-if="selectedRegion === 'national'">
                全国{{ nationalMetricLabel }}在过去十年呈现{{ nationalTrendDescription }}趋势，
                {{ displayTypeNational === 'growth' ? '年均增长率' : '总量' }}从{{ trendStartValue }}到{{ trendEndValue }}。
              </p>
              <p v-else-if="selectedRegion === 'top'">
                {{ topProvince.name }}的{{ nationalMetricLabel }}在过去十年{{ topRegionTrendDescription }}，
                {{ displayTypeNational === 'growth' ? '年均增长率' : '总量' }}从{{ trendStartValue }}到{{ trendEndValue }}。
              </p>
              <p v-else>
                {{ bottomProvince.name }}的{{ nationalMetricLabel }}在过去十年{{ bottomRegionTrendDescription }}，
                {{ displayTypeNational === 'growth' ? '年均增长率' : '总量' }}从{{ trendStartValue }}到{{ trendEndValue }}。
              </p>
            </div>
          </div>
          
          <!-- 右侧：新增省份趋势图 -->
          <div class="trend-right">
            <div class="trend-header">
              <h3 class="sub-section-title">具体省份趋势分析</h3>
              
              <!-- 省份趋势指标选择器 -->
              <div class="metric-selector small">                          
                <button 
                  v-for="metric in metrics" 
                  :key="metric.value"
                  @click="selectedProvinceMetric = metric.value"
                  :class="{ active: selectedProvinceMetric === metric.value }"
                >
                  {{ metric.label }}
                </button>
              </div>
            </div>
            
            <!-- 省份选择器和显示切换 -->
            <div class="province-controls">
              <div class="province-selector">
                <select v-model="selectedProvince">
                  <option v-for="province in provinceNames" :key="province" :value="province">
                    {{ province }}
                  </option>
                </select>
              </div>
              
              <!-- 右侧独立按钮组 -->
              <div class="display-toggle">
                <button 
                  @click="setDisplayTypeProvince('absolute')"
                  :class="{ active: displayTypeProvince === 'absolute' }"
                >
                  显示总量
                </button>
                <button 
                  @click="setDisplayTypeProvince('growth')"
                  :class="{ active: displayTypeProvince === 'growth' }"
                >
                  显示增长率
                </button>
              </div>
            </div>
            
            <!-- 省份趋势图 -->
            <div ref="provinceChartRef" class="chart-container" style="height: 300px;"></div>
            
            <!-- 省份趋势分析 -->
            <div class="trend-info province-info">
              <h4>{{ selectedProvince }}趋势分析</h4>
              <p>
                {{ selectedProvince }}的{{ provinceMetricLabel }}在过去十年{{ provinceTrendDescription }}，
                {{ displayTypeProvince === 'growth' ? '年均增长率' : '总量' }}从{{ provinceStartValue }}到{{ provinceEndValue }}。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

// 图表引用
const barChartRef = ref(null)
const trendChartRef = ref(null)
const provinceChartRef = ref(null)
let barChart = null
let trendChart = null
let provinceChart = null

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (barChart) barChart.dispose()
  if (trendChart) trendChart.dispose()
  if (provinceChart) provinceChart.dispose()
  window.removeEventListener('resize', handleResize)
})

const initCharts = () => {
  nextTick(() => {
    if (barChartRef.value) {
      barChart = echarts.init(barChartRef.value)
      updateBarChart()
    }
    if (trendChartRef.value) {
      trendChart = echarts.init(trendChartRef.value)
      updateTrendChart()
    }
    if (provinceChartRef.value) {
      provinceChart = echarts.init(provinceChartRef.value)
      updateProvinceChart()
    }
  })
}

const handleResize = () => {
  if (barChart) barChart.resize()
  if (trendChart) trendChart.resize()
  if (provinceChart) provinceChart.resize()
}

// 指标数据
const metrics = ref([
  { label: '卫生人员数', value: 'doctors', unit: '万人' },
  { label: '床位数', value: 'beds', unit: '万张' },
  { label: '医疗机构数', value: 'institutions', unit: '所' }
])

// 三个独立的指标选择器
const selectedDistributionMetric = ref('doctors') // 分布图指标
const selectedNationalMetric = ref('doctors')     // 全国趋势图指标
const selectedProvinceMetric = ref('doctors')     // 省份趋势图指标

// 解析CSV数据
const parseCsvData = (csvContent, isInstitutions = false) => {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',').slice(1) // 获取年份头
  const years = headers.map(year => parseInt(year.replace('爛', '')))
  
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const parts = line.split(',')
    const region = parts[0]
    const values = parts.slice(1).map(value => {
      // 机构数据需要转换为整数，其他转换为浮点数
      return isInstitutions ? parseInt(value) : parseFloat(value)
    })
    
    // 将数据按年份存储
    const regionData = {}
    years.forEach((year, index) => {
      regionData[year] = values[index]
    })
    
    data.push({
      region,
      data: regionData
    })
  }
  
  return data
}

// 原始CSV数据
const bedsCsv = `華⑹,2023爛,2022爛,2021爛,2020爛,2019爛,2018爛,2017爛,2016爛,2015爛
控儔,13.88,13.39,13.03,12.7,12.78,12.36,12.06,11.7,11.16
毞踩,7.25,6.85,6.87,6.83,6.83,6.82,6.84,6.58,6.37
碩控,53.4,48.57,45.5,44.2,43.01,42.19,39.5,36.05,34.21
刓昹,23.23,22.84,22.89,22.37,21.84,20.83,19.75,18.97,18.32
囀蟹嘉,17.31,16.77,16.66,16.21,16.11,15.9,15.03,13.92,13.39
賽譴,33.42,32.62,32.45,31.45,31.38,31.44,29.86,28.44,26.7
憚輿,18.37,17.72,17.65,17.31,17.03,16.7,15.37,15.12,14.45
窪韓蔬,27.33,26.13,26.05,25.33,26.26,25.01,24.17,22.01,21.26
奻漆,17.5,16.53,16.04,15.22,14.65,13.9,13.46,12.92,12.28
蔬劼,57.88,56.3,54.86,53.5,51.6,49.15,46.92,44.31,41.36
涳蔬,40.61,38.17,36.99,36.13,35.02,33.21,31.35,28.99,27.25
假閣,45.35,44.4,41.1,40.78,34.74,32.81,30.57,28.17,26.74
腦膘,24.21,23.24,22.38,21.68,20.22,19.25,18.24,17.48,17.3
蔬昹,34.07,31.45,30.73,28.58,26.71,24.95,23.4,20.91,19.78
刓陲,73.86,69.36,67.39,64.69,62.97,60.85,58.48,54.1,51.94
碩鰍,77.74,75.22,72.13,66.72,64.01,60.85,55.9,52.15,48.96
綬控,47.61,45.03,43.4,41.14,40.33,39.35,37.62,36.06,34.31
綬鰍,53.39,54.45,53.27,51.99,50.63,48.24,45.23,42.58,39.7
嫘陲,62.86,60.83,58.9,56.48,54.52,51.69,49.21,46.51,43.57
嫘昹,36.2,34.17,31.9,29.56,27.74,25.59,24.11,22.45,21.45
漆鰍,6.09,6.12,6.14,5.85,4.98,4.48,4.2,4.03,3.87
笭④,25.56,25.08,24.07,23.55,23.18,22.01,20.64,19.09,17.65
侐捶,70.86,68.39,66.2,64.98,63.18,59.89,56.35,51.92,48.88
幛笣,31.54,30.97,29.69,27.64,26.5,24.56,23.3,21.03,19.64
堁鰍,35.99,34.12,33.03,32.52,31.19,29.12,27.48,25.36,23.76
昹紲,2.16,2,1.97,1.86,1.71,1.68,1.61,1.45,1.4
匟昹,30.62,28.96,28.45,27.24,26.58,25.37,24.13,22.54,21.19
裘咈,20.4,18.89,18.32,17.19,18.12,16.27,14.66,13.43,12.77
ч漆,4.57,4.29,4.22,4.13,4.14,3.91,3.83,3.47,3.45
譴狦,4.35,4.18,4.12,4.13,4.1,4.1,3.98,3.63,3.38
陔蔭,19.75,17.96,18.61,18.15,18.64,17.89,16.76,15.69,15.03`

const institutionsCsv = `華⑹,2023爛,2022爛,2021爛,2020爛,2019爛,2018爛,2017爛,2016爛,2015爛
控儔,11487,10897,10699,10599,10336,10058,9976,9773,9771
毞踩,6799,6282,6076,5838,5962,5686,5539,5443,5223
碩控,92825,90194,88162,86939,84651,85088,80912,78795,78594
刓昹,37849,39661,41007,41140,42162,42079,42490,42204,41002
囀蟹嘉,25685,25062,24948,24549,24564,24610,24218,24002,23886
賽譴,34137,32679,33051,34131,34238,36029,35767,36131,35236
憚輿,26161,25031,25344,25616,22198,22691,20828,20829,20612
窪韓蔬,21417,20599,20578,20461,20375,20349,20283,20375,20752
奻漆,6514,6404,6308,5897,5597,5293,5144,5016,5016
蔬劼,39536,37001,36448,35747,34796,33254,32037,32117,31925
涳蔬,37679,35967,35120,34400,34119,32754,31979,31546,31137
假閣,31361,30176,29554,29391,26435,24925,24491,24385,24853
腦膘,30023,29116,28693,28105,27788,27590,27217,27656,27921
蔬昹,40129,35683,36764,36716,37029,36545,37791,38272,38557
刓陲,88186,86026,85715,84872,83616,81470,79050,76997,77259
碩鰍,85044,81694,78536,74644,70734,71351,71089,71271,71394
綬控,38586,36782,36529,35447,35515,36486,36357,36354,36179
綬鰍,57503,55338,55677,56042,57230,56239,58624,61055,62646
嫘陲,62819,59531,57964,55900,53900,51451,49874,49079,48320
嫘昹,34888,34500,34112,33875,33679,33742,34008,34253,34439
漆鰍,6538,6384,6277,6127,5417,5325,5180,5144,5046
笭④,23389,22259,21361,20922,21057,20524,19682,19933,19806
侐捶,74975,74041,80249,82793,83756,81537,80481,79513,80109
幛笣,30695,29150,29292,28880,28511,28066,28034,28017,28712
堁鰍,28765,27528,26885,26626,25587,24954,24684,24234,24181
昹紲,7058,6906,6907,6939,6940,6844,6826,6835,6814
匟昹,35133,34779,34971,34983,35404,35300,35861,36598,37030
裘咈,25375,25266,25759,26204,26697,27897,28857,28197,27799
ч漆,6950,6376,6408,6407,6513,6396,6375,6291,6223
譴狦,4863,4607,4571,4574,4397,4450,4271,4254,4288
陔蔭,18416,16999,16970,18158,18376,18450,18724,18825,18798`

const doctorsCsv = `華⑹,2023爛,2022爛,2021爛,2020爛,2019爛,2018爛,2017爛,2016爛,2015爛
控儔,38.9,36.86,36.1,34.81,34.32,32.61,31.52,29.95,28.92
毞踩,16.54,15.5,15.25,14.32,13.92,13.25,12.96,12.26,11.81
碩控,79.07,73.29,71.03,67.5,64.72,62.4,59.06,55.51,53.33
刓昹,37.48,36.44,36.29,35.14,34.17,33.09,31.9,31.13,29.49
囀蟹嘉,28.41,26.78,26.17,25.48,24.93,24.14,23.31,22.11,21.25
賽譴,44.26,42.55,41.77,40.15,39.67,39.19,38.09,36.57,34.85
憚輿,29.42,27.88,27.67,27.29,24.64,24.2,22.43,22.33,21.42
窪韓蔬,33.57,32.09,31.49,31.04,30.56,29.96,30.03,29.23,28.59
奻漆,29.77,28.84,28.1,26.14,24.87,23.82,22.78,21.71,20.84
蔬劼,91.1,87.53,85.34,82.33,78.63,73.93,69.25,65.41,61.89
涳蔬,78.58,73.17,69.48,65.98,62.8,58.94,55.57,52.36,49.1
假閣,59.02,55.34,51.94,50.32,45.46,42.7,40.75,38.82,37.74
腦膘,39.71,37.96,36.61,35.1,33.43,31.85,30.06,28.82,28.13
蔬昹,43.91,39.08,38.17,36.78,34.83,32.58,31.78,30.17,29.16
刓陲,113.59,107.88,105.57,102.79,100.06,96.14,91.79,87.41,85.57
碩鰍,106.98,101.56,96.96,94.05,88.78,86.32,82.76,79.65,77.11
綬控,60.22,57.7,56.41,53.8,52.63,52.19,51,49.41,47.57
綬鰍,68.3,63.2,61.98,61.45,61.83,55.78,53.67,51.55,49.42
嫘陲,116.91,110.96,105.87,100.62,96.19,91.84,86.41,81.91,76.85
嫘昹,53.61,51.71,49.32,47.22,44.04,42.04,40.48,39.06,37.48
漆鰍,10.61,10.23,9.96,9.41,8.59,8.14,7.74,7.46,7.13
笭④,33.47,31.59,30.85,30.16,28.8,27.28,25.59,24.28,22.71
侐捶,92.61,88.75,86.54,82.45,79.34,74.63,70.99,67.04,64.65
幛笣,43.05,39.83,38.41,36.69,34.71,32.34,30.19,27.74,25.91
堁鰍,51.27,48.63,47,45.89,42.93,38.98,36.92,32.98,30.46
昹紲,4.63,4.22,4.23,4.1,3.88,3.68,3.34,2.92,2.91
匟昹,47.1,45.59,44.59,44.53,43.56,41.09,39.38,37.26,34.99
裘咈,26.84,25.4,24.77,22.9,22.85,20.7,19.92,18.68,18.14
ч漆,7.27,6.7,6.68,6.43,6.2,5.94,5.61,4.97,4.84
譴狦,7.81,7.43,7.31,7.2,6.86,6.58,6.2,5.62,5.26
陔蔭,29.73,26.42,25.67,24.45,23.64,22.71,22.44,22,20.85`

// 解析CSV数据
const bedsData = parseCsvData(bedsCsv)
const institutionsData = parseCsvData(institutionsCsv, true)
const doctorsData = parseCsvData(doctorsCsv)

// 省份名称映射（繁体到简体）
const provinceMap = {
  '控儔': '北京',
  '毞踩': '天津',
  '碩控': '河北',
  '刓昹': '山西',
  '囀蟹嘉': '内蒙古',
  '賽譴': '辽宁',
  '憚輿': '吉林',
  '窪韓蔬': '黑龙江',
  '奻漆': '上海',
  '蔬劼': '江苏',
  '涳蔬': '浙江',
  '假閣': '安徽',
  '腦膘': '福建',
  '蔬昹': '江西',
  '刓陲': '山东',
  '碩鰍': '河南',
  '綬控': '湖北',
  '綬鰍': '湖南',
  '嫘陲': '广东',
  '嫘昹': '广西',
  '漆鰍': '海南',
  '笭④': '重庆',
  '侐捶': '四川',
  '幛笣': '贵州',
  '堁鰍': '云南',
  '昹紲': '西藏',
  '匟昹': '陕西',
  '裘咈': '甘肃',
  'ч漆': '青海',
  '譴狦': '宁夏',
  '陔蔭': '新疆'
}

// 从解析的数据中提取真实数据
const rawData = ref([])
const provinceTrends = ref({})
const nationalTrends = ref({})

// 初始化真实数据
const initRealData = () => {
  // 年份范围 (2015-2023)
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  
  // 初始化数据结构
  const tempProvinceTrends = {
    beds: {},
    institutions: {},
    doctors: {}
  }
  
  const tempNationalTrends = {
    beds: Array(9).fill(0),
    institutions: Array(9).fill(0),
    doctors: Array(9).fill(0)
  }
  
  // 省份列表
  const provinces = []
  
  // 处理床位数据
  bedsData.forEach(regionData => {
    const province = provinceMap[regionData.region] || regionData.region
    provinces.push(province)
    tempProvinceTrends.beds[province] = []
    
    years.forEach((year, index) => {
      const value = regionData.data[year]
      tempProvinceTrends.beds[province].push(value)
      tempNationalTrends.beds[index] += value
    })
  })
  
  // 处理机构数据
  institutionsData.forEach((regionData, index) => {
    const province = provinces[index]
    tempProvinceTrends.institutions[province] = []
    
    years.forEach((year, i) => {
      const value = regionData.data[year]
      tempProvinceTrends.institutions[province].push(value)
      tempNationalTrends.institutions[i] += value
    })
  })
  
  // 处理人员数据
  doctorsData.forEach((regionData, index) => {
    const province = provinces[index]
    tempProvinceTrends.doctors[province] = []
    
    years.forEach((year, i) => {
      const value = regionData.data[year]
      tempProvinceTrends.doctors[province].push(value)
      tempNationalTrends.doctors[i] += value
    })
  })
  
  // 计算全国平均值
  const provinceCount = provinces.length
  Object.keys(tempNationalTrends).forEach(metric => {
    tempNationalTrends[metric] = tempNationalTrends[metric].map(
      sum => sum / provinceCount
    )
  })
  
  // 设置最新数据 (2023年)
  rawData.value = provinces.map(province => ({
    region: province,
    institutions: tempProvinceTrends.institutions[province][8],
    doctors: tempProvinceTrends.doctors[province][8],
    beds: tempProvinceTrends.beds[province][8]
  }))
  
  // 设置趋势数据
  provinceTrends.value = tempProvinceTrends
  nationalTrends.value = tempNationalTrends
}

// 初始化真实数据
initRealData()

// 省份数据
const provinceData = ref({
  doctors: rawData.value.map(item => ({ 
    name: item.region, 
    value: item.doctors 
  })),
  beds: rawData.value.map(item => ({ 
    name: item.region, 
    value: item.beds 
  })),
  institutions: rawData.value.map(item => ({ 
    name: item.region, 
    value: item.institutions 
  }))
})

// ========== 分布图部分 ==========
// 分布图计算属性
const distributionMetricLabel = computed(() => 
  metrics.value.find(m => m.value === selectedDistributionMetric.value)?.label || ''
)

const distributionMetricUnit = computed(() => 
  metrics.value.find(m => m.value === selectedDistributionMetric.value)?.unit || ''
)

const currentData = computed(() => 
  [...provinceData.value[selectedDistributionMetric.value]].sort((a, b) => b.value - a.value)
)

const topProvince = computed(() => currentData.value[0])
const bottomProvince = computed(() => currentData.value[currentData.value.length - 1])

// 更新柱状图数据
watch(selectedDistributionMetric, () => {
  updateBarChart()
})

// 数字格式化
const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + '万';
  }
  return num.toLocaleString('zh-CN');
}

const updateBarChart = () => {
  if (!barChart) {
    if (barChartRef.value) {
      barChart = echarts.init(barChartRef.value)
    } else {
      return
    }
  }
  
  const sortedData = [...currentData.value].sort((a, b) => b.value - a.value);
  const provinceNames = sortedData.map(item => item.name);
  const values = sortedData.map(item => item.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const data = params[0];
        return `${data.name}: ${formatNumber(data.value)} ${distributionMetricUnit.value}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: provinceNames,
      axisLabel: {
        interval: 0,
        rotate: 45,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: distributionMetricUnit.value,
      nameTextStyle: {
        padding: [0, 0, 0, 20]
      }
    },
    series: [
      {
        name: distributionMetricLabel.value,
        type: 'bar',
        data: values,
        itemStyle: {
          color: (params) => {
            const value = params.value;
            const max = Math.max(...values);
            const ratio = value / max;
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `rgba(52, 152, 219, ${0.3 + ratio * 0.7})` },
              { offset: 1, color: `rgba(41, 128, 185, ${0.3 + ratio * 0.7})` }
            ]);
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 50,
        height: 20,
        bottom: 5,
        handleSize: 20,
        brushSelect: false
      }
    ]
  };
  
  barChart.setOption(option);
}

// ========== 全国趋势图部分 ==========
// 时序图相关状态
const selectedRegion = ref('national')

// 显示类型控制
const displayTypeNational = ref('absolute') // 控制左侧图

// 设置函数
const setDisplayTypeNational = (type) => {
  displayTypeNational.value = type
}

// 全国趋势图计算属性
const nationalMetricLabel = computed(() => 
  metrics.value.find(m => m.value === selectedNationalMetric.value)?.label || ''
)

const nationalMetricUnit = computed(() => 
  metrics.value.find(m => m.value === selectedNationalMetric.value)?.unit || ''
)

// 趋势数据 (2015-2023)
const trendData = computed(() => {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  const metric = selectedNationalMetric.value
  const topProvinceName = topProvince.value?.name
  const bottomProvinceName = bottomProvince.value?.name
  
  return years.map((year, index) => {
    const national = nationalTrends.value[metric][index]
    const top = topProvinceName ? provinceTrends.value[metric][topProvinceName][index] : 0
    const bottom = bottomProvinceName ? provinceTrends.value[metric][bottomProvinceName][index] : 0
    
    return {
      year,
      national,
      top,
      bottom
    }
  })
})

// 计算趋势相关指标
const trendStartValue = computed(() => {
  const data = trendData.value[0]
  let value
  if (selectedRegion.value === 'national') value = data.national
  else if (selectedRegion.value === 'top') value = data.top
  else value = data.bottom
  
  return displayTypeNational.value === 'growth' ? 
    '基准值' : 
    formatNumber(value) + nationalMetricUnit.value
})

const trendEndValue = computed(() => {
  const data = trendData.value[trendData.value.length - 1]
  let value
  if (selectedRegion.value === 'national') value = data.national
  else if (selectedRegion.value === 'top') value = data.top
  else value = data.bottom
  
  return displayTypeNational.value === 'growth' ? 
    (calculateGrowthRate(trendData.value.map(d => {
      if (selectedRegion.value === 'national') return d.national
      if (selectedRegion.value === 'top') return d.top
      return d.bottom
    })) * 100).toFixed(2) + '%' :
    formatNumber(value) + nationalMetricUnit.value
})

// 计算整体增长率
const calculateGrowthRate = (values) => {
  return (values[values.length - 1] - values[0]) / values[0]
}

// 趋势描述
const nationalTrendDescription = computed(() => {
  const start = trendData.value[0].national
  const end = trendData.value[trendData.value.length - 1].national
  const growth = (end - start) / start
  
  return growth > 0.4 ? '强劲增长' : 
         growth > 0.2 ? '稳定增长' : 
         growth > 0 ? '缓慢增长' : '下降'
})

const topRegionTrendDescription = computed(() => {
  const start = trendData.value[0].top
  const end = trendData.value[trendData.value.length - 1].top
  const growth = (end - start) / start
  
  return growth > 0.3 ? '保持领先优势' : 
         growth > 0.15 ? '稳步提升' : 
         '增长放缓'
})

const bottomRegionTrendDescription = computed(() => {
  const start = trendData.value[0].bottom
  const end = trendData.value[trendData.value.length - 1].bottom
  const growth = (end - start) / start
  
  return growth > 0.5 ? '显著改善' : 
         growth > 0.3 ? '有所提升' : 
         '改善有限'
})

// 更新左侧时序图
const updateTrendChart = () => {
  if (!trendChart) {
    if (trendChartRef.value) {
      trendChart = echarts.init(trendChartRef.value)
    } else {
      return
    }
  }
  
  const years = trendData.value.map(d => d.year)
  let data, series, yAxisName, tooltipFormatter
  
  // 根据显示类型准备数据
  if (displayTypeNational.value === 'growth') {
    // 计算增长率数据
    data = calculateGrowthRates(
      trendData.value.map(d => {
        if (selectedRegion.value === 'national') return d.national
        if (selectedRegion.value === 'top') return d.top
        return d.bottom
      })
    )
    
    yAxisName = '增长率'
    tooltipFormatter = (params) => {
      return `${params[0].name}年: ${(params[0].value * 100).toFixed(2)}%`
    }
  } else {
    // 显示绝对值
    data = trendData.value.map(d => {
      if (selectedRegion.value === 'national') return d.national
      if (selectedRegion.value === 'top') return d.top
      return d.bottom
    })
    
    yAxisName = nationalMetricUnit.value
    tooltipFormatter = (params) => {
      return `${params[0].name}年: ${formatNumber(params[0].value)} ${nationalMetricUnit.value}`
    }
  }
  
  // 设置系列名称
  let seriesName
  if (selectedRegion.value === 'national') seriesName = '全国平均'
  else if (selectedRegion.value === 'top') seriesName = topProvince.value.name
  else seriesName = bottomProvince.value.name
  
  series = [{
    name: seriesName,
    type: 'line',
    data: data,
    smooth: true,
    symbol: 'circle',
    symbolSize: 8,
    lineStyle: {
      width: 3
    },
    itemStyle: {
      color: '#3498db'
    },
    areaStyle: displayTypeNational.value === 'growth' ? null : {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(52, 152, 219, 0.5)' },
        { offset: 1, color: 'rgba(52, 152, 219, 0.1)' }
      ])
    }
  }]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: tooltipFormatter
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      axisLabel: {
        formatter: displayTypeNational.value === 'growth' ? 
          (value) => (value * 100).toFixed(0) + '%' : 
          '{value}'
      }
    },
    series: series
  };
  
  trendChart.setOption(option);
}

// 计算增长率序列
const calculateGrowthRates = (values) => {
  return values.map((val, index) => {
    if (index === 0) return 0
    return (val - values[index - 1]) / values[index - 1]
  })
}

// 当指标或区域选择变化时更新图表
watch([selectedRegion, displayTypeNational, selectedNationalMetric], () => {
  updateTrendChart()
})

// ========== 省份趋势图部分 ==========
// 省份选择状态
const selectedProvince = ref('北京')
const provinceNames = rawData.value.map(item => item.region)

// 省份趋势图计算属性
const provinceMetricLabel = computed(() => 
  metrics.value.find(m => m.value === selectedProvinceMetric.value)?.label || ''
)

const provinceMetricUnit = computed(() => 
  metrics.value.find(m => m.value === selectedProvinceMetric.value)?.unit || ''
)

// 省份趋势数据
const provinceTrendData = computed(() => {
  const metric = selectedProvinceMetric.value
  const province = selectedProvince.value
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  
  if (!provinceTrends.value[metric] || !provinceTrends.value[metric][province]) {
    return []
  }
  
  return years.map((year, index) => ({
    year,
    value: provinceTrends.value[metric][province][index]
  }))
})

// 计算省份趋势相关指标
const provinceStartValue = computed(() => {
  if (provinceTrendData.value.length === 0) return 'N/A'
  const value = provinceTrendData.value[0].value
  return displayTypeProvince.value === 'growth' ? 
    '基准值' : 
    formatNumber(value) + provinceMetricUnit.value
})

const provinceEndValue = computed(() => {
  if (provinceTrendData.value.length === 0) return 'N/A'
  const value = provinceTrendData.value[provinceTrendData.value.length - 1].value
  return displayTypeProvince.value === 'growth' ? 
    (calculateGrowthRate(provinceTrendData.value.map(d => d.value)) * 100).toFixed(2) + '%' :
    formatNumber(value) + provinceMetricUnit.value
})

// 省份趋势描述
const provinceTrendDescription = computed(() => {
  if (provinceTrendData.value.length < 2) return '数据不足'
  
  const start = provinceTrendData.value[0].value
  const end = provinceTrendData.value[provinceTrendData.value.length - 1].value
  const growth = (end - start) / start
  
  return growth > 0.4 ? '呈现强劲增长' : 
         growth > 0.2 ? '稳步提升' : 
         growth > 0 ? '缓慢增长' : 
         '有所下降'
})

// 显示类型控制
const displayTypeProvince = ref('absolute') // 控制右侧图

const setDisplayTypeProvince = (type) => {
  displayTypeProvince.value = type
}

// 更新省份趋势图
const updateProvinceChart = () => {
  if (!provinceChart) {
    if (provinceChartRef.value) {
      provinceChart = echarts.init(provinceChartRef.value)
    } else {
      return
    }
  }
  
  if (provinceTrendData.value.length === 0) return
  
  const years = provinceTrendData.value.map(d => d.year)
  let data, yAxisName, tooltipFormatter
  
  if (displayTypeProvince.value === 'growth') {
    // 计算增长率数据
    data = calculateGrowthRates(provinceTrendData.value.map(d => d.value))
    yAxisName = '增长率'
    tooltipFormatter = (params) => {
      return `${params[0].name}年: ${(params[0].value * 100).toFixed(2)}%`
    }
  } else {
    // 显示绝对值
    data = provinceTrendData.value.map(d => d.value)
    yAxisName = provinceMetricUnit.value
    tooltipFormatter = (params) => {
      return `${params[0].name}年: ${formatNumber(params[0].value)} ${provinceMetricUnit.value}`
    }
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: tooltipFormatter
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      axisLabel: {
        formatter: displayTypeProvince.value === 'growth' ? 
          (value) => (value * 100).toFixed(0) + '%' : 
          '{value}'
      }
    },
    series: [{
      name: selectedProvince.value,
      type: 'line',
      data: data,
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: '#e74c3c'
      },
      itemStyle: {
        color: '#e74c3c'
      },
      areaStyle: displayTypeProvince.value === 'growth' ? null : {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(231, 76, 60, 0.3)' },
          { offset: 1, color: 'rgba(231, 76, 60, 0.1)' }
        ])
      }
    }]
  };
  
  provinceChart.setOption(option);
}

// 监听相关变化
watch([selectedProvince, selectedProvinceMetric, displayTypeProvince], () => {
  updateProvinceChart()
})
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.distribution-section,
.trend-section {
  width: 100%;
}

.section-title {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 1.25rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.metric-selector {
  display: flex;
  justify-content: center;
  margin: 15px 0 25px;
  gap: 10px;
  flex-wrap: wrap;
}

.metric-selector.small {
  margin: 0 0 15px 0;
}

.metric-selector.small button {
  padding: 6px 12px;
  min-width: 80px;
  font-size: 13px;
}

.metric-selector button {
  padding: 8px 16px;
  border: 1px solid #3498db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  min-width: 100px;
}

.metric-selector button.active {
  background: #3498db;
  color: white;
}

.metric-selector button:hover:not(.active) {
  background: #ebf5fb;
}

.chart-container {
  width: 100%;
  min-height: 300px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.data-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3498db;
  transition: transform 0.3s;
}

.data-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.data-card:nth-child(2) {
  border-left-color: #e74c3c;
}

.data-card h4 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #555;
}

.data-card p {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.trend-section {
  padding: 20px;
}

.trend-columns {
  display: flex;
  gap: 20px;
}

.trend-left, .trend-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.trend-right {
  border-left: 1px solid #eee;
  padding-left: 18px;
}

.trend-header {
  margin-bottom: 15px;
}

.sub-section-title {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.province-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.province-selector {
  flex: 1;
}

.province-selector select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dce6f0;
  border-radius: 6px;
  background: white;
  color: #2c3e50;
  font-size: 13px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: 38px;
}

.trend-right .display-toggle {
  display: flex;
  gap: 5px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 38px;
}

.trend-right .display-toggle button {
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 12px;
  font-weight: 500;
  min-width: 90px;
}

.trend-right .display-toggle button.active {
  background: white;
  color: #3498db;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.trend-right .display-toggle button:hover:not(.active) {
  background: #edf7ff;
  color: #3498db;
}

.province-info {
  background: #fff9f9;
  border-left: 4px solid #e74c3c;
}


.trend-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 25px 0;
  flex-wrap: wrap;
  gap: 15px;
}

.region-selector select {
  padding: 10px 15px;
  border: 1px solid #dce6f0;
  border-radius: 6px;
  background: white;
  color: #2c3e50;
  font-size: 14px;
  min-width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.display-toggle {
  display: flex;
  gap: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.display-toggle button {
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 500;
  min-width: 120px;
}

.display-toggle button.active {
  background: white;
  color: #3498db;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.display-toggle button:hover:not(.active) {
  background: #edf7ff;
  color: #3498db;
}

.trend-info {
  background: #f0f9ff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 25px;
  border-left: 4px solid #3498db;
}

.trend-info h4 {
  color: #3498db;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.trend-info p {
  color: #5a7a9c;
  font-size: 1rem;
  line-height: 1.7;
}

@media (max-width: 992px) {
  .trend-columns {
    flex-direction: column;
  }
  
  .trend-right {
    border-left: none;
    border-top: 1px solid #eee;
    padding-left: 0;
    padding-top: 20px;
  }
}

@media (max-width: 768px) {
  .trend-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .region-selector, 
  .display-toggle {
    width: 100%;
  }
  
  .display-toggle {
    justify-content: center;
  }
  
  .chart-container {
    height: 300px;
  }
  
  .province-controls {
    flex-direction: column;
    gap: 10px;
  }
  
  .province-selector, 
  .trend-right .display-toggle {
    width: 100%;
  }
}
</style>