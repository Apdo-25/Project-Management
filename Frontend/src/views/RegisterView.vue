<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentHeader from "@/components/CardBoxComponentHeader.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import sectionTitle from "@/components/sectionTitle.vue";
import LayoutS from "@/layouts/LayoutS.vue";
import { useMainStore, type RegisterData } from "@/stores/main.ts"

const mainStore = useMainStore()
const router = useRouter()

const registerData = reactive<RegisterData>({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password_confirm: "",
})

const errorMessage = ref<string>("")
 

async function submit(){
  await mainStore.register(registerData)
    .then(res => {
      router.replace({name: "login"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}

</script>

<template>
  <LayoutS>
    <SectionFullScreen v-slot="{ cardClass }" bg="darkBg">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <p v-if="errorMessage" class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert"> {{ errorMessage }}</p>
        <FormField label="Username" help="Please enter your username">
          <FormControl v-model="registerData.username" :icon="mdiAccount" name="name" />
        </FormField>

        <FormField label="Email" help="Please enter your email">
          <FormControl
            v-model="registerData.email"
            :icon="mdiAccount"
            name="email"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="registerData.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
         
          />
        </FormField>

        <FormField label="Confirm Password" help="Please Confirm your password">
          <FormControl
            v-model="registerData.password_confirm"
            :icon="mdiAsterisk"
            type="password"
            name="password"
        
          />
        </FormField>
          
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="success" label="Register" />
            <BaseButton to="/login" color="info" outline label="Login" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutS>
</template>
