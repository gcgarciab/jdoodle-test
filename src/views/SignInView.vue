<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

async function signin() {
  console.log('singin request');
}
</script>

<template>
  <form
    class="signin h-screen flex items-center justify-center bg-gray-600"
    @submit.prevent="signin()"
  >
    <QCard
      class="w-1/3 shadow-2 mx-auto bg-gray-700 py-8"
      bordered
    >
      <QCardSection class="text-center">
        <div class="text-neutral-100 text-h5 text-weight-bold">Sign in to JDoodle Test</div>
        <div class="text-neutral-400">Sign in below to access your account</div>
      </QCardSection>

      <QCardSection>
        <QInput
          dark
          filled
          v-model="email"
          label="Email Address"
          class="my-5"
          color="green-13"
        />

        <QInput
          dark
          filled
          v-model="password"
          color="green-13"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          class="my-5"
        >
        <template v-slot:append>
          <QIcon
            :name="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
        </QInput>
      </QCardSection>

      <QCardSection>
        <QBtn
          no-caps
          label="Sign in"
          color="green-13"
          class="w-full font-semibold text-lg"
          :loading="loading"
        />
      </QCardSection>
    </QCard>
  </form>
</template>

<style scoped>

</style>
