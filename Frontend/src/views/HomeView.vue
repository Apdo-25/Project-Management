<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/main";
import {

} from "@mdi/js";

import SectionMain from "@/components/SectionMain.vue";
import Layout from "@/layouts/Layout.vue";


const authStore = useAuthStore();

const clientBarItems = computed(() => authStore.clients.slice(0, 4));

const transactionBarItems = computed(() => authStore.history);

</script>

<template>
  <Layout>
    <SectionMain>
   
 

    </SectionMain>
  </Layout>
</template>
