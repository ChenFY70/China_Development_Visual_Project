<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">教育</h1>
    </div>
    
    <div class="chart-row">
      <div class="content-section full-width">
        <h3 class="section-title">各地区每10万人口中拥有的各类受教育程度人数</h3>
        <div class="map-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            :class="{ active: activeTab === tab.value }"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
        <div ref="educationMapRef" class="chart-container"></div>
        <p class="data-source">单位：人/10万人 | 数据来源：国家统计局</p>
      </div>
    </div>

    <div class="chart-row">
      <div class="content-section">
        <h3 class="section-title">2011-2021年全国高考录取率趋势</h3>
        <div ref="admissionRateChartRef" class="chart-container"></div>
        <p class="data-source">当前数据按官方已发布数据统计</p>
      </div>
      
      <div class="content-section">
        <h3 class="section-title">2019-2023年全国各类学校数量</h3>
        <div ref="schoolCountChartRef" class="chart-container"></div>
        <p class="data-source">数据来源：教育部公开统计数据</p>
      </div>
    </div>
    
    <!-- 学生数趋势图表 -->
    <div class="chart-row">
      <div class="content-section full-width">
        <h3 class="section-title">2020-2022年普通本科分学科门类学生数趋势</h3>
        <div ref="studentCountChartRef" class="chart-container"></div>
        <p class="data-source">数据来源：教育部公开统计数据</p>
      </div>
    </div>
    
    <!-- 南丁格尔玫瑰图 -->
    <div class="chart-row">
      <div class="content-section">
        <h3 class="section-title">2020年普通本科分学科门类学生数（玫瑰图）</h3>
        <div ref="roseChart2020Ref" class="chart-container"></div>
        <p class="data-source">数据来源：教育部公开统计数据</p>
      </div>
      
      <div class="content-section">
        <h3 class="section-title">2021年普通本科分学科门类学生数（玫瑰图）</h3>
        <div ref="roseChart2021Ref" class="chart-container"></div>
        <p class="data-source">数据来源：教育部公开统计数据</p>
      </div>
    </div>
    
    <div class="chart-row">
      <div class="content-section full-width">
        <h3 class="section-title">2022年普通本科分学科门类学生数（玫瑰图）</h3>
        <div ref="roseChart2022Ref" class="chart-container"></div>
        <p class="data-source">数据来源：教育部公开统计数据</p>
      </div>
    </div>
    
    <!-- 教育经费图表 -->
    <div class="chart-row">
      <div class="content-section full-width">
        <h3 class="section-title">2018-2022年各地区教育经费（万元）</h3>
        <div class="funding-tabs">
          <button 
            v-for="region in fundingRegions" 
            :key="region"
            :class="{ active: selectedRegion === region }"
            @click="selectedRegion = region"
          >
            {{ region }}
          </button>
        </div>
        <div ref="educationFundingChartRef" class="chart-container"></div>
        <p class="data-source">数据来源：国家统计局</p>
      </div>
    </div>
    
    <!-- 新增的组合图表：全国教育经费总额及各区域占比趋势 -->
    <div class="chart-row">
      <div class="content-section full-width">
        <h3 class="section-title">2018-2022年全国教育经费总额及各区域占比趋势</h3>
        <div ref="fundingTrendChartRef" class="chart-container"></div>
        <p class="data-source">数据来源：国家统计局</p>
      </div>
    </div>
    
    <!-- 新增城乡教育差距雷达图 -->
    <div class="chart-row">
      <div class="content-section full-width">
        <h3 class="section-title">城乡教育差距 - 专任教师人数变化 (2015-2022)</h3>
        <div class="map-tabs">
          <button 
            v-for="tab in teacherTabs" 
            :key="tab.value"
            :class="{ active: teacherChartType === tab.value }"
            @click="teacherChartType = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
        <div ref="teacherRadarRef" class="chart-container"></div>
        <p class="data-source">数据来源：国家统计局教育统计年鉴</p>
        
        <div class="stats-container">
          <div class="stat-card">
            <h4>城区教师增长</h4>
            <div class="stat-value">62.4%</div>
            <p>小学 (2015-2022)</p>
            <div class="stat-diff positive">+1,010,004人</div>
          </div>
          <div class="stat-card">
            <h4>镇区教师增长</h4>
            <div class="stat-value">19.4%</div>
            <p>小学 (2015-2022)</p>
            <div class="stat-diff positive">+393,502人</div>
          </div>
          <div class="stat-card">
            <h4>乡村教师减少</h4>
            <div class="stat-value">-22.5%</div>
            <p>小学 (2015-2022)</p>
            <div class="stat-diff">-459,203人</div>
          </div>
          <div class="stat-card">
            <h4>城镇化率变化</h4>
            <div class="stat-value">56.10% → 66.16%</div>
            <p>(2015-2023)</p>
            <div class="stat-diff positive">+10.06%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

