<template>
  <div class="app-container">
    <!-- 渐变顶部装饰 -->
    <div class="gradient-header"></div>
    
    <div class="page-header">
      <h1 class="page-title">中国经济发展全景分析</h1>
      <p class="page-subtitle">2019-2024年GDP增长趋势与结构变迁分析</p>
      
      <div class="summary-stats">
        <div class="stat-item" style="--accent: #5470c6;">
          <div class="stat-value">134.9万亿</div>
          <div class="stat-label">2024年GDP总量</div>
          <div class="stat-icon">💰</div>
        </div>
        <div class="stat-item" style="--accent: #91cc75;">
          <div class="stat-value">5.2%</div>
          <div class="stat-label">2024年GDP增长率</div>
          <div class="stat-icon">📊</div>
        </div>
        <div class="stat-item" style="--accent: #ee6666;">
          <div class="stat-value">56.7%</div>
          <div class="stat-label">服务业占比</div>
          <div class="stat-icon">🏗️</div>
        </div>
        <div class="stat-item" style="--accent: #fac858;">
          <div class="stat-value">38.7%</div>
          <div class="stat-label">新能源汽车增长</div>
          <div class="stat-icon">🚗</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard">
      <!-- GDP增长趋势 -->
      <div class="gdpchart-section">
        <div class="section-header">
          <h2><i class="icon icon-trend"></i> 历年GDP增长趋势分析</h2>
          <p>2019-2024年中国经济经历了从高速增长向高质量发展的转型，GDP年均增长率达5.2%。2024年四季度GDP同比增长5.4%，显示经济复苏势头持续巩固。</p>
        </div>
        <div class="chart-container">
          <div ref="gdpChart" class="chart-full"></div>
          <div class="chart-annotations">
            <div class="annotation">
              <div class="annotation-point" style="background-color: #5470c6;"></div>
              <div class="annotation-text">
                <strong>2020年特殊低点：</strong> 受疫情影响GDP增速降至2.3%，成为近十年最低点
              </div>
            </div>
            <div class="annotation">
              <div class="annotation-point" style="background-color: #91cc75;"></div>
              <div class="annotation-text">
                <strong>2021年强劲反弹：</strong> 经济复苏显著，增速达8.1%创近五年新高
              </div>
            </div>
            <div class="trend-prediction">
              <div class="prediction-label">2025年预测：</div>
              <div class="prediction-value">全年GDP增速有望保持在5.0%-5.5%区间</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 产业结构 -->
      <div class="industrychart-section">
        <div class="section-header">
          <h2><i class="icon icon-structure"></i> 产业结构优化分析</h2>
          <p>服务业占比持续提升至56.7%，比上年提高0.4个百分点，成为经济增长主引擎。数字经济核心产业增加值占GDP比重达10.3%。</p>
        </div>
        <div class="chart-container">
          <div class="chart-layout">
            <div ref="industryChart" class="chart-large"></div>
            <div class="industry-stats">
              <div class="industry-stat">
                <div class="stat-value">56.7%</div>
                <div class="stat-label">第三产业占比</div>
                <div class="stat-change">c</div>
              </div>
              <div class="industry-stat">
                <div class="stat-value">36.5%</div>
                <div class="stat-label">第二产业占比</div>
                <div class="stat-change">-0.2% YoY</div>
              </div>
              <div class="industry-stat">
                <div class="stat-value">6.8%</div>
                <div class="stat-label">第一产业占比</div>
                <div class="stat-change">-0.1% YoY</div>
              </div>
              <div class="industry-stat highlight">
                <div class="stat-value">12.3%</div>
                <div class="stat-label">高技术服务业增长</div>
                <div class="stat-change">比全部服务业快6.1个百分点</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 需求侧分析 -->
      <div class="demandchart-section">
        <div class="section-header">
          <h2><i class="icon icon-demand"></i> 需求侧经济指标分析</h2>
          <p>消费对经济增长贡献率达82.5%，是主要拉动力。服务消费增长6.2%，快于商品销售增速。投资结构优化，高技术产业投资增长10.6%。</p>
        </div>
        <div class="chart-container">
          <div ref="demandChart" class="chart-full"></div>
          <div class="demand-insights">
            <div class="insight-card">
              <div class="insight-value">48.8万亿</div>
              <div class="insight-label">社会消费品零售总额</div>
              <div class="insight-change">+3.5% YoY</div>
            </div>
            <div class="insight-card">
              <div class="insight-value">51.4万亿</div>
              <div class="insight-label">固定资产投资</div>
              <div class="insight-change">+3.2% YoY</div>
            </div>
            <div class="insight-card highlight">
              <div class="insight-value">82.5%</div>
              <div class="insight-label">消费贡献率</div>
              <div class="insight-change">经济增长主要动力</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 高技术产业 -->
      <div class="techchart-section">
        <div class="section-header">
          <h2><i class="icon icon-tech"></i> 高技术产业增长表现</h2>
          <p>新质生产力成为经济增长新引擎。新能源汽车产量突破950万辆，连续9年全球第一。太阳能电池产量增长54.0%，出口增长28.4%。</p>
        </div>
        <div class="chart-container">
          <div ref="techChart" class="chart-large"></div>
          <div class="tech-highlights">
            <div class="highlight-item">
              <div class="highlight-value">38.7%</div>
              <div class="highlight-label">新能源汽车增长</div>
              <div class="highlight-desc">全球市场份额达65%</div>
            </div>
            <div class="highlight-item">
              <div class="highlight-value">22.2%</div>
              <div class="highlight-label">集成电路增长</div>
              <div class="highlight-desc">国产化率提升至35%</div>
            </div>
            <div class="highlight-item">
              <div class="highlight-value">26.7%</div>
              <div class="highlight-label">太阳能发电增长</div>
              <div class="highlight-desc">出口增长28.4%</div>
            </div>
            <div class="highlight-item">
              <div class="highlight-value">54.0%</div>
              <div class="highlight-label">太阳能电池产量</div>
              <div class="highlight-desc">全球产能占比超80%</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 支柱产业 -->
      <div class="pillarchart-section">
        <div class="section-header">
          <h2><i class="icon icon-pillar"></i> 八大支柱产业规模分析</h2>
          <p>现代服务业规模达52万亿元，占GDP比重38.5%。新能源汽车产业爆发式增长，产业规模达4.5万亿元，同比增长38.7%。</p>
        </div>
        <div class="chart-container">
          <div ref="pillarChart" class="chart-full"></div>
          <div class="pillar-analysis">
            <div class="sector-breakdown">
              <div class="sector">
                <div class="sector-header">
                  <div class="sector-name">领跑产业</div>
                  <div class="sector-growth">增长率</div>
                </div>
                <div class="sector-item">
                  <div class="name">新能源汽车</div>
                  <div class="growth">38.7%</div>
                </div>
                <div class="sector-item">
                  <div class="name">新材料</div>
                  <div class="growth">15.7%</div>
                </div>
                <div class="sector-item">
                  <div class="name">节能环保</div>
                  <div class="growth">12.1%</div>
                </div>
              </div>
              
              <div class="sector">
                <div class="sector-header">
                  <div class="sector-name">支柱产业</div>
                  <div class="sector-growth">规模</div>
                </div>
                <div class="sector-item">
                  <div class="name">现代服务业</div>
                  <div class="growth">52万亿元</div>
                </div>
                <div class="sector-item">
                  <div class="name">电子信息</div>
                  <div class="growth">8.3万亿元</div>
                </div>
                <div class="sector-item">
                  <div class="name">高端装备制造</div>
                  <div class="growth">7.2万亿元</div>
                </div>
              </div>
            </div>
            
            <div class="key-takeaway">
              <div class="takeaway-icon">💡</div>
              <div class="takeaway-text">
                <strong>核心洞察：</strong> 新质生产力产业增速显著高于传统产业，新能源汽车、新材料、节能环保三大领域平均增速达22.2%，成为经济增长新引擎。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 图表引用
