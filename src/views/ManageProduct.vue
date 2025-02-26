<template>
  <div>
    <h1 class="mb-5">{{ idProduct ? language[lang].field.edit : language[lang].field.add }} Product</h1>
    <el-form ref="formRef" :model="form" label-width="100px">
      <el-form-item :label="language[lang].field.title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item :label="language[lang].field.price">
        <el-input v-model.number="form.price" type="number" />
      </el-form-item>
      <el-form-item :label="language[lang].field.description">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item :label="language[lang].field.image">
        <el-input v-model="form.image" />
      </el-form-item>
      <el-form-item :label="language[lang].field.category">
        <el-select v-model="form.category" placeholder="Please select a category">
          <el-option label="Electronics" value="electronics" />
          <el-option label="Men's clothing" value="men's clothing" />
          <el-option label="Jewelry" value="jewelery" />
          <el-option label="Women's clothing" value="women's clothing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="mr-5" type="primary" @click="onSubmit">
          {{ idProduct ? language[lang].field.edit : language[lang].field.add }}
        </el-button>
        <router-link to="/product">
          <el-button>{{ language[lang].field.cancel }}</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { mapState } from 'vuex'
import language from '../language/index'

export default {
  data() {
    return {
      language,
      form: {
        title: '',
        price: 0,
        description: '',
        image: null,
        category: null,
        route: useRoute(),
			  router: useRouter(),
      }
    }
  },
  computed: {
    ...mapState(['idProduct', 'lang']),
  },
  async mounted() {
    if (this.idProduct) {
      const response = await fetch(`https://fakestoreapi.com/products/${this.idProduct}`) 
      const data = await response.json()

      for (let key in data) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key]
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      try {

        const api = this.idProduct
          ? `https://fakestoreapi.com/products/${this.idProduct}`
          : "https://fakestoreapi.com/products"

        const response = await fetch(api, {
          method: this.idProduct ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.form.title,
            price: this.form.price,
            description: this.form.description,
            image: this.form.image,
            category: this.form.category

          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()

        await this.$message({
          message: this.language[this.lang].info.success[this.idProduct ? "edit" : "add"],
          type: "success",
        })
      } catch (error) {
        console.error("Error:", error)
        this.$message({
          message: "Failed to process the request. Please try again.",
          type: "error",
        })
      }
    }
  }
}
</script>