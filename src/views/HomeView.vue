<script setup lang="ts">
import router from '@/router';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import logo from '@/assets/images/logo.png';
import { useAuthStore, useExamStore } from '@/stores';

const authStore = useAuthStore();
const examStore = useExamStore();
const showUserMenu = ref(false);
const { currentUser } = storeToRefs(authStore);

/**
 * Calls 'signOut' method and redirects user
 * to 'SignIn' route.
 */
async function signOut() {
  authStore.signOut();
  router.push({ name: 'SignIn' })
}

watch(
  [authStore.$state, examStore.$state],
  ([newAuthState, newExamState]) => {
    // console.log('auth', newAuthState);
    // console.log('exam', newExamState);
    // Persist the whole state to the local storage whenever it changes
    localStorage.setItem('authStore', JSON.stringify(newAuthState));
    localStorage.setItem('examStore', JSON.stringify(newExamState));
  },
  { deep: true },
)
</script>

<template>
  <section class="home">
    <div class="header-top h-16 bg-gray-600 pl-10 flex justify-between items-center">
      <QImg
        :src="logo"
        fit="cover"
        height="60px"
        width="140px"
      />

      <div class="account-info">
        <QBtn
          flat
          no-caps
          color="white"
          icon="mdi-account"
          :label="currentUser"
          class="py-5 rounded-none"
          @click="showUserMenu = !showUserMenu"
        >
          <QIcon
            :name="showUserMenu ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            class="ml-2"
          />

          <QMenu
            fit
            class="rounded-none"
          >
            <QItem
              clickable
              class="bg-gray-500 text-neutral-100 flex items-center"
              @click="signOut()"
            >
              <QIcon
                name="mdi-logout"
                size="22px"
                class="mr-3"
              />
              <QItemSection>Sign out</QItemSection>
            </QItem>
          </QMenu>
        </QBtn>
      </div>
    </div>

    <router-view />
  </section>
</template>

<style scoped>

</style>