// 地图图表
const educationMapRef = ref(null)
let educationMap = null
const activeTab = ref('university')
const tabs = [
  { label: '大学(大专及以上)', value: 'university' },
  { label: '高中(含中专)', value: 'highSchool' },
  { label: '初中', value: 'middleSchool' },
  { label: '小学', value: 'primarySchool' }
]

// 录取率图表
const admissionRateChartRef = ref(null)
let admissionRateChart = null

// 学校数量图表
const schoolCountChartRef = ref(null)
let schoolCountChart = null

// 学生数趋势图表
const studentCountChartRef = ref(null)
let studentCountChart = null

// 南丁格尔玫瑰图
const roseChart2020Ref = ref(null)
let roseChart2020 = null
const roseChart2021Ref = ref(null)
let roseChart2021 = null
const roseChart2022Ref = ref(null)
let roseChart2022 = null

// 教育经费图表
const educationFundingChartRef = ref(null)
let educationFundingChart = null
const selectedRegion = ref('全国')
const fundingRegions = ref(['全国', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区'])

// 新增：全国教育经费趋势图表
const fundingTrendChartRef = ref(null)
let fundingTrendChart = null

// 新增雷达图相关变量
const teacherRadarRef = ref(null)
let teacherRadar = null
const teacherChartType = ref('primary') // 'primary'为小学，'secondary'为初中
const teacherTabs = [
  { label: '小学教师分布', value: 'primary' },
  { label: '初中教师分布', value: 'secondary' }
]

// 加载地图数据
const loadChinaMap = async () => {
  try {
    const response = await fetch('/china.json')
    return await response.json()
  } catch (error) {
    console.error('加载地图数据失败:', error)
    return null
  }
}

onMounted(async () => {
  // 加载并注册地图
  const chinaJson = await loadChinaMap()
  if (chinaJson) {
    echarts.registerMap('china', chinaJson)
  }
  
  // 初始化所有图表
  initEducationMap()
  initAdmissionRateChart()
  initSchoolCountChart()
  initStudentCountChart()
  initRoseCharts()
  initEducationFundingChart()
  initFundingTrendChart()
  
  // 初始化雷达图
  initTeacherRadar()
})

onUnmounted(() => {
  if (educationMap) educationMap.dispose()
  if (admissionRateChart) admissionRateChart.dispose()
  if (schoolCountChart) schoolCountChart.dispose()
  if (studentCountChart) studentCountChart.dispose()
  if (roseChart2020) roseChart2020.dispose()
  if (roseChart2021) roseChart2021.dispose()
  if (roseChart2022) roseChart2022.dispose()
  if (educationFundingChart) educationFundingChart.dispose()
  if (fundingTrendChart) fundingTrendChart.dispose()
  
  // 销毁雷达图
  if (teacherRadar) teacherRadar.dispose()
})

// 初始化雷达图
const initTeacherRadar = () => {
  if (!teacherRadarRef.value) return
  teacherRadar = echarts.init(teacherRadarRef.value)
  
  // 小学数据
  const primaryData = {
    indicators: [
      { name: '城区', max: 3000000 },
      { name: '镇区', max: 3000000 },
      { name: '乡村', max: 3000000 }
    ],
    series: [
      {
        name: '2015年',
        value: [1619553, 2029591, 2035974],
        itemStyle: { color: 'rgba(84, 112, 198, 0.5)' },
        lineStyle: { color: 'rgba(84, 112, 198, 0.8)', width: 2 },
        areaStyle: { color: 'rgba(84, 112, 198, 0.1)' }
      },
      {
        name: '2022年',
        value: [2629557, 2423093, 1576771],
        itemStyle: { color: 'rgba(84, 112, 198, 1)' },
        lineStyle: { color: '#5470C6', width: 3 },
        areaStyle: { color: 'rgba(84, 112, 198, 0.3)' }
      }
    ]
  }
  
  // 初中数据
  const secondaryData = {
    indicators: [
      { name: '城区', max: 2000000 },
      { name: '镇区', max: 2000000 },
      { name: '乡村', max: 1000000 }
    ],
    series: [
      {
        name: '2015年',
        value: [1111803, 1718633, 645200],
        itemStyle: { color: 'rgba(145, 204, 117, 0.5)' },
        lineStyle: { color: 'rgba(145, 204, 117, 0.8)', width: 2 },
        areaStyle: { color: 'rgba(145, 204, 117, 0.1)' }
      },
      {
        name: '2022年',
        value: [1630482, 1882053, 512662],
        itemStyle: { color: 'rgba(145, 204, 117, 1)' },
        lineStyle: { color: '#91CC75', width: 3 },
        areaStyle: { color: 'rgba(145, 204, 117, 0.3)' }
      }
    ]
  }
  
  const data = teacherChartType.value === 'primary' ? primaryData : secondaryData
  const title = teacherChartType.value === 'primary' 
    ? '小学专任教师城乡分布变化 (2015-2022)' 
    : '初中专任教师城乡分布变化 (2015-2022)'
  
  const option = {
    title: {
      text: title,
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `<strong>${params.seriesName}</strong><br/>
        ${params.name}: ${params.value.toLocaleString()}人`;
      }
    },
    legend: {
      data: data.series.map(item => item.name),
      bottom: 10
    },
    radar: {
      indicator: data.indicators,
      radius: '65%',
      splitArea: {
        areaStyle: {
          color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.1)']
        }
      }
    },
    series: [{
      type: 'radar',
      emphasis: {
        lineStyle: {
          width: 4
        }
      },
      data: data.series
    }]
  }
  
  teacherRadar.setOption(option)
}

