<template>
<div>
<div class="tech-dashboard-header">
<div class="header-left">
<div class="title-container">
<h1 class="main-title">中国科技发展分析</h1>
<div class="subtitle-badge">
<span class="year-range">2005-2024</span>
<span class="data-source">国家统计局 & WIPO</span>
</div>
</div>

    <div class="insight-container">
      <div class="insight-highlight">
        <span class="highlight-number">8.45%</span>
        <span class="highlight-label">2012-2024GII排名年均增率</span>
        <div class="trend-indicator positive">↗</div>
      </div>
      <p class="insight-text">研发投入持续增长，科技创新能力显著提升，成果产出数量明显上升，区域分布呈现东强西弱格局</p>
    </div>
  </div>
  
  <div class="header-right">
    <div class="metric-hexagons">
      <div class="hexagon-item primary">
        <div class="hex-content">
          <div class="hex-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path>
            </svg>
          </div>
          <div class="hex-value">Num 11</div>
          <div class="hex-label">2024年GII排名</div>
        </div>
      </div>
      
      <div class="hexagon-item secondary">
        <div class="hex-content">
          <div class="hex-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M22 10H15.75L13 7.25 10.25 10H4l3.5 4 3-4 3 4 3.5-4v8h2V9.5c0-.55.45-1 1-1s1 .45 1 1V16c0 .55-.45 1-1 1s-1-.45-1-1h-2c0 1.66 1.34 3 3 3s3-1.34 3-3v-7c0-1.1-.9-2-2-2zM7.5 10l1.5-2 1.5 2h-3zm6 0l1.5-2 1.5 2h-3z"></path>
            </svg>
          </div>
          <div class="hex-value">56.3 分</div>
          <div class="hex-label">2024年GII总分</div>
        </div>
      </div>
      
      <div class="hexagon-item tertiary">
        <div class="hex-content">
          <div class="hex-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
            </svg>
          </div>
          <div class="hex-value">1 名</div>
          <div class="hex-label">GII排名较2023上升</div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="top-section">
  <div class="left-panel">
    <div class="map-chart-container map-container">
      <div id="chinaMapChart" class="chart-area"></div>
    </div>
    <div class="line-chart-container line-container">
      <div id="lineChart" class="chart-area"></div>
    </div>
  </div>

  <div class="right-panel">
    <div class="parallel-chart-container parallel-container">
      <div id="parallelChart" class="chart-area"></div>
    </div>
    <div class="polar-charts-container">
      <div class="polar-charts-title">2006-2023年研究与试验发展经费支出(亿元)</div>
      <div class="polar-grid">
        <div class="polar-item" id="polarChart1"></div>
        <div class="polar-item" id="polarChart2"></div>
        <div class="polar-item" id="polarChart3"></div>
        <div class="polar-item" id="polarChart4"></div>
        <div class="polar-item" id="polarChart5"></div>
        <div class="polar-item" id="polarChart6"></div>
      </div>
    </div>
  </div>
</div>

<div class="bottom-section">
  <div class="chart-container histogram-container">
    <div id="histogramChart" class="chart-area"></div>
  </div>
</div>
</div>
</template>