const gdpChart = ref(null)
const industryChart = ref(null)
const demandChart = ref(null)
const techChart = ref(null)
const pillarChart = ref(null)

// 图表实例
let gdpInstance = null
let industryInstance = null
let demandInstance = null
let techInstance = null
let pillarInstance = null

// 初始化图表
const initCharts = () => {
  // GDP增长趋势图 - 扩展为2019-2024年年度数据
  gdpInstance = echarts.init(gdpChart.value)
  gdpInstance.setOption({
    tooltip: { 
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        return params[0].name + '<br/>' + 
               'GDP增长率: ' + params[0].value + '%<br/>' + 
               '工业增加值增速: ' + params[1].value + '%';
      }
    },
    legend: {
      data: ['GDP增长率', '工业增加值增速'],
      top: 30,
      textStyle: {
        color: '#5a5a5a',
        fontSize: 16
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023', '2024'],
      axisLine: {
        lineStyle: {
          color: '#e0e6f0'
        }
      },
      axisLabel: {
        color: '#5a5a5a',
        fontSize: 16,
        margin: 15
      }
    },
    yAxis: {
      type: 'value',
      name: '增长率(%)',
      nameTextStyle: {
        color: '#5a5a5a',
        fontSize: 16,
        padding: [0, 0, 0, 15]
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#e0e6f0'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#f0f4f9'
        }
      },
      axisLabel: {
        color: '#5a5a5a',
        fontSize: 16,
        margin: 10
      }
    },
    series: [
      {
        name: 'GDP增长率',
        type: 'line',
        smooth: true,
        data: [6.1, 2.3, 8.1, 3.0, 5.2, 5.2], // 2019-2024年真实GDP增长率
        lineStyle: {
          width: 5
        },
        symbolSize: 14,
        itemStyle: {
          color: '#5470c6'
        },
        label: {
          show: true,
          position: 'top',
          color: '#5470c6',
          fontSize: 16,
          fontWeight: 'bold',
          formatter: '{c}%',
          padding: [5, 0, 0, 0]
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(84, 112, 198, 0.3)' },
            { offset: 1, color: 'rgba(84, 112, 198, 0.1)' }
          ])
        }
      },
      {
        name: '工业增加值增速',
        type: 'line',
        smooth: true,
        data: [5.7, 2.4, 9.6, 3.4, 4.4, 5.0], // 对应年份的工业增加值增速
        lineStyle: {
          width: 5
        },
        symbolSize: 14,
        itemStyle: {
          color: '#91cc75'
        },
        label: {
          show: true,
          position: 'bottom',
          color: '#91cc75',
          fontSize: 16,
          fontWeight: 'bold',
          formatter: '{c}%',
          padding: [0, 0, 5, 0]
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(145, 204, 117, 0.3)' },
            { offset: 1, color: 'rgba(145, 204, 117, 0.1)' }
          ])
        }
      }
    ]
  })

  // 产业结构图 - 保持不变
  industryInstance = echarts.init(industryChart.value)
  industryInstance.setOption({
    tooltip: { show: false },
    legend: {
      orient: 'horizontal',
      bottom: 30,
      textStyle: {
        color: '#5a5a5a',
        fontSize: 16
      },
      formatter: (name) => {
        const data = [
          { value: 9.14, name: '第一产业' },
          { value: 49.21, name: '第二产业' },
          { value: 76.56, name: '第三产业' }
        ]
        const item = data.find(d => d.name === name)
        return `${name}: ${item.value}万亿元`
      },
      itemGap: 25
    },
    series: [
      {
        name: '产业结构',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 3
        },
        label: {
          show: true,
          formatter: '{b}: {d}%\n{c}万亿元',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#2c3e50',
          lineHeight: 22,
          minMargin: 15,
          padding: [5, 10],
          align: 'center',
          verticalAlign: 'middle'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          length: 20,
          length2: 25,
          smooth: true,
          minTurnAngle: 90
        },
        data: [
          { value: 9.14, name: '第一产业' },
          { value: 49.21, name: '第二产业' },
          { value: 76.56, name: '第三产业' }
        ],
        color: ['#91cc75', '#5470c6', '#ee6666']
      }
    ]
  })

  // 需求侧指标图 - 保持不变
  demandInstance = echarts.init(demandChart.value)
  demandInstance.setOption({
    tooltip: { show: false },
    legend: {
      data: ['总额(万亿元)', '增长率(%)'],
      top: 30,
      textStyle: {
        color: '#5a5a5a',
        fontSize: 16
      },
      itemGap: 25
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['社会消费品零售', '固定资产投资', '货物进出口'],
      axisLine: {
        lineStyle: {
          color: '#e0e6f0'
        }
      },
      axisLabel: {
        color: '#5a5a5a',
        fontSize: 16,
        interval: 0,
        margin: 20
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '总额(万亿元)',
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#5470c6'
          }
        },
        axisLabel: {
          color: '#5a5a5a',
          fontSize: 16,
          margin: 15
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#f0f4f9'
          }
        }
      },
      {
        type: 'value',
        name: '增长率(%)',
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ee6666'
          }
        },
        axisLabel: {
          color: '#5a5a5a',
          fontSize: 16,
          margin: 15
        },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '总额(万亿元)',
        type: 'bar',
        barWidth: '30%',
        data: [48.8, 51.4, 43.8],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5470c6' },
            { offset: 1, color: '#83a0ed' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}万亿',
          color: '#5470c6',
          fontSize: 16,
          fontWeight: 'bold',
          padding: [5, 0, 0, 0]
        }
      },
      {
        name: '增长率(%)',
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 14,
        data: [3.5, 3.2, 5.0],
        itemStyle: {
          color: '#ee6666'
        },
        lineStyle: {
          width: 4
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
          color: '#ee6666',
          fontSize: 16,
          fontWeight: 'bold',
          padding: [5, 0, 0, 0]
        }
      }
    ]
  })

  // 高技术产品增长图 - 保持不变
  techInstance = echarts.init(techChart.value)
  techInstance.setOption({
    tooltip: { show: false },
    radar: {
      indicator: [
        { name: '新能源汽车', max: 45 },
        { name: '集成电路', max: 25 },
        { name: '工业机器人', max: 15 },
        { name: '太阳能发电', max: 30 },
        { name: '航空设备', max: 40 }
      ],
      radius: '70%',
      splitArea: {
        areaStyle: {
          color: ['rgba(84, 112, 198, 0.15)', 'rgba(84, 112, 198, 0.25)'],
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(84, 112, 198, 0.4)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(84, 112, 198, 0.4)'
        }
      },
      name: {
        textStyle: {
          color: '#5a5a5a',
          fontSize: 16,
          padding: [5, 5]
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [38.7, 22.2, 14.2, 26.7, 39.5],
            name: '增长率',
            symbolSize: 12,
            areaStyle: {
              color: 'rgba(84, 112, 198, 0.4)'
            },
            lineStyle: {
              width: 3,
              color: '#5470c6'
            },
            itemStyle: {
              color: '#5470c6'
            },
            label: {
              show: true,
              formatter: '{c}%',
              position: 'top',
              color: '#2c3e50',
              fontSize: 14,
              fontWeight: 'bold',
              padding: [5, 0, 0, 0]
            }
          }
        ]
      }
    ]
  })

  // 八大支柱产业图 - 保持不变
  pillarInstance = echarts.init(pillarChart.value)
  pillarInstance.setOption({
    tooltip: { show: false },
    legend: {
      data: ['产业规模(万亿元)', '增长率(%)'],
      top: 30,
      textStyle: {
        color: '#5a5a5a',
        fontSize: 16
      },
      itemGap: 25
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '22%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e0e6f0'
        }
      },
      axisLabel: {
        color: '#5a5a5a',
        fontSize: 16,
        margin: 15
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#f0f4f9'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: [
        '现代服务业',
        '电子信息产业',
        '数字创意',
        '高端装备制造',
        '新能源汽车',
        '生物医药',
        '新材料',
        '节能环保'
      ],
      axisLine: {
        lineStyle: {
          color: '#e0e6f0'
        }
      },
      axisLabel: {
        color: '#5a5a5a',
        fontSize: 16,
        margin: 15
      }
    },
    series: [
      {
        name: '产业规模(万亿元)',
        type: 'bar',
        data: [52.0, 8.3, 3.2, 7.2, 4.5, 1.5, 2.8, 3.5],
        label: {
          show: true,
          position: 'right',
          formatter: '{c}万亿',
          color: '#5470c6',
          fontSize: 16,
          fontWeight: 'bold',
          padding: [0, 0, 0, 20]
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#83a0ed' },
            { offset: 1, color: '#5470c6' }
          ])
        }
      },
      {
        name: '增长率(%)',
        type: 'scatter',
        data: [5.0, 10.6, 6.2, 8.7, 38.7, 8.9, 15.7, 12.1],
        symbolSize: function(val) {
          return val * 1.2;
        },
        itemStyle: {
          color: '#ee6666'
        },
        label: {
          show: true,
          formatter: '{c}%',
          position: 'right',
          offset: [5, 0],
          color: '#ee6666',
          fontSize: 16,
          fontWeight: 'bold',
          padding: [0, 0, 0, 25]
        }
      }
    ]
  })
}

