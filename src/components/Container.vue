<template>
  <el-container class="h-screen">
    <!-- Sidebar -->
    <el-aside :width="isSidebarOpen ? '250px' : '0px'" class="bg-[rgb(48,65,86)] text-white transition-all duration-300 overflow-hidden">
      <div class="p-4 text-lg font-bold text-center">KATAKIMA</div>
      <el-menu 
        :default-active="activeMenu" 
        class="border-none bg-transparent text-white custom-menu"
        @select="handleMenuSelect"
      >
        <el-menu-item index="product">
          <router-link to="/product">
            <el-icon><Ticket /></el-icon>
            <span>Assesment 1</span>
          </router-link>
        </el-menu-item>
        <router-link to="/detail">
          <el-menu-item index="detail">
            <el-icon><Document /></el-icon>
            <span>Detail</span>
          </el-menu-item>
        </router-link>
        <router-link to="/product-2">
          <el-menu-item index="product-2">
            <el-icon><Ticket /></el-icon>
            <span>Assesment 2</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- Navbar -->
      <el-header class="flex items-center justify-between px-6 py-4 bg-white shadow">
        <el-button @click="toggleSidebar" class="xl:hidden">
          <el-icon><Menu /></el-icon>
        </el-button>

        <div class="flex items-center">
          <el-select v-model="lang" placeholder="Select" style="width: 180px" @change="toggleLang">
            <template #prefix>
              <img v-if="lang === 'id'" src="@/assets/icon/flag-id.svg" alt="Star Icon" class="w-4 h-4 absolute left-2 top-2" />
              <img v-else src="@/assets/icon/flag-us.svg" alt="Star Icon" class="w-4 h-4 absolute left-2 top-2" />
            </template>
            <el-option
              v-for="item in language"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
              <span class="ml-5">{{ item.name }}</span>
              <img v-if="item.value === 'id'" src="@/assets/icon/flag-id.svg" alt="Star Icon" class="w-4 h-4 absolute left-2 top-2" />
              <img v-else src="@/assets/icon/flag-us.svg" alt="Star Icon" class="w-4 h-4 absolute left-2 top-2" />
            </el-option>
          </el-select>
          <div class="flex items-center ml-5">
            <div class="rounded-full w-8 h-8 bg-red-100" />
            <span class="ml-2">Username</span>
          </div>
        </div>
      </el-header>

      <!-- Main Content -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElButton,
  ElMenu,
  ElMenuItem,
  ElIcon
} from 'element-plus'
import { HomeFilled, Document, Setting, Menu, Ticket } from '@element-plus/icons-vue'
import { mapState, mapMutations } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElIcon,
    HomeFilled, 
    Document, 
    Setting, 
    Ticket,
    Menu
  },
  data() {
    return {
      isSidebarOpen: true,
      activeMenu: 'dashboard',
      route: useRoute(),
      language: [
        {
          name: 'Bahasa Indonesia',
          value: 'id'
        },
        {
          name: 'English',
          value: 'en'
        }
      ],
      router: useRouter(),
    }
  },
  watch: {
    '$route.path'(newName) {
      this.activeMenu = newName.split('/')[1] || 'dashboard'
    }
  },
  computed: {
    ...mapState(['lang']),
  },
  mounted() {
    if (this.route.name) {
      this.activeMenu = this.route.name
    }
  },
  methods: {
    ...mapMutations(['setToggleLang']),
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    handleMenuSelect(index) {
      this.activeMenu = index
    },
    toggleLang(lang) {
      this.setToggleLang(lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    },
  },
}
</script>

<style scoped>
/* Pastikan elemen menu memiliki background custom */
:deep(.el-menu) {
  background-color: rgb(48, 65, 86) !important
}

/* Warna teks menu */
:deep(.el-menu-item) {
  color: white !important
}

/* Hover effect */
:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important
}

/* Warna saat aktif */
:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 255, 255, 0.2) !important
}
:deep(.el-select__prefix, .el-select__suffix) {
  margin-right: 14px !important
}
</style>