<script>
export default {
name: 'Technology',
data() {
return {
charts: {}, // 存储所有图表实例
resizeHandler: null, // 存储resize处理函数
isEchartsLoaded: false // ECharts加载状态
}
},
mounted() {
this.loadEChartsAndInit()
},
// 页面激活时重新初始化
activated() {
this.$nextTick(() => {
if (this.isEchartsLoaded) {
this.initAllCharts()
this.addResizeListener()
}
})
},
// 页面失活时清理资源
deactivated() {
this.cleanup()
},
// 组件销毁前清理资源
beforeDestroy() {
this.cleanup()
},
methods: {
// 加载ECharts并初始化
loadEChartsAndInit() {
if (typeof window.echarts === 'undefined') {
const script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js'
script.onload = () => {
this.isEchartsLoaded = true
this.$nextTick(() => {
this.initAllCharts()
this.addResizeListener()
})
}
script.onerror = () => {
console.error('ECharts加载失败')
}
document.head.appendChild(script)
} else {
this.isEchartsLoaded = true
this.$nextTick(() => {
this.initAllCharts()
this.addResizeListener()
})
}
},

// 初始化所有图表
initAllCharts() {
  // 清理已存在的图表实例
  this.disposeAllCharts()
  
  // 确保DOM元素存在后再初始化
  this.$nextTick(() => {
    try {
      this.initChinaMap()
      this.initParallelChart()
      this.initLineChart()
      this.initHistogramChart()
      this.initPolarCharts()
    } catch (error) {
      console.error('图表初始化失败:', error)
    }
  })
},

// 销毁所有图表实例
disposeAllCharts() {
  Object.values(this.charts).forEach(chart => {
    if (chart && typeof chart.dispose === 'function') {
      chart.dispose()
    }
  })
  this.charts = {}
},

// 添加窗口大小监听
addResizeListener() {
  // 移除旧的监听器
  if (this.resizeHandler) {
    window.removeEventListener('resize', this.resizeHandler)
  }
  
  // 创建防抖的resize处理函数
  this.resizeHandler = this.debounce(() => {
    Object.values(this.charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        try {
          chart.resize()
        } catch (error) {
          console.error('图表resize失败:', error)
        }
      }
    })
  }, 300)
  
  window.addEventListener('resize', this.resizeHandler)
},

// 防抖函数
debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
},

// 清理资源
cleanup() {
  // 移除resize监听器
  if (this.resizeHandler) {
    window.removeEventListener('resize', this.resizeHandler)
    this.resizeHandler = null
  }
  
  // 销毁所有图表实例
  this.disposeAllCharts()
},

// 安全的图表初始化函数
safeInitChart(chartId, initFunction) {
  const chartDom = document.getElementById(chartId)
  if (!chartDom) {
    console.warn(`图表容器 ${chartId} 不存在`)
    return null
  }
  
  try {
    // 如果已存在实例，先销毁
    if (this.charts[chartId]) {
      this.charts[chartId].dispose()
    }
    
    const chart = window.echarts.init(chartDom)
    this.charts[chartId] = chart
    initFunction(chart)
    return chart
  } catch (error) {
    console.error(`初始化图表 ${chartId} 失败:`, error)
    return null
  }
},

