import { createRouter, createWebHashHistory } from 'vue-router'

import PowerView from '@/views/power-view.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "powerView",
      component: PowerView
    }
  ]
})

export default router