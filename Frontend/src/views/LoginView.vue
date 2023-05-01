<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import layouts from "@/layouts/layoutS.vue";
import { useMainStore, LoginData } from "@/stores/main.ts"

const mainStore = useMainStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  email: "",
  password: "",
})

const errorMessage = ref<string>("")
 

async function submit(){
  await mainStore.login(loginData)
    .then(res => {
      router.replace({name: "user"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}
</script>

<template>
  <layouts>
    <SectionFullScreen v-slot="{ cardClass }" bg="darkBg">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="email" help="Please enter your email">
          <FormControl
            v-model="loginData.email"
            :icon="mdiAccount"
            name="email"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="loginData.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/Register" color="info" outline label="Register" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </layouts>
</template>