// 修复后的中国地图初始化函数
initChinaMap() {
  this.safeInitChart('chinaMapChart', (chart) => {
    // 模拟省份数据 - 注意名称要与地图数据完全匹配
    const provinceData = [
      {name: '北京市', value: 758297},
      {name: '天津市', value: 304043},
      {name: '河北省', value: 419553},
      {name: '山西省', value: 126206},
      {name: '内蒙古自治区', value: 89218},
      {name: '辽宁省', value:285442},
      {name: '吉林省', value: 110001},
      {name: '黑龙江省', value: 131498},
      {name: '上海市', value: 656535},
      {name: '江苏省', value: 2147217},
      {name: '浙江省', value: 1682988},
      {name: '安徽省', value: 572393},
      {name: '福建省', value: 561542},
      {name: '江西省', value: 313561},
      {name: '山东省', value: 1184429},
      {name: '河南省', value: 526794},
      {name: '湖北省', value: 561331},
      {name: '湖南省', value: 345515},
      {name: '广东省', value: 3122905},
      {name: '广西壮族自治区', value: 160080},
      {name: '海南省', value: 46321},
      {name: '重庆市', value: 252186},
      {name: '四川省', value: 503902},
      {name: '贵州省', value: 125769},
      {name: '云南省', value: 142325},
      {name: '西藏自治区', value: 7635},
      {name: '陕西省', value: 297733},
      {name: '甘肃省', value: 90440},
      {name: '青海省', value: 20547},
      {name: '宁夏回族自治区', value: 43410},
      {name: '新疆维吾尔自治区', value: 73593}
    ];

    // 加载地图数据
    this.loadChinaMapData().then(geoJson => {
      if (!geoJson || !geoJson.features) {
        throw new Error('地图数据格式不正确');
      }

      // 注册地图
      window.echarts.registerMap('china', geoJson);
      
      // 配置地图选项
      const option = {
        title: {
          text: '2020-2023年国内专利申请授权总量(项)',
          left: 'left',
          top: 15,
          textStyle: {
            fontSize: 14,
            color: '#333',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.data && params.data.value !== undefined) {
              return `${params.name}<br/>${params.data.value}`;
            } else {
              return `${params.name}<br/>暂无数据`;
            }
          },
          backgroundColor: 'rgba(50,50,50,0.9)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          padding: [8, 12]
        },
        visualMap: {
          type: 'continuous',
          left: 80,
          bottom: 21,
          min: 7500,
          max: 3200000,
          calculable: true,
          realtime: true,
          inRange: {
            color: [
              '#313695', '#4575b4', '#74add1', '#abd9e9', 
              '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', 
              '#f46d43', '#d73027', '#a50026'
            ]
          },
          outOfRange: {
            color: '#74add1'  // 没有数据的区域
          },
          text: ['高', '低'],
          textStyle: {
            color: '#333',
            fontSize: 12
          },
          itemWidth: 15, 
          itemHeight: 120, 
          symbolSize: 20, 
          formatter: function(value) {
            return Math.round(value);
          }
        },

        series: [
          {
            name: '',
            type: 'map',
            map: 'china',
            roam: true,
            zoom:1.2,
            scaleLimit: {
              min: 0.8,
              max: 3
            },
            zoom: 1.1,
            aspectScale: 0.75,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 0.8,
              areaColor: '#2a272b52'
            },
            emphasis: {
              itemStyle: {
                areaColor: '#ce69de',
                borderWidth: 2,
                borderColor: '#666',
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
              },
              label: {
                show: true,
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold'
              }
            },
            select: {
              itemStyle: {
                areaColor: '#ff6b6b'
              }
            },
            data: provinceData,
            top: 70,
            left:220,
          }
        ]
      };

      chart.setOption(option, true);

      // 添加交互事件
      chart.on('click', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'map') {
          const value = params.data ? params.data.value : '暂无数据';
          console.log(`点击省份: ${params.name},  ${value}`);
        }
      });

      // 添加双击事件
      chart.on('dblclick', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'map') {
          // 双击缩放到该省份
          chart.dispatchAction({
            type: 'mapSelect',
            name: params.name
          });
        }
      });

    }).catch(error => {
      console.error('中国地图初始化失败:', error);
      
      // 显示错误提示
      const errorOption = {
        title: {
          text: '地图加载失败',
          subtext: '请检查网络连接或稍后重试',
          left: 'center',
          top: 'middle',
          textStyle: {
            fontSize: 18,
            color: '#999'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#ccc'
          }
        },
        graphic: [{
          type: 'text',
          left: 'center',
          top: '60%',
          style: {
            text: '🌐',
            fontSize: 48,
            fill: '#ddd'
          }
        }]
      };
      
      chart.setOption(errorOption);
    });
  });
},

