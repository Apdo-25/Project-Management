<script setup>
import { useAuthStore } from '@/stores/auth'
import UserAvatar from '@/components/UserAvatar.vue'

const authStore = useAuthStore()
</script>

<template>
  <UserAvatar :username="authStore.userDetail.username" :avatar="mainStore.userAvatar">
    <slot />
  </UserAvatar>
</template>
