<script setup lang="ts">
import router from '@/router';
import useAuthStore from '@/stores/auth';
import { computed, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import type { AuthCredentials } from '@/common/interfaces';
import { email, minLength, required,  } from '@vuelidate/validators'
import { checkFormKeyError, showFormKeyError } from '@/common/utils';

const loading = ref(false);
const showPassword = ref(false);
const authStore = useAuthStore();
const authForm = reactive<AuthCredentials>({
  email: '',
  password: '',
});

const rules = computed(() => ({
  email: { required, email },
  password: {
    required,
    minLength: minLength(8),
  },
}));

const v$ = useVuelidate(rules, authForm);

async function signin() {
  if (v$.value.$invalid) {
    console.log('invalid');
    v$.value.$touch();
    return;
  }

  loading.value = true;

  try {
    await authStore.signIn(authForm);
    // Go to Home view
    await router.push({ name: 'Home' });
  } catch(error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form
    class="signin h-screen flex items-center justify-center bg-gray-200"
    @submit.prevent="signin()"
  >
    <QCard
      class="w-1/3 shadow-2 mx-auto bg-gray-500 py-8"
      bordered
    >
      <QCardSection class="text-center">
        <div class="text-neutral-100 text-h5 text-weight-bold">Sign in to JDoodle Test</div>
        <div class="text-neutral-300">Sign in below to access your account</div>
      </QCardSection>

      <QCardSection>
        <QInput
          dark
          filled
          v-model="authForm.email"
          label="Email Address"
          class="my-5"
          color="green-13"
          :error="checkFormKeyError(v$, 'email')"
          :error-message="showFormKeyError(v$, 'email')"
        />

        <QInput
          dark
          filled
          v-model="authForm.password"
          color="green-13"
          label="Password"
          class="my-5"
          :type="showPassword ? 'text' : 'password'"
          :error="checkFormKeyError(v$, 'password')"
          :error-message="showFormKeyError(v$, 'password')"
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
          type="submit"
          label="Sign in"
          color="green-13"
          class="w-full font-semibold text-lg"
          :loading="loading"
        >
          <template v-slot:loading>
            <QSpinnerFacebook />
          </template>
        </QBtn>
      </QCardSection>
    </QCard>
  </form>
</template>

<style scoped>

</style>
