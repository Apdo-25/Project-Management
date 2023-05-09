<script setup>
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import LayoutS from '@/layouts/LayoutS.vue'
import sectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
</script>

<template>
  <Layout>
    <LayoutS>
      <SectionMain>
        <sectionTitle> <h2 class="text-xl font-semibold">404</h2> </sectionTitle>
        <CardBox>
          <CardBoxComponentBody>
            <p>Page not found</p>
          </CardBoxComponentBody>
        </CardBox>
      </SectionMain>
    </LayoutS>
  </Layout>
</template>