// 监听教师图表类型变化
watch(teacherChartType, () => {
  if (teacherRadar) {
    initTeacherRadar()
  }
})

// 响应式调整
window.addEventListener('resize', () => {
  if (teacherRadar) teacherRadar.resize()
})

const initEducationMap = () => {
  if (!echarts.getMap('china')) {
    console.error('中国地图数据未注册')
    return
  }
  
  educationMap = echarts.init(educationMapRef.value)
  
  // 地图数据 - 确保省份名称与地图数据匹配
  const mapData = {
    '北京市': { university: 41980, highSchool: 17593, middleSchool: 23289, primarySchool: 10503 },
    '天津市': { university: 26940, highSchool: 17719, middleSchool: 32294, primarySchool: 16123 },
    '河北省': { university: 12418, highSchool: 13861, middleSchool: 39950, primarySchool: 24664 },
    '山西省': { university: 17358, highSchool: 16485, middleSchool: 38950, primarySchool: 19506 },
    '内蒙古自治区': { university: 18688, highSchool: 14814, middleSchool: 33861, primarySchool: 23627 },
    '辽宁省': { university: 18216, highSchool: 14670, middleSchool: 42799, primarySchool: 18888 },
    '吉林省': { university: 16738, highSchool: 17080, middleSchool: 38234, primarySchool: 22318 },
    '黑龙江省': { university: 14793, highSchool: 15525, middleSchool: 42793, primarySchool: 21863 },
    '上海市': { university: 33872, highSchool: 19020, middleSchool: 28935, primarySchool: 11929 },
    '江苏省': { university: 18663, highSchool: 16191, middleSchool: 33308, primarySchool: 22742 },
    '浙江省': { university: 16990, highSchool: 14555, middleSchool: 32706, primarySchool: 26384 },
    '安徽省': { university: 13280, highSchool: 13294, middleSchool: 33724, primarySchool: 26875 },
    '福建省': { university: 14148, highSchool: 14212, middleSchool: 32218, primarySchool: 28031 },
    '江西省': { university: 11897, highSchool: 15145, middleSchool: 35501, primarySchool: 27514 },
    '山东省': { university: 14384, highSchool: 14334, middleSchool: 35778, primarySchool: 23693 },
    '河南省': { university: 11744, highSchool: 15239, middleSchool: 37518, primarySchool: 24557 },
    '湖北省': { university: 15502, highSchool: 17428, middleSchool: 34280, primarySchool: 23520 },
    '湖南省': { university: 12239, highSchool: 17776, middleSchool: 35636, primarySchool: 25214 },
    '广东省': { university: 15699, highSchool: 18224, middleSchool: 35484, primarySchool: 20676 },
    '广西壮族自治区': { university: 10806, highSchool: 12962, middleSchool: 36388, primarySchool: 27855 },
    '海南省': { university: 13919, highSchool: 15561, middleSchool: 40174, primarySchool: 19701 },
    '重庆市': { university: 15412, highSchool: 15956, middleSchool: 30582, primarySchool: 29894 },
    '四川省': { university: 13267, highSchool: 13301, middleSchool: 31443, primarySchool: 31317 },
    '贵州省': { university: 10952, highSchool: 9951, middleSchool: 30464, primarySchool: 31921 },
    '云南省': { university: 11601, highSchool: 10338, middleSchool: 29241, primarySchool: 35667 },
    '西藏自治区': { university: 11019, highSchool: 7051, middleSchool: 15757, primarySchool: 32108 },
    '陕西省': { university: 18397, highSchool: 15581, middleSchool: 33979, primarySchool: 21686 },
    '甘肃省': { university: 14506, highSchool: 12937, middleSchool: 27423, primarySchool: 29808 },
    '青海省': { university: 14880, highSchool: 10568, middleSchool: 24344, primarySchool: 32725 },
    '宁夏回族自治区': { university: 17340, highSchool: 13432, middleSchool: 29717, primarySchool: 26111 },
    '新疆维吾尔自治区': { university: 16536, highSchool: 13208, middleSchool: 31559, primarySchool: 28405 }
  }

  const updateMapChart = () => {
    const currentData = Object.keys(mapData).map(province => ({
      name: province,
      value: mapData[province][activeTab.value]
    }))
    
    // 计算最小值和最大值，确保包含所有数据
    const values = currentData.map(item => item.value)
    const min = Math.min(...values)
    const max = Math.max(...values)

    const option = {
      title: {
        text: `各地区每10万人口中${tabs.find(t => t.value === activeTab.value).label}人数`,
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'item',
        formatter: params => {
          const data = mapData[params.name]
          return `
            <strong>${params.name}</strong><br/>
            大学(大专及以上): ${data.university.toLocaleString()}人<br/>
            高中(含中专): ${data.highSchool.toLocaleString()}人<br/>
            初中: ${data.middleSchool.toLocaleString()}人<br/>
            小学: ${data.primarySchool.toLocaleString()}人
          `
        }
      },
      visualMap: {
        min: min,
        max: max,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac']
        },
        textStyle: {
          color: '#333'
        },
        bottom: 30
      },
      series: [{
        name: '受教育程度',
        type: 'map',
        map: 'china',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: currentData,
        itemStyle: {
          borderColor: '#888'
        }
      }]
    }

    educationMap.setOption(option, true)
  }

  // 初始渲染
  updateMapChart()

  // 监听标签切换
  watch(activeTab, updateMapChart)

  // 响应式调整
  window.addEventListener('resize', () => {
    educationMap.resize()
  })
}

