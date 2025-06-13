<template>
  <div class="layout-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">中国<br>社会发展</h2>
      </div>
      <nav>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link 
              to="/main/economy" 
              class="nav-link"
              active-class="active"
            >
              📊 经济
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/main/environment" 
              class="nav-link"
              active-class="active"
            >
              📈 环境
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/main/technology" 
              class="nav-link"
              active-class="active"
            >
              📋 科技
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/main/medicine" 
              class="nav-link"
              active-class="active"
            >
              🔍 医疗
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/main/education" 
              class="nav-link"
              active-class="active"
            >
              📄 教育
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Layout组件逻辑
</script>
