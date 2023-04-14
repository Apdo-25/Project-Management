import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import { darkModeKey, styleKey } from '@/config.js'

import './assets/main.css'

//Create Pinia
const pinia = createPinia()

//Create Vue app
createApp(App).use(router).use(pinia).mount('#app')

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if (
  (!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage[darkModeKey] === '1'
) {
  styleStore.setDarkMode(true)
}

//Default title tag
const defaultDocummentTitle = 'PM-Project'

//Set title tag
router.afterEach((to) => {
  document.title = to.meta.title || defaultDocummentTitle
})
