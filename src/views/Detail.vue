<template>
  <el-select
    v-model="value"
    placeholder="Select"
    size="large"
    style="width: 240px"
    @change="fetchDetail"
  >
    <el-option
      v-for="item in listDetail"
      :key="item.id"
      :label="item.name"
      :value="item.name"
    />
  </el-select>

  <el-card v-if="loading" class="p-6 shadow-lg rounded-lg border border-gray-200 mt-10">
    <div class="animate-pulse space-y-4">
      <div class="h-6 bg-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-gray-300 rounded w-1/2"></div>
      <div class="h-4 bg-gray-300 rounded w-full"></div>
      <div class="h-4 bg-gray-300 rounded w-5/6"></div>
      <div class="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  </el-card>

  <el-card v-else-if="detail" class="p-6 shadow-lg rounded-lg border border-gray-200 mt-10">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ detail.name }}</h2>
    
    <el-descriptions title="Detail Information" border class="mb-6">
      <el-descriptions-item label="Growth Time">{{ detail.growth_time }}</el-descriptions-item>
      <el-descriptions-item label="Max Harvest">{{ detail.max_harvest }}</el-descriptions-item>
      <el-descriptions-item label="Gift Power">{{ detail.natural_gift_power }}</el-descriptions-item>
      <el-descriptions-item label="Size">{{ detail.size }}</el-descriptions-item>
      <el-descriptions-item label="Smoothness">{{ detail.smoothness }}</el-descriptions-item>
      <el-descriptions-item label="Soil Dryness">{{ detail.soil_dryness }}</el-descriptions-item>
    </el-descriptions>
    
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-700">Firmness</h3>
        <p class="text-gray-600">{{ detail.firmness.name }}</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-700">Flavors</h3>
        <ul class="list-disc pl-5 text-gray-600">
          <li v-for="flavor in detail.flavors" :key="flavor.name">
            {{ flavor.name }} (Potency: {{ flavor.potency }})
          </li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-700">Item</h3>
        <p class="text-gray-600">{{ detail.item.name }}</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-700">Type</h3>
        <p class="text-gray-600">{{ detail.type.name }}</p>
      </div>
    </div>
  </el-card>
</template>
  
<script>
export default {
  data() {
    return {
      value: null,
      listDetail: [],
      detail: null,
      loading: false
    }
  },
  async mounted() {
    const response = await fetch('https://pokeapi.co/api/v2/berry') 
    const data = await response.json()
    this.listDetail = data.results.map((item, index) => ({ id: index + 1, name: item.name }))
  },
  methods: {
    async fetchDetail() {
      this.loading = true
      const response = await fetch(`https://pokeapi.co/api/v2/berry/${this.value}`)
      const data = await response.json()

      if (data) {
        this.loading = false
      }
      this.detail = {
        id: data.id,
        name: data.name,
        growth_time: data.growth_time,
        max_harvest: data.max_harvest,
        natural_gift_power: data.natural_gift_power,
        size: data.size,
        smoothness: data.smoothness,
        soil_dryness: data.soil_dryness,
        firmness: data.firmness,
        flavors: data.flavors.map(f => ({ name: f.flavor.name, potency: f.potency })),
        item: data.item,
        type: data.natural_gift_type,
      }
    },
  }
}
</script>