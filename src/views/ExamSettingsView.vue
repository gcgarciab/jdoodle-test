<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { storeToRefs } from 'pinia';
import { useExamStore } from '@/stores';
import { ExamEnum } from '@/common/enums';
import type { ExamOption } from '@/common/interfaces';
import { delay, randomIntFromInterval } from '@/common/utils';

const loading = ref(false);
const examStore = useExamStore();
const showOptionsDialog = ref<boolean>(false);
const selectedOption = ref<ExamEnum | null>(null);
const { totalQuestions } = storeToRefs(examStore);

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

function showOptions(value: ExamEnum) {
  selectedOption.value = value;
  showOptionsDialog.value = true;
}

function hideOptions() {
  selectedOption.value = null;
  showOptionsDialog.value = false;
  // Reset questions value
  totalQuestions.value = 5;
}

async function startTest() {
  loading.value = true
  const isPractice = (selectedOption.value === ExamEnum.PRACTICE);
  // Wait until ready (Only for visual effects)
  await delay(2000);

  await router.push({
    name: isPractice ? 'ExamPractice' : 'ExamTest',
    params: {
      id: randomIntFromInterval(1, 10),
    },
  });

  loading.value = false;
}
</script>

<template>
  <section class="exam-settings bg-gray-500 h-[calc(100vh-64px)] p-10 text-neutral-100">
    <h1 class="title text-3xl text-center my-10">Welcome to JDoodle!</h1>

    <div class="exam-options grid grid-cols-2 gap-20 px-60 mt-20">
      <QItem
        clickable
        v-for="(option, index) in examOptions"
        :key="option.icon"
        @click="showOptions(option.value)"
        :class="{ '!bg-gray-600': index % 2 === 0 }"
        class="flex flex-col bg-green-400 hover:bg-green-400/80 justify-center items-center py-10"
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
      v-if="selectedOption === ExamEnum.PRACTICE"
      title="Options"
      description="Please, choose number of questions."
      confirm-text="Start"
      has-borders
      :loading="loading"
      @cancel="hideOptions()"
      @confirm="startTest()"
    >
      <div class="slider-content text-center pt-6 pb-3">
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

</style>