// 改进的地图数据加载函数
async loadChinaMapData() {
  const dataSources = [
    // 第一优先级：阿里云DataV
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    // 第二优先级：备用CDN
    'https://raw.githubusercontent.com/echarts-maps/echarts-china-provinces-js/master/echarts-china-provinces-js/china.js',
    // 第三优先级：本地文件（如果存在）
    '/assets/china.json'
  ];

  for (const url of dataSources) {
    try {
      console.log(`尝试从 ${url} 加载地图数据...`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000 // 10秒超时
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // 验证数据格式
      if (data && (data.features || data.type === 'FeatureCollection')) {
        console.log('地图数据加载成功');
        return data;
      } else {
        throw new Error('数据格式不正确');
      }
      
    } catch (error) {
      console.warn(`从 ${url} 加载失败:`, error.message);
      continue;
    }
  }

},

initParallelChart() {
  this.safeInitChart('parallelChart', (chart) => {
    const option = {
      
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `年份: ${params.name}<br/>
                  科学研究与开发机构数: ${params.value[0]}<br/>
                  普通高校数: ${params.value[1]}<br/>
                  科研企业数: ${params.value[2]}<br/>
                  技术市场成交额(亿元): ${params.value[3]}<br/>
                  大中型工业新产品项目数: ${params.value[4]}`;
        }
      },
      parallelAxis: [
        {dim: 0, name: '科学研究与开发机构数', min: 3700, max: 2900},
        {dim: 1, name: '普通高校数', min: 2400, max: 2850},
        {dim: 2, name: '科研企业数', min: 37000, max: 175000},
        {dim: 3, name: '技术市场成交额(亿元)', min: 4700, max: 61500},
        {dim: 4, name: '大中型工业新产品项目数', min: 170000, max: 380000}
      ],
      parallel: {
        left: '8%',
        right: '10%',
        bottom: '10%',
        top: '20%'
      },
      series: [{
        name: '技术领域',
        type: 'parallel',
        lineStyle: {
          width: 2,
          opacity: 0.7,
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,  // 渐变方向从左到右
            colorStops: [
              {offset: 0, color: '#9527b7'},  
              {offset: 0.3, color: '#ea7dd2'},
              {offset: 0.7, color: '#87CEEB'}, 
              {offset: 1, color: '#32CD32'}   
            ],
            global: false 
          }
        },
        symbolSize: 10,
        data: [
          {name: '2023', value: [2890, 2822, 151290, 61475.66, 373518]},
          {name: '2022', value: [2871, 2760, 175619, 47791.02, 350424]},
          {name: '2021', value: [2962, 2756, 169224, 37294.3, 322480]},
          {name: '2020', value: [3109, 2738, 146691, 28251.51, 280801]},
          {name: '2019', value: [3217, 2688, 129198, 22398.39, 253058	]},
          {name: '2018', value: [3306, 2663, 104820, 17697.42, 233296]},
          {name: '2017', value: [3547, 2631, 102218, 13424.22, 222448]},
          {name: '2016', value: [3611, 2596, 86891, 11406.98, 195747]},
          {name: '2015', value: [3650, 2560, 73570, 9835.79, 176447	]},
          {name: '2014', value: [3677, 2529, 63676, 8577.18, 225206	]},
          {name: '2013', value: [3651, 2491, 54832, 7469.13, 222508	]},
          {name: '2012', value: [3674, 2442, 47204, 6437.07, 210730	]},
          {name: '2011', value: [3673, 2409, 37467, 4763.56, 176044	]}
        ]
      }]
    };

    chart.setOption(option);
  });
},





initLineChart() {
  this.safeInitChart('lineChart', (chart) => {
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['每百万居民研究人员数量', '研发支出占生产总值的百分比'],
        left:0,
        top:12,
        textStyle: {
          fontSize: 10
        },
        selected: {
          '每百万居民研究人员数量': true,  
          '研发支出占生产总值的百分比': true  // 默认显示
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
      },
      yAxis: [
        {
          type: 'value',
          name: '每百万居民研究人员数量',
          nameLocation: 'middle',  
          nameRotate: -90,  
          nameGap: 42,
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            show: true,
          },
          nameTextStyle: {
            fontSize: 10.5,  
            fontWeight: 'normal',
            color: '#444747' 
          }
        },
        {
          type: 'value',
          name: '研发支出占生产总值的百分比',
          nameLocation: 'middle', 
          nameRotate: -90,  
          nameGap: 42,
          position: 'right',
          axisLabel: {
            formatter: '{value}%',
          },
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            fontSize: 10.5,  
            fontWeight: 'normal',
            color: '#444747'  
          }
        }
      ],
      series: [
        {
          name: '每百万居民研究人员数量',
          type: 'line',
          yAxisIndex: 0,
          data: [551.80724, 585.47457, 634.76435, 670.9215, 716.47762, 859.97612, 934.93071, 1080.5736, 1201.11872, 863.44302, 901.12598, 974.42187, 1031.22366, 1081.96454, 1104.08308, 1164.94031, 1210.74113, 1237.74195, 1319.35596, 1485.81754, 1601.92217, 1687.05679, 1849.4608],
          smooth: true,
          symbol: 'diamond',  
          symbolSize: 8,  
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#a355d3' }, 
              { offset: 1, color: '#e4a6d6' } 
            ]) 
          }
        },
        {
          name: '研发支出占生产总值的百分比',
          type: 'line',
          yAxisIndex: 1,
          data: [0.89316, 0.94033, 1.05786, 1.12037, 1.21498, 1.30792, 1.36854, 1.37369, 1.44592, 1.6648, 1.71372, 1.78034, 1.91214, 1.99786, 2.02243, 2.05701, 2.10033, 2.11603, 2.14058, 2.24463, 2.40666, 2.4326, 2.55518],
          smooth: true,
          symbol: 'circle',  
          symbolSize: 7,  
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#4247d6' }, 
              { offset: 1, color: '#5cd8e4' }  
            ]) 
          }
        }
      ]
    }
    
    chart.setOption(option);
  });
},


