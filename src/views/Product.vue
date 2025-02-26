<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :md="4">
          <el-button type="primary" size="small" @click="goCreateProduct">{{ language[lang].field.add }}</el-button>
          <el-button type="primary" size="small" @click="handleFilter">Filter</el-button>
        </el-col>
        <el-col :span="10" :offset="10">
          <el-input v-model="searchQuery" :placeholder="language[lang].field.search" class="mb-4" @input="handleSearch" />
        </el-col>
      </el-row>
      
      <!-- Table -->
      <el-table :data="paginatedItems" style="width: 100%">
        <el-table-column label="No" width="50">
          <template #default="{ $index }">
            {{ (currentPage - 1) * pageSize + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="language[lang].field.name" sortable />
        <el-table-column :label="language[lang].field.action" width="150">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="editProduct(row.id)">{{ language[lang].field.edit }}</el-button>
            <el-button type="danger" size="small" class="ml-2" @click="deleteProduct(row.id)">{{ language[lang].field.delete }}</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="filteredItems.length"
        :page-sizes="[10, 20, 30, 50]"
        layout="sizes, prev, pager, next"
        class="mt-4"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { mapState, mapMutations } from 'vuex'
import language from '../language/index'


export default {
  data() {
    return {
      language,
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      items: [],
      totalItems: 0,
      route: useRoute(),
      router: useRouter(),
    }
  },
  computed: {
    ...mapState(['idProduct', 'lang']),
    filteredItems() {
      return this.items.filter(item => 
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredItems.slice(start, end)
    },
  },
  methods: {
    ...mapMutations(['setIdProduct']),
    goCreateProduct() {
      this.setIdProduct(null)
      this.router.push('/product/add')
    },
    async fetchAllData() {
      let allData = []
      let offset = 0
      let hasMore = true
      while (hasMore) {
        const response = await fetch(`https://pokeapi.co/api/v2/berry?offset=${offset}&limit=20`)
        const data = await response.json()
        allData = [...allData, ...data.results.map((item, index) => ({ id: offset + index + 1, name: item.name }))]
        offset += 20
        hasMore = data.next !== null
      }
      this.items = allData
      this.totalItems = allData.length
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
    },
    editProduct(id) {
      this.setIdProduct(id)
      this.router.push(`/product/edit/${id}`)
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    handleSearch() {
      this.currentPage = 1
      this.router.replace({ query: { search: this.searchQuery } })
    },
    handleFilter() {
      this.items.sort((a, b) => a.name.localeCompare(b.name))
    },
    deleteProduct(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
  },
  watch: {
    'route.query.search'(newQuery) {
      if (newQuery !== this.searchQuery) {
        this.searchQuery = newQuery || ''
      }
    },
  },
  mounted() {
    const savedQuery = this.route.query.search
    if (savedQuery) {
      this.searchQuery = savedQuery
    }
    this.fetchAllData()
  },
}
</script>