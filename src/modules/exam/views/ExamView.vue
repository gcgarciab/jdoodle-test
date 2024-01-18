<script setup lang="ts">
import router from '@/router';
import { useExamStore } from '@/stores';
import type { ExamExecution } from '@/modules/exam/types';
import type { JDoodleCredentials, ScriptBody, ScriptResponse, TestCase } from '@/modules/exam/interfaces';

const route = useRoute();
const examStore = useExamStore();
const showLeave = ref<boolean>(false);
const showCountDown = ref<boolean>(false);
const runningScript = ref<boolean>(false);
const stopCountDown = ref<boolean>(false);
const countDownFinished = ref<boolean>(false);
const currentExecution = ref<ExamExecution>();
const executionResult = ref<ScriptResponse>();
const { loading, startLoading, stopLoading } = useLoading();
const { questions, currentLanguage, currentIndex, currentQuestion, jdoodleToken, totalQuestions } = storeToRefs(examStore);

const jdoodleCredentials: JDoodleCredentials = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
};

const isPractice = route.name === 'ExamPractice';

const examLabel = computed((): string => isPractice ? 'Practice' : 'Test');

const showConsole = computed((): boolean => {
  return runningScript.value
    || questionsHasBeenResolved.value
    || (executionResult.value !== undefined);
});

const questionsHasBeenResolved = computed((): boolean => {
  return questions.value.every((q) => q.testCases.every((t) => t.status));
})

/**
 * Receives the script and return it in JDoodle
 * body to send in 'execution' request.
 * @param {string} script - Script to send
 */
function buildScriptBody(script: string): ScriptBody {
  return {
    ...jdoodleCredentials,
    language: currentLanguage.value,
    versionIndex: '0',
    script,
  };
}

/**
 * Reset some exam values
 */
function resetExamValues() {
  runningScript.value = false;
  executionResult.value = undefined;
  currentExecution.value = undefined;
}

/**
 * Make redirection to expected route name
 * with some delay and reset store if is leaving
 */
async function goToRoute(name: string, leave?: boolean): Promise<void> {
  if (leave) {
    examStore.reset();
  } else {
    startLoading();
    await delay(1000);
    stopLoading();
  }
  // Make redirect
  router.push({ name });

}

/**
 * Show 'running' loading, calls 'buildScriptBody'
 * method and exec 'validateScript' action to get
 * script result and set to 'executionResult'
 * @param {string} script - Script to run
 */
async function testScript(script: string): Promise<void> {
  runningScript.value = true;
  currentExecution.value = 'test';
  executionResult.value = undefined;
  const data = buildScriptBody(script);

  try {
    executionResult.value = await examStore.validateScript(data);
  } catch (error) {
    console.log(error);
  } finally {
    runningScript.value = false;
  }
}

async function submitScript(script: string): Promise<void> {
  currentExecution.value = 'submit';
  executionResult.value = undefined;
  const { testMethod } = currentQuestion.value!;
  const methodPositions: number[] = [...script.matchAll(new RegExp(testMethod, 'gi'))].map((a) => a.index!);

  if (methodPositions.length <= 1) {
    showNotify('negative', 'Method name not match 🙁');
    return;
  };
  // Replace code values with test cases input
  const lastIndex = methodPositions[1];
  const startPosition = script.slice(lastIndex, script.length).indexOf('[');
  const endPosition = script.slice(lastIndex, script.length).indexOf(']');
  const substring = script.slice(lastIndex, script.length);
  const stringToReplace = substring.slice(startPosition + 1, endPosition);
  const question = questions.value[currentIndex.value];
  // Reset execution value
  runningScript.value = true;

  const validateTest = async (test: TestCase) => {
    // Start loading
    test.loading = true;
    // Build new script
    const testCaseString = substring.replace(stringToReplace, test.input);
    const replacedScript = script.replace(substring, testCaseString);
    const testBody = buildScriptBody(replacedScript);
    // Set JDoodle result
    const result = await examStore.validateScript(testBody, test.output);
    test.status = (+result.output === +test.output);
    test.result = result.output;
    // Stop loading
    test.loading = false;
  };

  await Promise.allSettled(question.testCases.map(validateTest));
  runningScript.value = false;
}

watch(currentIndex, () => resetExamValues());
watch(questionsHasBeenResolved, () => stopCountDown.value = true);

onBeforeMount(async () => {
  if (questions.value.length !== totalQuestions.value) {
    examStore.selectQuestions();
  }

  if (!isPractice) showCountDown.value = true;

  await examStore.getJDoodleToken(jdoodleCredentials);
});
</script>

<template>
  <section
    v-if="questions.length"
    class="user-exam"
  >
    <div class="questions col-span-3 flex flex-nowrap">
      <div class="quick-access">
        <QTabs
          v-model="currentIndex"
          vertical
          class="w-14 h-full bg-gray-800 relative"
          active-color="green-13"
        >
          <QTab
            v-for="(question, index) in questions"
            :key="question.id"
            :class="{ 'bg-green-200 text-green-400': question.testCases.every((t) => t.status) }"
            class="h-14 text-gray-200 cursor-pointer"
            :name="index"
          >
            <span class="text-2xl font-semibold">{{ index + 1 }}</span>
          </QTab>

          <QBtn
            class="bg-red-500 text-white py-4 rounded-none absolute bottom-0"
            size="md"
            icon="mdi-clipboard-remove"
            @click="showLeave = true"
          >
            <QTooltip
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              class="text-[14px]"
            >
              Leave {{ examLabel }}
            </QTooltip>
          </QBtn>
        </QTabs>
      </div>

      <div
        v-if="currentQuestion"
        class="current-question"
      >
        <ExamCountDown
          v-if="showCountDown"
          :stop="stopCountDown"
          class="text-white absolute right-0 top-0"
          @finish="countDownFinished = true"
        />

        <div class="question-details px-8">
          <h2 class="question-name text-xl font-semibold">{{ currentQuestion.name }}</h2>

          <p class="description">{{ currentQuestion.description }}</p>

          <p class="description whitespace-pre-line">
            <strong class="block mb-5">Example:</strong>
            {{ currentQuestion.example }}
          </p>
        </div>

        <ExamConsole
          v-if="showConsole"
          :question="currentQuestion"
          :current-execution="currentExecution"
          :result="executionResult"
        />
      </div>
    </div>

    <ExamEditor
      v-if="currentLanguage"
      v-model:language="currentLanguage"
      :current-action="currentExecution"
      :socketToken="jdoodleToken"
      :loading="runningScript"
      class="col-span-9"
      @submit="submitScript($event)"
      @test="testScript($event)"
    />

    <ConfirmDialog
      v-if="questionsHasBeenResolved || countDownFinished"
      :loading="loading"
      :title="`${examLabel} finished`"
      has-borders
      confirm-text="Finish"
      description="Do you want to see the results?"
      @cancel="goToRoute('Home', true)"
      @confirm="goToRoute('ExamResult')"
    />

    <ConfirmDialog
      v-if="showLeave"
      :loading="loading"
      :title="`Finish ${examLabel}`"
      :description="`Do you want to leave current ${examLabel},? Your progress will be lost`"
      has-borders
      confirm-text="Finish"
      @cancel="showLeave = false"
      @confirm="goToRoute('Home', true)"
    />
  </section>
</template>

<style scoped>
.user-exam {
  @apply w-screen h-[calc(100vh-60px)] grid grid-cols-12 bg-gray-700;
}

.current-question {
  @apply pt-14 pb-1 w-full text-white flex flex-col justify-between relative;
}

.description {
  @apply text-lg text-neutral-400 my-10;
}
</style>