initHistogramChart() {
  this.safeInitChart('histogramChart', (chart) => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top:'18%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
      },
      yAxis: {
        type: 'value',
        name: '科技论文发表量(万篇)'
      },
      series: [{
        name: '',
        type: 'bar',
        data: [94.34, 106.03, 114.26, 119.32, 136.1, 141.6, 150, 152, 154.46, 157, 164, 165, 170.09, 184.36, 195, 195.17, 203, 215, 217],
        itemStyle: {
          color: function(params) {
            const colorStart = [186, 85, 211]; 
            const colorEnd = [70, 130, 180]; 

            const totalBars = option.series[0].data.length; 
            const colorMix = params.dataIndex / (totalBars - 1); 
            const r = Math.round(colorStart[0] * (1 - colorMix) + colorEnd[0] * colorMix);
            const g = Math.round(colorStart[1] * (1 - colorMix) + colorEnd[1] * colorMix);
            const b = Math.round(colorStart[2] * (1 - colorMix) + colorEnd[2] * colorMix);

            return `rgb(${r}, ${g}, ${b})`;
          }
        },
        barWidth: '60%'
      }]
    }
    chart.setOption(option)
  })
},


initPolarCharts() {
  const chartIds = ['polarChart1', 'polarChart2', 'polarChart3', 'polarChart4', 'polarChart5', 'polarChart6'];
  const chartsData = [
    {
      title: '2006-2008',
      color: '#9fb8ec',
      data: {
        '基础研究': [155.76, 174.52, 220.82],
        '应用研究': [488.97, 492.94, 575.16],
        '试验发展': [2358.37, 3042.78, 3820.04]
      }
    },
    {
      title: '2009-2011',
      color: '#ea7687',
      data: {
        '基础研究': [270.29, 324.49, 411.81],
        '应用研究': [730.79, 893.79, 1028.4],
        '试验发展': [4801.03, 5844.3, 7246.8]
      }
    },
    {
      title: '2012-2014',
      color: '#ebdd9c',
      data: {
        '基础研究': [498.81, 554.95, 613.54],
        '应用研究': [1161.97, 1269.12, 1398.53],
        '试验发展': [8637.63, 10022.5, 11003.56]
      }
    },
    {
      title: '2015-2017',
      color: '#94dea2',
      data: {
        '基础研究': [716.12, 822.89, 975.49],
        '应用研究': [1528.64, 1610.49, 1849.21],
        '试验发展': [11925.13, 13243.36, 14781.43]
      }
    },
    {
      title: '2018-2020',
      color: '#ca79db',
      data: {
        '基础研究': [1090.37, 1335.6, 1467],
        '应用研究': [2190.87, 2498.5, 2757.24],
        '试验发展': [16396.69, 18309.5, 20168.88]
      }
    },
    {
      title: '2021-2023',
      color: '#ebafcf',
      data: {
        '基础研究': [1817, 2023.5, 2259.1],
        '应用研究': [3145.4, 3482.5, 3661.5],
        '试验发展': [22995.9, 25276.9, 27436.5]
      }
    }
  ];

  const getYearsFromTitle = (title) => {
    const [startYear, endYear] = title.split('-').map(year => parseInt(year));
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year.toString());
    }
    return years;
  };

  chartIds.forEach((chartId, index) => {
    this.safeInitChart(chartId, (chart) => {
      const chartData = chartsData[index];
      const years = getYearsFromTitle(chartData.title);

      const option = {
        title: [
          {
            text: chartData.title,
            right: '-2%',
            bottom: '-1%',
            textStyle: {
              fontSize: 12,
              color: '#2c3e50'
            }
          }
        ],
        polar: {},
        angleAxis: {
          show: true, 
          axisLabel: {
          fontSize: 9, 
          color: '#333', 
    }
        },
        radiusAxis: {
          type: 'category',
          data: years,
          z: 10,
          show: false // 隐藏Y轴标题
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br/>';
            params.forEach(param => {
              result += param.marker + param.seriesName + ': ' + param.value + '<br/>';
            });
            return result;
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%'
        },
        series: [
          {
            type: 'bar',
            data: chartData.data['基础研究'],
            coordinateSystem: 'polar',
            name: '基础研究',
            stack: 'total',
            itemStyle: {
              color: chartData.color
            },
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: chartData.data['应用研究'],
            coordinateSystem: 'polar',
            name: '应用研究',
            stack: 'total',
            itemStyle: {
              color: this.adjustColorBrightness(chartData.color, -20)
            },
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: chartData.data['试验发展'],
            coordinateSystem: 'polar',
            name: '试验发展',
            stack: 'total',
            itemStyle: {
              color: this.adjustColorBrightness(chartData.color, -40)
            },
            emphasis: {
              focus: 'series'
            }
          }
        ]
      };

      chart.setOption(option);
    });
  });
},