// 响应式调整
const handleResize = () => {
  gdpInstance?.resize()
  industryInstance?.resize()
  demandInstance?.resize()
  techInstance?.resize()
  pillarInstance?.resize()
}

onMounted(() => {
  setTimeout(() => {
    initCharts()
    window.addEventListener('resize', handleResize)
  }, 300)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  gdpInstance?.dispose()
  industryInstance?.dispose()
  demandInstance?.dispose()
  techInstance?.dispose()
  pillarInstance?.dispose()
})
</script>

<style scoped>
/* 基础样式保持不变，仅调整注释说明 */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #5470c6;
  --accent-color: #ee6666;
  --success-color: #91cc75;
  --warning-color: #fac858;
  --info-color: #73c0de;
  --background-light: #f8fafd;
  --border-color: #e0e6f0;
  --text-primary: #2c3e50;
  --text-secondary: #5a5a5a;
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.12);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.app-container {
  position: relative;
  background-color: #f9fbfd;
  min-height: 100vh;
  padding-bottom: 60px;
}

.gradient-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background: linear-gradient(135deg, #5470c6 0%, #73c0de 100%);
  z-index: 0;
  border-radius: 0 0 30% 30%;
}


/* 页头样式 */
.page-header {
  position: relative;
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 30px 40px;
  z-index: 1;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.6;
  font-weight: 400;
}

