import { createRouter, createWebHistory } from 'vue-router'

// Import halaman yang akan digunakan
import Product from '@/views/Product.vue'
import Product2 from '@/views/Product-2.vue'
import Detail from '@/views/Detail.vue'
import ManageProduct from '@/views/ManageProduct.vue'

const routes = [
  { path: '/', redirect: '/product' }, 
  {
    path: '/product',
    name: 'product',
    children: [
      {
        path: '',
        component: Product,
        name: 'order',
        meta: {
          title: { id: `Semua Order`, en: `Order` },
          affix: true
        }
      }, 
      {
        path: 'add',
        hidden: true,
        component: ManageProduct,
        name: 'orderCreate',
        meta: {
          title: { id: 'Manajemen Order', en: 'Order Management' }
        }
      },
      {
        path: 'edit/:id',
        hidden: true,
        component: ManageProduct,
        name: 'orderEdit',
        meta: {
          title: { id: 'Edit Order', en: 'Edit Order' }
        }
      }
    ]
  },
  { path: '/detail', component: Detail, name: 'detail' },
  { path: '/product-2', component: Product2, name: 'product-2' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
