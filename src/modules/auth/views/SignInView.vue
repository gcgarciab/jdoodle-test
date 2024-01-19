<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores';
import type { AuthCredentials } from '@/modules/auth/interfaces';
import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import { checkFormKeyError, showFormKeyError } from '@/common/utils';

const authStore = useAuthStore();
const showPassword = ref<boolean>(false);
const { loading, startLoading, stopLoading } = useLoading();

const authForm = reactive<AuthCredentials>({
  email: '',
  password: '',
});

const rules = computed((): ValidationArgs => ({
  email: { required, email },
  password: {
    required,
    minLength: minLength(8),
  },
}));

const v$ = useVuelidate(rules, authForm);

/**
 * Check if form values are valid and calls
 * 'signIn' action with loading state.
 */
async function signIn() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  try {
    startLoading();
    await authStore.signIn(authForm);
    // Go to Home view
    router.push({ name: 'Home' });
  } catch(error) {
    console.log(error);
  } finally {
    stopLoading();
  }
}
</script>

<template>
  <form
    class="sign-in"
    @submit.prevent="signIn()"
  >
    <QCard
      class="form-wrapper"
      bordered
    >
      <QCardSection class="text-center">
        <div class="form-title">Sign in to JDoodle Test</div>
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
            <QSpinner />
          </template>
        </QBtn>
      </QCardSection>
    </QCard>
  </form>
</template>

<style scoped>
.sign-in {
  @apply h-screen flex items-center justify-center bg-gray-200;
}

.form-wrapper {
  @apply w-1/3 shadow-md mx-auto bg-gray-500 py-8;
}

.form-title {
  @apply text-neutral-100 text-2xl font-bold;
}
</style>