.summary-stats {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.stat-item {
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  border-top: 3px solid var(--accent);
  z-index: 1;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--accent);
}

.stat-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
  z-index: 2;
  position: relative;
}

.stat-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.8rem;
  opacity: 0.15;
  z-index: 1;
}

/* 图表区域样式 */
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 30px;
}

.gdpchart-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 1000px;
}

.industrychart-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 750px;
}

.demandchart-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 950px;
}

.techchart-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 900px;
}

.pillarchart-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 1200px;
}

.chart-section:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.section-header {
  padding: 30px 40px 20px;
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-header p {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 1200px;
}

.chart-container {
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
}

/* 图表尺寸优化 */
.chart-full {
  height: 580px;
  width: 100%;
  min-height: 500px;
  margin-bottom: 30px;
}

.chart-large {
  height: 500px;
  width: 100%;
  min-height: 450px;
  margin-bottom: 30px;
}

.chart-layout {
  display: flex;
  gap: 30px;
  width: 100%;
}

/* 注释和统计区域 */
.chart-annotations {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
}

.annotation {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  flex: 1;
  min-width: 45%;
}

.annotation-point {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}

.annotation-text {
  font-size: 1.15rem;
  color: var(--text-primary);
  line-height: 1.7;
}

.trend-prediction {
  background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%);
  border-left: 4px solid var(--secondary-color);
  padding: 20px 25px;
  border-radius: 0 12px 12px 0;
  flex: 1;
  min-width: 100%;
  margin-top: 20px;
}

