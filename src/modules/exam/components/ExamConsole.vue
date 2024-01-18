<script setup lang="ts">
import type { PropType } from 'vue';
import type { ExamExecution } from '@/modules/exam/types';
import type { Question, ScriptResponse } from '@/modules/exam/interfaces';

defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  currentExecution: {
    type: String as PropType<ExamExecution>,
    required: false,
  },
  result: {
    type: Object as PropType<ScriptResponse>,
    required: false,
  },
})
</script>

<template>
  <QSlideTransition>
    <div class="exam-console">
      <div
        v-if="currentExecution === 'test'"
        class="test-result"
      >
        <p
          v-if="!result"
          class="test">Running your code ...
        </p>

        <div
          v-else
          class="results"
        >
          <h3 class="details">Execution results</h3>
          <p
            v-if="result.cpuTime"
            class="test-text"
          >
            <strong>CPU time</strong>{{ result.cpuTime }}
          </p>
          <p
            v-if="result.memory"
            class="test-text"
          >
            <strong>Memory</strong>{{ result.memory }}
          </p>
          <p class="test-text"><strong>Output</strong>{{ result.output }}</p>
        </div>
      </div>

      <div
        v-if="currentExecution === 'submit'"
        class="submit-result"
      >
        <div
          v-for="(test, index) in question.testCases"
          :key="test.input"
        >
          <p
            class="test"
            v-if="test.loading"
          >
            Running test #{{ index + 1 }} ...
          </p>
          <div
            v-else
            class="test pb-2"
            :class="test.status ? 'text-green-400' : 'text-red-400'"
          >
            Test #{{ index + 1 }}: {{ test.status ? 'Success' : 'Failed' }} <br>
            Expected: {{ test.output }} <br>
            Received: {{ test.result }} <br>

            <template v-if="index + 1 < question.testCases.length">
              -----------------------
            </template>
          </div>
        </div>
      </div>
    </div>
  </QSlideTransition>
</template>

<style scoped>
.exam-console {
  @apply bg-gray-800 p-2 max-h-96 overflow-y-auto;
}

.results .details {
  @apply text-green-400 text-lg mb-5 font-semibold;
}

.test {
  @apply my-1 text-lg font-semibold;
}

.test-text {
  @apply mb-2;
}

.test-text strong {
  @apply block;
}
</style>
@/modules/exam/types