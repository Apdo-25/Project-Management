<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const username = computed(() => authStore.userDetail.username)
const initials = computed(() => {
  const names = username.value.split(' ')
  let initials = ''
  names.forEach((name) => {
    initials += name.charAt(0).toUpperCase()
  })
  return initials
})
</script>

<template>
  <div class="relative">
    <div
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800 flex justify-center items-center text-xl font-bold text-gray-700 dark:text-gray-100"
    >
      {{ initials }}
    </div>
    <slot />
  </div>
</template>