.prediction-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 8px;
}

.prediction-value {
  font-size: 1.25rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* 行业统计卡片 */
.industry-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 0;
  width: 35%;
}

.industry-stat {
  height: 60px;
  flex: 1 1 100%;
  min-width: 100%;
  background: var(--background-light);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid var(--border-color);
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.industry-stat.highlight {
  border-left: 4px solid var(--success-color);
  background: linear-gradient(to right, #f9fbe7, #ffffff);
}

.industry-stat:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.stat-change {
  font-size: 1rem;
  color: var(--success-color);
  font-weight: 500;
}

/* 需求侧洞察卡片 */
.demand-insights {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 30px;
}

.insight-card {
  flex: 1;
  min-width: 220px;
  background: var(--background-light);
  border-radius: 12px;
  padding: 25px;
  border-top: 4px solid var(--border-color);
  transition: all 0.3s ease;
}

.insight-card.highlight {
  border-top: 4px solid var(--accent-color);
  background: linear-gradient(to bottom, #fde9e9, #ffffff);
}

.insight-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.insight-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.insight-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.insight-change {
  font-size: 1rem;
  color: var(--secondary-color);
  font-weight: 500;
}

/* 高技术亮点 */
.tech-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 30px;
}

.highlight-item {
  flex: 1;
  min-width: 220px;
  background: var(--background-light);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  border-color: var(--secondary-color);
}

.highlight-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
}

.highlight-label {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
}

.highlight-desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
}