adjustColorBrightness(hex, percent) {
  hex = hex.replace('#', '');
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}



}
}
</script>

<style scoped>

.tech-dashboard-header {
display: flex;
background-color: #f8f9fa;
padding: 1.5rem;
border-radius: 16px;
margin-bottom: 2rem;
box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
position: relative;
overflow: hidden;
}

.tech-dashboard-header::before {
content: '';
position: absolute;
inset: 0;
border: 5px solid transparent;
border-radius: 16px;
background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c, #f1c40f, #2ecc71) border-box;
-webkit-mask:
linear-gradient(#fff 0 0) padding-box,
linear-gradient(#fff 0 0);
mask:
  linear-gradient(#fff 0 0) padding-box,
  linear-gradient(#fff 0 0);
-webkit-mask-composite: destination-out;
mask-composite: exclude;
z-index: 1;
pointer-events: none;
}

.header-left {
flex: 1;
padding-right: 2rem;
display: flex;
flex-direction: column;
justify-content: space-between;
}

.header-right {
flex: 1;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: flex-end;
}

.title-container {
margin-bottom: 1rem;
}

.main-title {
font-size: 2.2rem;
margin: 0;
font-weight: 700;
color: #2c3e50;
position: relative;
display: inline-block;
}

.main-title::after {
content: '';
position: absolute;
bottom: -8px;
left: 0;
width: 60px;
height: 4px;
background-color: #3498db;
border-radius: 2px;
}

.subtitle-badge {
display: inline-flex;
align-items: center;
background-color: #eef2f7;
border-radius: 20px;
padding: 0.3rem 0.8rem;
margin-top: 1rem;
font-size: 0.85rem;
}

.year-range {
font-weight: 600;
color: #3498db;
margin-right: 0.5rem;
}

.year-range::after {
content: '•';
margin-left: 0.5rem;
color: #bdc3c7;
}

.data-source {
color: #7f8c8d;
}

.insight-container {
background-color: white;
border-radius: 12px;
padding: 1rem;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
display: flex;
align-items: center;
width: 130%; 
}

.insight-highlight {
display: flex;
flex-direction: column;
align-items: center;
padding-right: 1.2rem;
margin-right: 1.2rem;
border-right: 1px solid #ecf0f1;
position: relative;
}

.highlight-number {
font-size: 1.8rem;
font-weight: 700;
color: #3498db;
}

.highlight-label {
font-size: 0.75rem;
color: #7f8c8d;
margin-top: 0.2rem;
text-align: center;
}

.trend-indicator {
position: absolute;
top: -5px;
right: 10px;
font-size: 1rem;
font-weight: bold;
}

.trend-indicator.positive {
color: #2ecc71;
}

.trend-indicator.negative {
color: #e74c3c;
}

.insight-text {
font-size: 0.95rem;
color: #4a5568;
line-height: 1.5;
max-width: 700px; 
}

.metric-hexagons {
display: flex;
gap: 1rem;
}

.hexagon-item {
width: 130px;
height: 150px;
position: relative;
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
display: flex;
justify-content: center;
align-items: center;
transition: all 0.3s ease;
}

.hexagon-item.primary {
  background: linear-gradient(135deg, #3498db, #2980b9, #1abc9c);
}

.hexagon-item.secondary {
  background: linear-gradient(135deg, #9b59b6, #8e44ad, #d35400);
}

.hexagon-item.tertiary {
  background: linear-gradient(135deg, #e74c3c, #c0392b, #f39c12);
}


.hex-content {
display: flex;
flex-direction: column;
align-items: center;
color: white;
text-align: center;
padding: 0.5rem;
}

.hex-icon {
margin-bottom: 0.5rem;
}

.hex-value {
font-size: 1.2rem;
font-weight: 700;
margin-bottom: 0.2rem;
}

.hex-label {
font-size: 0.75rem;
opacity: 0.8;
}

.top-section {
display: flex;
gap: 1rem;
margin-bottom: 1rem;
}

.left-panel {
flex: 1;
display: flex;
flex-direction: column;
gap: 1rem;
}

.right-panel {
flex: 1;
display: flex;
flex-direction: column;
gap: 1rem;
}

.chart-area {
width: 100%;
height: 100%;
}

.map-container, .line-container, .parallel-container {
background-color: white;
border-radius: 12px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
padding: 1rem;
}

.map-container {
height: 400px;
}

.line-container {
height: 300px;
}

.parallel-container {
height: 350px;
}

.polar-charts-container {
background-color: white;
border-radius: 12px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
padding: 1rem;
}

.polar-charts-title {
font-size: 1rem;
color: #34495e;
margin-bottom: 1rem;
text-align: center;
}

.polar-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
gap: 1rem;
height: 320px;
}

.polar-item {
width: 100%;
height: 100%;
}

.bottom-section {
margin-top: 1rem;
}

.histogram-container {
background-color: white;
border-radius: 12px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
padding: 1rem;
height: 350px;
}

.technology-dashboard {
padding: 20px;
height: 100vh;
display: flex;
flex-direction: column;
background: #f5f5f5;
}

.page-header {
margin-bottom: 20px;
padding-bottom: 10px;
border-bottom: 2px solid #3498db;
}

.page-title {
font-size: 2rem;
color: #2c3e50;
margin: 0;
text-align: left;
}

.top-section {
display: flex;
flex: 1;
gap: 20px;
margin-bottom: 20px;
height: 0%;
}

.left-panel {
flex: 1;
display: flex;
flex-direction: column;
gap: 15px;
}

.right-panel {
flex: 1;
display: flex;
flex-direction: column;
gap: 15px;
}

.bottom-section {
height: 35%;
}


.map-chart-container {
border-radius: 15px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
background: white;
padding: 5px;
height: 400px;
width:550px;
}

.parallel-chart-container {
border-radius: 15px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
background: white;
padding: 5px;
height: 100px;
width:850px;
}

.line-chart-container {
border-radius: 15px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
background: white;
padding: 5px;
height: 100px;
width:550px;
}


.chart-container {
border-radius: 15px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
background: white;
padding: 5px;
min-height: 100px;
}

.map-container {
flex: 1;
margin-top: 0px;
}

.line-container {
flex: 1;
}

.parallel-container {
flex: 0.6;
}

.histogram-container {
height: 100%;
}

.chart-area {
height: 100%;
width: 100%;
min-height: 200px;
}

/* 极坐标图表区域 */
.polar-charts-container {
position: relative;
flex: 1;
background: white;
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
padding: 30px 15px 15px 15px; 
}
.polar-charts-title {
  position: absolute;
  top:5px;
  left: 17%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
}

.polar-grid {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
height: 100%;
}

.polar-item {
border: 1px solid #eee;
border-radius: 6px;
background: #fafafa;
min-height: 150px;
}


/* 响应式设计 */
@media (max-width: 1400px) {
.top-section {
flex-direction: column;
height: auto;
}

.left-panel, .right-panel {
flex-direction: row;
}

.polar-grid {
grid-template-columns: repeat(2, 1fr);
}

.bottom-section {
height: 300px;
}
}

@media (max-width: 768px) {
.left-panel, .right-panel {
flex-direction: column;
}

.polar-grid {
grid-template-columns: 1fr;
}

.technology-dashboard {
padding: 10px;
}
}
</style>
