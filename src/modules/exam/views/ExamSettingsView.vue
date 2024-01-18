<script setup lang="ts">
import router from '@/router';
import { useExamStore } from '@/stores';
import { ExamEnum } from '@/modules/exam/enums';
import type { ExamOption } from '@/modules/exam/interfaces';

const examStore = useExamStore();
const showOptionsDialog = ref<boolean>(false);
const { loading, startLoading, stopLoading } = useLoading();
const { isPracticeExam, totalQuestions } = storeToRefs(examStore);

const examOptions: ExamOption[] = [
  {
    icon: 'clipboard-text',
    name: 'Exam practice',
    value: ExamEnum.PRACTICE,
    description: 'Choose this option to start a practice',
  },
  {
    icon: 'clipboard-text-clock',
    name: 'Exam test',
    value: ExamEnum.TEST,
    description: 'Choose this option to validate your programming level',
  },
];

/**
 * Hide Options Dialog and reset 'totalQuestions'
 * with default value.
 */
function hideOptions() {
  examStore.setExamType(null);
  showOptionsDialog.value = false;
  // Reset questions value
  totalQuestions.value = 5;
}

/**
 * Check if 'selectedOption' is TEST or PRACTICE
 * and redirect to expected route.
 */
async function startTest() {
  startLoading();
  // Wait until ready (Only for visual effects)
  if (isPracticeExam.value) await delay(2000);
  // Set Exam ID
  const examId = randomIntFromInterval(1, 10);
  examStore.setExamId(examId);

  router.push({
    name: isPracticeExam.value ? 'ExamPractice' : 'ExamTest',
    params: { id: examId },
  });

  stopLoading();
}

/**
 * Set value to 'selectedOption' and show options
 * dialog if value is 'PRACTICE'.
 * @param {ExamEnum} value - Exam type
 */
function showOptions(value: ExamEnum) {
  if (value === ExamEnum.TEST) {
    startTest();
    return;
  }

  examStore.setExamType(value);
  showOptionsDialog.value = true;
}
</script>

<template>
  <section class="exam-settings">
    <h1 class="title">Welcome to JDoodle!</h1>

    <div class="exam-options">
      <QItem
        clickable
        v-for="(option, index) in examOptions"
        :key="option.icon"
        @click="showOptions(option.value)"
        :class="{ '!bg-gray-600': index % 2 === 0 }"
        class="exam-option"
      >
        <QItemSection>
          <QIcon
            :name="`mdi-${option.icon}`"
            class="!block"
            size="200px"
          />
        </QItemSection>

        <QItemSection>
          <h3 class="text-lg font-semibold">{{ option.name }}</h3>
        </QItemSection>

        <QItemSection>
          <p class="description">{{ option.description }}</p>
        </QItemSection>
      </QItem>
    </div>

    <ConfirmDialog
      v-if="isPracticeExam"
      title="Options"
      description="Please, choose number of questions."
      confirm-text="Start"
      has-borders
      :loading="loading"
      @cancel="hideOptions()"
      @confirm="startTest()"
    >
      <div class="slider-content">
        <QSlider
          v-model="totalQuestions"
          markers
          label
          color="green-13"
          class="w/2/3 my-5"
          :min="1"
          :max="10"
        />
      </div>
    </ConfirmDialog>
  </section>
</template>

<style scoped>
.exam-settings {
  @apply bg-gray-500 h-[calc(100vh-64px)] p-10 text-neutral-100;
}

.title {
  @apply text-3xl text-center my-10;
}

.exam-options {
  @apply grid grid-cols-2 gap-20 px-60 mt-20;
}

.exam-option {
  @apply flex flex-col bg-green-400 hover:bg-green-400/80 justify-center items-center py-10;
}

.slider-content {
  @apply text-center pt-6 pb-3;
}
</style>
@/modules/exam/enums