// 高考录取率趋势图
const initAdmissionRateChart = () => {
  admissionRateChart = echarts.init(admissionRateChartRef.value)
  
  const option = {
    title: {
      text: '2011-2021年全国高考录取率',
      subtext: '单位：%',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c}%'
    },
    xAxis: {
      type: 'category',
      data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      min: 70,
      max: 100,
      axisLabel: {
        formatter: '{value} %'
      }
    },
    series: [
      {
        name: '录取率',
        type: 'line',
        data: [73.04, 75.12, 77.45, 79.32, 81.67, 84.15, 86.76, 88.94, 90.33, 91.45, 92.89],
        itemStyle: {
          color: '#5470C6'
        },
        lineStyle: {
          width: 3
        },
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: true,
          formatter: '{c}%',
          position: 'top'
        }
      }
    ],
    grid: {
      top: '20%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    }
  }
  
  admissionRateChart.setOption(option)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    admissionRateChart.resize()
  })
}

// 学校数量柱状图
const initSchoolCountChart = () => {
  schoolCountChart = echarts.init(schoolCountChartRef.value)
  
  const option = {
    title: {
      text: '2019-2023年全国各类学校数量',
      subtext: '单位：所',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        let result = params[0].axisValue + '<br/>'
        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()}所<br/>`
        })
        return result
      }
    },
    legend: {
      data: ['普通高等学校', '普通高中', '初中', '普通小学'],
      top: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023'],
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 所'
      }
    },
    series: [
      {
        name: '普通高等学校',
        type: 'bar',
        data: [2688, 2738, 2756, 2760, 2822],
        itemStyle: {
          color: '#5470C6'
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c} 所'
        }
      },
      {
        name: '普通高中',
        type: 'bar',
        data: [13964, 14235, 14585, 15026, 15381],
        itemStyle: {
          color: '#91CC75'
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c} 所'
        }
      },
      {
        name: '初中',
        type: 'bar',
        data: [52415, 52805, 52871, 52480, 52348],
        itemStyle: {
          color: '#FAC858'
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c} 所'
        }
      },
      {
        name: '普通小学',
        type: 'bar',
        data: [160148, 157979, 154279, 149117, 143472],
        itemStyle: {
          color: '#EE6666'
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c} 所'
        }
      }
    ]
  }
  
  schoolCountChart.setOption(option)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    schoolCountChart.resize()
  })
}

// 学生数趋势图表
const initStudentCountChart = () => {
  studentCountChart = echarts.init(studentCountChartRef.value)
  
  // 学科门类数据
  const subjects = [
    '哲学', '经济学', '法学', '教育学', '文学', 
    '历史学', '理学', '工学', '医学', '管理学', '艺术学'
  ]
  
  // 2020-2022年数据（单位：人）
  const data = {
    '哲学': [2260, 2488, 2413],
    '经济学': [249086, 249130, 262452],
    '法学': [147207, 152722, 166470],
    '教育学': [171334, null, 222013], // 2021年数据缺失
    '文学': [409351, 422799, 466944],
    '历史学': [18659, 19656, 21665],
    '理学': [274006, 280389, 298672],
    '工学': [1381245, 1403297, 1565928],
    '医学': [288359, 302039, 333657],
    '管理学': [795289, 785537, 849793],
    '艺术学': [397036, 406701, 449084]
  }
  
  // 生成系列数据
  const series = subjects.map(subject => {
    return {
      name: subject,
      type: 'line',
      data: data[subject],
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        width: 3
      },
      label: {
        show: true,
        formatter: (params) => params.value ? params.value.toLocaleString() : 'N/A',
        position: 'top'
      }
    }
  })
  
  const option = {
    title: {
      text: '2020-2022年普通本科分学科门类学生数',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        let result = `年份: ${params[0].axisValue}<br/>`
        params.forEach(item => {
          const value = item.value ? item.value.toLocaleString() : '数据缺失'
          result += `${item.marker} ${item.seriesName}: ${value}人<br/>`
        })
        return result
      }
    },
    legend: {
      data: subjects,
      type: 'scroll',
      orient: 'horizontal',
      top: 50,
      padding: [0, 50]
    },
    grid: {
      top: 100,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2020年', '2021年', '2022年'],
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      name: '学生数（人）',
      axisLabel: {
        formatter: function(value) {
          if (value >= 100000000) return (value / 100000000).toFixed(1) + '亿'
          if (value >= 10000) return (value / 10000).toFixed(1) + '万'
          return value
        }
      }
    },
    series: series,
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        bottom: 10
      }
    ]
  }
  
  studentCountChart.setOption(option)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    studentCountChart.resize()
  })
}

// 初始化南丁格尔玫瑰图
const initRoseCharts = () => {
  // 2020年玫瑰图
  roseChart2020 = echarts.init(roseChart2020Ref.value)
  
  // 2021年玫瑰图
  roseChart2021 = echarts.init(roseChart2021Ref.value)
  
  // 2022年玫瑰图
  roseChart2022 = echarts.init(roseChart2022Ref.value)
  
  // 学科门类数据
  const subjects = [
    '哲学', '经济学', '法学', '教育学', '文学', 
    '历史学', '理学', '工学', '医学', '管理学', '艺术学'
  ]
  
  // 2020-2022年数据（单位：人）
  const data = {
    '2020': {
      '哲学': 2260,
      '经济学': 249086,
      '法学': 147207,
      '教育学': 171334,
      '文学': 409351,
      '历史学': 18659,
      '理学': 274006,
      '工学': 1381245,
      '医学': 288359,
      '管理学': 795289,
      '艺术学': 397036
    },
    '2021': {
      '哲学': 2488,
      '经济学': 249130,
      '法学': 152722,
      '教育学': null, // 2021年数据缺失
      '文学': 422799,
      '历史学': 19656,
      '理学': 280389,
      '工学': 1403297,
      '医学': 302039,
      '管理学': 785537,
      '艺术学': 406701
    },
    '2022': {
      '哲学': 2413,
      '经济学': 262452,
      '法学': 166470,
      '教育学': 222013,
      '文学': 466944,
      '历史学': 21665,
      '理学': 298672,
      '工学': 1565928,
      '医学': 333657,
      '管理学': 849793,
      '艺术学': 449084
    }
  }
  
  // 生成2020年玫瑰图选项
  const option2020 = {
    title: {
      text: '2020年普通本科分学科门类学生数（玫瑰图）',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 'center',
      data: subjects
    },
    series: [
      {
        name: '学生数',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: true,
          formatter: '{b}: {c}人 ({d}%)'
        },
        data: subjects.map(subject => ({
          value: data['2020'][subject] || 0,
          name: subject
        }))
      }
    ]
  }
  
  // 生成2021年玫瑰图选项
  const option2021 = {
    title: {
      text: '2021年普通本科分学科门类学生数（玫瑰图）',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 'center',
      data: subjects
    },
    series: [
      {
        name: '学生数',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: true,
          formatter: '{b}: {c}人 ({d}%)'
        },
        data: subjects.map(subject => ({
          value: data['2021'][subject] || 0,
          name: subject
        }))
      }
    ]
  }
  
  // 生成2022年玫瑰图选项
  const option2022 = {
    title: {
      text: '2022年普通本科分学科门类学生数（玫瑰图）',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 'center',
      data: subjects
    },
    series: [
      {
        name: '学生数',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: true,
          formatter: '{b}: {c}人 ({d}%)'
        },
        data: subjects.map(subject => ({
          value: data['2022'][subject] || 0,
          name: subject
        }))
      }
    ]
  }
  
  roseChart2020.setOption(option2020)
  roseChart2021.setOption(option2021)
  roseChart2022.setOption(option2022)
  
  // 响应式调整
  window.addEventListener('resize', () => {
    roseChart2020.resize()
    roseChart2021.resize()
    roseChart2022.resize()
  })
}

// 教育经费图表
const initEducationFundingChart = () => {
  educationFundingChart = echarts.init(educationFundingChartRef.value)
  
  // 教育经费数据（单位：万元）
  const fundingData = {
    '北京市': [13525400, 14794780, 15085043, 15325981, 15854348],
    '天津市': [6351712, 6270839, 6031844, 6664572, 6565887],
    '河北省': [17389625, 19921191, 21282804, 21927812, 24395755],
    '山西省': [9134205, 9857999, 10071575, 11140175, 12125465],
    '内蒙古自治区': [7759014, 8105720, 8510492, 8595861, 9230537],
    '辽宁省': [9759379, 10593957, 10988599, 11110019, 11674506],
    '吉林省': [6866495, 6777422, 7204781, 7092031, 7484068],
    '黑龙江省': [7612173, 8115856, 8422728, 8440981, 8806510],
    '上海市': [13412840, 14125408, 14427631, 15764758, 16916927],
    '江苏省': [28276374, 31093313, 33717331, 37333811, 38820349],
    '浙江省': [24009012, 27343770, 28846115, 31651797, 34440066],
    '安徽省': [15011779, 16375812, 17478565, 18979388, 20532087],
    '福建省': [12547951, 13429131, 14160989, 15320230, 17625677],
    '江西省': [13152969, 14535470, 15772884, 16514212, 18915971],
    '山东省': [26349273, 29001760, 31022594, 34007897, 37144368],
    '河南省': [24293502, 26685217, 28022275, 27674810, 29695708],
    '湖北省': [14578340, 16067052, 16783125, 17932016, 19405534],
    '湖南省': [16300603, 17753672, 18852587, 20038528, 22100519],
    '广东省': [42684258, 49187551, 53869558, 60188062, 61902003],
    '广西壮族自治区': [12836618, 14367736, 15418302, 16448664, 17038772],
    '海南省': [3777479, 4243935, 4632077, 4648209, 4833662],
    '重庆市': [10216274, 11442967, 11823943, 12761688, 13146996],
    '四川省': [20767987, 22547121, 24660021, 25912560, 28294459],
    '贵州省': [12732768, 13622935, 14479368, 15080783, 15801330],
    '云南省': [14543783, 14833632, 16571342, 16694079, 17068501],
    '西藏自治区': [2562958, 2881230, 3164861, 3335508, 3643259],
    '陕西省': [11375081, 12490355, 13169806, 14151375, 14954384],
    '甘肃省': [7404892, 7998741, 8440554, 8498438, 9055895],
    '青海省': [2640309, 2894894, 2931351, 3066904, 3085235],
    '宁夏回族自治区': [2346978, 2532754, 2791933, 2838672, 3332220],
    '新疆维吾尔自治区': [9522617, 10214911, 11029496, 11146119, 11612882]
  }
  
  // 计算全国总数（每年所有地区的总和）
  const years = ['2018', '2019', '2020', '2021', '2022'];
  fundingData['全国'] = years.map(year => {
    return Object.keys(fundingData)
      .filter(region => region !== '全国')
      .reduce((sum, region) => {
        const index = years.indexOf(year);
        return sum + (fundingData[region][index] || 0);
      }, 0);
  });
  
  const updateFundingChart = () => {
    const region = selectedRegion.value;
    const data = region === '全国' ? fundingData['全国'] : fundingData[region];
    
    const option = {
      title: {
        text: `${region}教育经费变化趋势 (2018-2022)`,
        left: 'center',
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          const value = params[0].value.toLocaleString();
          return `${params[0].axisValue}<br/>${params[0].marker} 教育经费: ${value}万元`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2018', '2019', '2020', '2021', '2022'],
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: '教育经费（万元）',
        axisLabel: {
          formatter: function(value) {
            if (value >= 100000000) return (value / 100000000).toFixed(1) + '亿';
            if (value >= 10000) return (value / 10000).toFixed(0) + '万';
            return value;
          }
        }
      },
      series: [{
        name: '教育经费',
        type: 'bar',
        data: data,
        itemStyle: {
          color: function(params) {
            const colorList = [
              ['#5470C6', '#91CC75'],
              ['#91CC75', '#FAC858'],
              ['#FAC858', '#EE6666'],
              ['#EE6666', '#73C0DE'],
              ['#73C0DE', '#3BA272']
            ];
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: colorList[params.dataIndex][0]
              }, {
                offset: 1, color: colorList[params.dataIndex][1]
              }]
            };
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: function(params) {
            const value = params.value;
            if (value >= 100000000) return (value / 100000000).toFixed(1) + '亿';
            if (value >= 10000) return (value / 10000).toFixed(0) + '万';
            return value;
          }
        }
      }]
    };
    
    educationFundingChart.setOption(option);
  }
  
  // 初始渲染
  updateFundingChart();
  
  // 监听地区切换
  watch(selectedRegion, updateFundingChart);
  
  // 响应式调整
  window.addEventListener('resize', () => {
    educationFundingChart.resize();
  });
}

// 新增：初始化全国教育经费趋势图表
const initFundingTrendChart = () => {
  fundingTrendChart = echarts.init(fundingTrendChartRef.value)
  
  // 区域分类
  const regions = {
    '东部地区': ['北京市', '天津市', '河北省', '上海市', '江苏省', '浙江省', '福建省', '山东省', '广东省', '海南省'],
    '中部地区': ['山西省', '安徽省', '江西省', '河南省', '湖北省', '湖南省'],
    '西部地区': ['内蒙古自治区', '广西壮族自治区', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区'],
    '东北地区': ['辽宁省', '吉林省', '黑龙江省']
  }
  
  // 教育经费数据（单位：万元）
  const fundingData = {
    '北京市': [13525400, 14794780, 15085043, 15325981, 15854348],
    '天津市': [6351712, 6270839, 6031844, 6664572, 6565887],
    '河北省': [17389625, 19921191, 21282804, 21927812, 24395755],
    '山西省': [9134205, 9857999, 10071575, 11140175, 12125465],
    '内蒙古自治区': [7759014, 8105720, 8510492, 8595861, 9230537],
    '辽宁省': [9759379, 10593957, 10988599, 11110019, 11674506],
    '吉林省': [6866495, 6777422, 7204781, 7092031, 7484068],
    '黑龙江省': [7612173, 8115856, 8422728, 8440981, 8806510],
    '上海市': [13412840, 14125408, 14427631, 15764758, 16916927],
    '江苏省': [28276374, 31093313, 33717331, 37333811, 38820349],
    '浙江省': [24009012, 27343770, 28846115, 31651797, 34440066],
    '安徽省': [15011779, 16375812, 17478565, 18979388, 20532087],
    '福建省': [12547951, 13429131, 14160989, 15320230, 17625677],
    '江西省': [13152969, 14535470, 15772884, 16514212, 18915971],
    '山东省': [26349273, 29001760, 31022594, 34007897, 37144368],
    '河南省': [24293502, 26685217, 28022275, 27674810, 29695708],
    '湖北省': [14578340, 16067052, 16783125, 17932016, 19405534],
    '湖南省': [16300603, 17753672, 18852587, 20038528, 22100519],
    '广东省': [42684258, 49187551, 53869558, 60188062, 61902003],
    '广西壮族自治区': [12836618, 14367736, 15418302, 16448664, 17038772],
    '海南省': [3777479, 4243935, 4632077, 4648209, 4833662],
    '重庆市': [10216274, 11442967, 11823943, 12761688, 13146996],
    '四川省': [20767987, 22547121, 24660021, 25912560, 28294459],
    '贵州省': [12732768, 13622935, 14479368, 15080783, 15801330],
    '云南省': [14543783, 14833632, 16571342, 16694079, 17068501],
    '西藏自治区': [2562958, 2881230, 3164861, 3335508, 3643259],
    '陕西省': [11375081, 12490355, 13169806, 14151375, 14954384],
    '甘肃省': [7404892, 7998741, 8440554, 8498438, 9055895],
    '青海省': [2640309, 2894894, 2931351, 3066904, 3085235],
    '宁夏回族自治区': [2346978, 2532754, 2791933, 2838672, 3332220],
    '新疆维吾尔自治区': [9522617, 10214911, 11029496, 11146119, 11612882]
  }
  
  // 计算全国总额
  const nationalTotal = ['2018', '2019', '2020', '2021', '2022'].map((year, index) => {
    return Object.keys(fundingData)
      .filter(region => region !== '全国')
      .reduce((sum, region) => sum + (fundingData[region][index] || 0), 0);
  });
  
  // 计算各区域每年的经费总和
  const regionSums = {
    '东部地区': [],
    '中部地区': [],
    '西部地区': [],
    '东北地区': []
  };
  
  Object.keys(regions).forEach(regionType => {
    regions[regionType].forEach(region => {
      if (fundingData[region]) {
        fundingData[region].forEach((value, index) => {
          if (!regionSums[regionType][index]) {
            regionSums[regionType][index] = 0;
          }
          regionSums[regionType][index] += value;
        });
      }
    });
  });
  
  // 计算各区域占比
  const regionPercentages = {
    '东部地区': regionSums['东部地区'].map((sum, index) => (sum / nationalTotal[index] * 100).toFixed(2)),
    '中部地区': regionSums['中部地区'].map((sum, index) => (sum / nationalTotal[index] * 100).toFixed(2)),
    '西部地区': regionSums['西部地区'].map((sum, index) => (sum / nationalTotal[index] * 100).toFixed(2)),
    '东北地区': regionSums['东北地区'].map((sum, index) => (sum / nationalTotal[index] * 100).toFixed(2))
  };
  
  // 配置选项
  const option = {
    title: {
      text: '全国教育经费总额及各区域占比趋势',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function(params) {
        let result = `年份: ${params[0].axisValue}<br/>`;
        params.forEach(param => {
          if (param.seriesName === '全国总额') {
            const value = param.value;
            const formattedValue = value >= 100000000 ? (value / 100000000).toFixed(1) + '亿' : 
                                 value >= 10000 ? (value / 10000).toFixed(0) + '万' : value;
            result += `${param.marker} ${param.seriesName}: ${formattedValue}<br/>`;
          } else {
            result += `${param.marker} ${param.seriesName}: ${param.value}%<br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['全国总额', '东部地区', '中部地区', '西部地区', '东北地区'],
      top: 'bottom'
    },
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021', '2022'],
      axisLabel: {
        interval: 0
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '经费总额',
        position: 'left',
        axisLabel: {
          formatter: function(value) {
            if (value >= 100000000) return (value / 100000000).toFixed(0) + '亿';
            return value;
          }
        }
      },
      {
        type: 'value',
        name: '占比(%)',
        position: 'right',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '全国总额',
        type: 'bar',
        barWidth: '30%',
        data: nationalTotal,
        itemStyle: {
          color: '#5470C6'
        },
        label: {
          show: true,
          position: 'top',
          formatter: function(params) {
            const value = params.value;
            return value >= 100000000 ? (value / 100000000).toFixed(1) + '亿' : 
                   value >= 10000 ? (value / 10000).toFixed(0) + '万' : value;
          }
        }
      },
      {
        name: '东部地区',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 8,
        data: regionPercentages['东部地区'],
        lineStyle: {
          width: 3,
          color: '#91CC75'
        },
        label: {
          show: true,
          formatter: '{c}%',
          position: 'top'
        }
      },
      {
        name: '中部地区',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 8,
        data: regionPercentages['中部地区'],
        lineStyle: {
          width: 3,
          color: '#FAC858'
        },
        label: {
          show: true,
          formatter: '{c}%',
          position: 'top'
        }
      },
      {
        name: '西部地区',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 8,
        data: regionPercentages['西部地区'],
        lineStyle: {
          width: 3,
          color: '#EE6666'
        },
        label: {
          show: true,
          formatter: '{c}%',
          position: 'top'
        }
      },
      {
        name: '东北地区',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 8,
        data: regionPercentages['东北地区'],
        lineStyle: {
          width: 3,
          color: '#73C0DE'
        },
        label: {
          show: true,
          formatter: '{c}%',
          position: 'top'
        }
      }
    ]
  };
  
  fundingTrendChart.setOption(option);
  
  // 响应式调整
  window.addEventListener('resize', () => {
    fundingTrendChart.resize();
  });
}
</script>

<style scoped>


.chart-container {
  width: 100%;
  height: 500px;
}

.page-title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 30px;
  color: #1a1a1a;
}

.section-title {
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
}

.data-source {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.full-width {
  grid-column: 1 / -1;
}

.map-tabs, .funding-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.map-tabs button, .funding-tabs button {
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.map-tabs button:hover, .funding-tabs button:hover {
  background: #e9e9e9;
}

.map-tabs button.active, .funding-tabs button.active {
  background: #5470C6;
  color: white;
  border-color: #5470C6;
}

/* 新增样式 */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 25px;
}

.stat-card {
  background: rgba(245, 245, 245, 0.8);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-card h4 {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 5px 0;
}

.stat-diff {
  font-size: 13px;
  font-weight: 500;
}

.positive {
  color: #52c41a;
}

.stat-diff:not(.positive) {
  color: #f5222d;
}

@media (min-width: 1200px) {
  .chart-row:not(:first-child) {
    grid-template-columns: 1fr 1fr;
  }
  
  .chart-container {
    height: 500px;
  }
  
  .stats-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>