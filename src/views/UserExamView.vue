<script setup lang="ts">
import { useExamStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

import CodeEditor from '@/common/components/CodeEditor.vue';
import type { ScriptBody } from '@/common/interfaces';

const examStore = useExamStore();
const { questions, currentLanguage, currentIndex, currentQuestion, jdoodleToken } = storeToRefs(examStore);

const jdoodleCredentials = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
}

function submitQuestion() {
  console.log('Submit');
}

async function testCode(script: string) {
  const answerData: ScriptBody = {
    ...jdoodleCredentials,
    language: currentLanguage.value,
    versionIndex: '0',
    script,
  };

  await examStore.validateAnswer(answerData);
  console.log('test');
}

onBeforeMount(async () => {
  examStore.selectQuestions();
  await examStore.getJDoodleToken(jdoodleCredentials);
});
</script>

<template>
  <section
    v-if="questions.length"
    class="user-test w-screen grid grid-cols-12 bg-gray-700"
  >
    <div class="questions col-span-3 flex flex-nowrap">
      <div class="quick-access">
        <QTabs
          v-model="currentIndex"
          vertical
          class="w-14 bg-gray-800 h-screen"
          active-color="green-13"
        >
          <QTab
            v-for="(question, index) in questions"
            :key="question.id"
            class="h-14 text-gray-200 cursor-pointer"
            :name="index + 1"
          >
            <span class="text-2xl font-semibold">{{ index + 1 }}</span>
          </QTab>
        </QTabs>
      </div>


      <div
        v-if="currentQuestion"
        class="current-question px-8 py-14 w-full text-white"
      >
        <h2 class="question-name text-xl font-semibold">{{ currentQuestion.name }}</h2>

        <p class="description">{{ currentQuestion.description }}</p>

        <p class="description whitespace-pre-line">
          <strong class="block mb-5">Example:</strong>
          {{ currentQuestion.example }}
        </p>
      </div>
    </div>

    <CodeEditor
      v-if="currentLanguage"
      class="col-span-9"
      v-model:language="currentLanguage"
      :socketToken="jdoodleToken"
      @submit="submitQuestion()"
      @test="testCode($event)"
    />

  </section>
</template>

<style scoped>
.description {
  @apply text-lg text-neutral-400 my-10;
}
</style>
