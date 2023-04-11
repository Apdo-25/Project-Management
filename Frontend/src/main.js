import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

//Create Pinia
const pinia = createPinia()

//Create Vue app
createApp(App).use(router).use(pinia).mount('#app')

//Default title tag
const defaultDocummentTitle = 'PM-Project'

//Set title tag
router.afterEach((to) => {
  document.title = to.meta.title || defaultDocummentTitle
})
