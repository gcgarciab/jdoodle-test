<script setup lang="ts">
import router from '@/router';
import { useExamStore } from '@/stores';

const retry = ref(false);
const examStore = useExamStore();
const { loading, startLoading, stopLoading } = useLoading();
const { examId, questions, isPracticeExam, totalQuestions } = storeToRefs(examStore);

const correctQuestions = computed(() => {
  if (!questions.value) return 0;

  return questions.value.filter((q) => q.testCases.every((t) => t.status)).length;
});

const wrongQuestions = computed(() => totalQuestions?.value - correctQuestions.value);

/**
 * Calls 'reset' action and redirect
 * to Home view.
 */
async function goToHome() {
  startLoading();
  await delay(2000);
  examStore.reset();
  router.push({ name: 'Home' });
  stopLoading();
}

/**
 * Calls 'resetQuestionsStatus' action to
 * clear question cases results and
 * redirect to ExamPractice view.
 */
async function retryTest() {
  retry.value = true;
  startLoading();
  await delay(2000);
  examStore.resetQuestionsStatus();
  router.push({
    name: 'ExamPractice',
    params: { id: examId.value },
  });
  stopLoading();
}

onMounted(() => {
  if (wrongQuestions.value === 0) {
    showNotify('positive', 'You got a perfect score 😊 !!');
  }
});
</script>

<template>
  <section class="exam-result bg-gray-500 h-[calc(100vh-60px)] p-10 text-neutral-100 flex items-center">
    <QCard
      class="result-wrapper"
      bordered
    >
      <QCardSection class="header">
        <h3 class="text-gray-700 text-2xl font-bold text-center">Results</h3>
      </QCardSection>

      <QCardSection class="detail px-16">
        <p class="question !text-gray-600">
          <strong>Total questions: </strong>
          <span>{{ totalQuestions }}</span>
        </p>
        <p
          class="question"
          :class="{ '!text-green-400': correctQuestions > 0 }"
        >
          <strong>Correct questions:</strong>
          <span>{{ correctQuestions }}</span>
        </p>
        <p
          class="question"
          :class="{ '!text-red-400': wrongQuestions > 0 }"
        >
          <strong>Wrong questions: </strong>
          <span>{{ wrongQuestions }}</span>
        </p>
      </QCardSection>

      <QCardActions class="flex justify-center gap-8 pt-4">
        <QBtn
          v-if="isPracticeExam"
          label="Retry"
          icon="mdi-refresh"
          class="action"
          color="primary"
          :loading="loading && retry"
          @click="retryTest()"
        />

        <QBtn
          label="Go to Home"
          icon="mdi-home"
          class="action"
          color="green-13"
          :loading="loading && !retry"
          @click="goToHome()"
        />
      </QCardActions>
    </QCard>
  </section>
</template>

<style scoped>
.result-wrapper {
  @apply w-1/3 shadow-md mx-auto bg-neutral-200 py-8;
}

.question {
  @apply text-lg text-gray-800 grid grid-cols-2 border border-gray-800 border-b-0;
}
.question:last-of-type {
  @apply border-b;
}

.question * {
  @apply border-gray-800 px-5 py-2;
}

.question span {
  @apply text-center font-bold border-l;
}

.action {
  @apply w-1/3;
}
</style>