/* 支柱产业分析 */
.pillar-analysis {
  margin-top: 30px;
}

.sector-breakdown {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.sector {
  flex: 1;
  background: var(--background-light);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.sector-header {
  display: flex;
  justify-content: space-between;
  padding: 20px 25px;
  background: #e3f2fd;
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.15rem;
}

.sector-item {
  display: flex;
  justify-content: space-between;
  padding: 18px 25px;
  border-bottom: 1px solid var(--border-color);
  font-size: 1.15rem;
}

.sector-item:last-child {
  border-bottom: none;
}

.sector-item .name {
  color: var(--text-secondary);
}

.sector-item .growth {
  font-weight: 700;
  color: var(--secondary-color);
}

.key-takeaway {
  background: linear-gradient(135deg, #f9fbe7 0%, #ffffff 100%);
  border-left: 4px solid var(--success-color);
  padding: 25px 30px;
  border-radius: 0 12px 12px 0;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.takeaway-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.takeaway-text {
  font-size: 1.2rem;
  color: var(--text-primary);
  line-height: 1.7;
}

/* 图标样式 */
.icon {
  font-size: 1.6rem;
}

.icon-trend:before { content: "📈"; }
.icon-structure:before { content: "🏗️"; }
.icon-demand:before { content: "🛒"; }
.icon-tech:before { content: "🚀"; }
.icon-pillar:before { content: "🏢"; }

/* 响应式调整 */
@media (max-width: 1600px) {
  .chart-full {
    height: 550px;
  }
  .chart-large {
    height: 480px;
  }
}

@media (max-width: 1400px) {
  .summary-stats {
    gap: 20px;
  }
  
  .stat-item {
    min-width: 180px;
    padding: 20px 25px;
  }
  
  .stat-value {
    font-size: 2rem;
  }
}

@media (max-width: 1200px) {
  .chart-full {
    height: 520px;
  }
  .chart-large {
    height: 450px;
  }
  
  .chart-layout {
    flex-direction: column;
  }
  
  .industry-stats {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .industry-stat {
    min-width: calc(50% - 15px);
  }
}

@media (max-width: 992px) {
  .page-title {
    font-size: 2.4rem;
  }
  
  .page-subtitle {
    font-size: 1.2rem;
  }
  
  .chart-full {
    height: 480px;
  }
  .chart-large {
    height: 420px;
  }
  
  .sector-breakdown {
    flex-direction: column;
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 30px 20px;
  }
  
  .page-title {
    font-size: 2.0rem;
  }
  
  .summary-stats {
    gap: 15px;
  }
  
  .stat-item {
    min-width: calc(50% - 15px);
    padding: 18px 20px;
  }
  
  .stat-value {
    font-size: 1.8rem;
  }
  
  .section-header {
    padding: 25px 25px 15px;
  }
  
  .section-header h2 {
    font-size: 1.6rem;
  }
  
  .section-header p {
    font-size: 1.05rem;
  }
  
  .chart-container {
    padding: 25px;
  }
  
  .chart-full {
    height: 450px;
  }
  .chart-large {
    height: 380px;
  }
  
  .annotation {
    min-width: 100%;
  }
}

@media (max-width: 576px) {
  .stat-item {
    min-width: 100%;
  }
  
  .chart-full {
    height: 400px;
  }
  .chart-large {
    height: 350px;
  }
  
  .industry-stat,
  .insight-card,
  .highlight-item {
    min-width: 100%;
  }
  
  .section-header,
  .chart-container {
    padding: 20px;
  }
  
  .chart-full {
    height: 380px;
  }
  .chart-large {
    height: 320px;
  }
}
</style>