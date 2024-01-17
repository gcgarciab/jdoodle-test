<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useExamStore } from '@/stores';
import { onBeforeMount, ref, watch } from 'vue';

import CodeEditor from '@/common/components/CodeEditor.vue';
import type { ScriptBody, ScriptResponse, TestCase } from '@/common/interfaces';

const examStore = useExamStore();
const runningScript = ref(false);
const executionResult = ref<ScriptResponse | null>();
const currentExecution = ref<'test' | 'submit'>();
const { questions, currentLanguage, currentIndex, currentQuestion, jdoodleToken } = storeToRefs(examStore);

const jdoodleCredentials = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
}

function buildScriptBody(script: string): ScriptBody {
  return {
    ...jdoodleCredentials,
    language: currentLanguage.value,
    versionIndex: '0',
    script,
  };
}

async function testScript(script: string) {
  currentExecution.value = 'test';
  const data = buildScriptBody(script);
  executionResult.value = await examStore.validateScript(data);
  runningScript.value = false;
}

async function submitScript(script: string) {
  currentExecution.value = 'submit';
  const { testMethod } = currentQuestion.value!;
  const methodPositions: number[] = [...script.matchAll(new RegExp(testMethod, 'gi'))].map((a) => a.index!);

  if (methodPositions.length <= 1) return;
  console.log('holi');
  // Replace code values with test cases input
  const lastIndex = methodPositions[1];
  const startPosition = script.slice(lastIndex, script.length).indexOf('[');
  const endPosition = script.slice(lastIndex, script.length).indexOf(']');
  const substring = script.slice(lastIndex, script.length);
  const stringToReplace = substring.slice(startPosition + 1, endPosition);
  const question = questions.value[currentIndex.value];
  executionResult.value = null;
  runningScript.value = true;

  const validateTest = async (test: TestCase) => {
    // Start loading
    test.loading = true;
    // Build new script
    const testCaseString = substring.replace(stringToReplace, test.input);
    const replacedScript = script.replace(substring, testCaseString);
    const testBody = buildScriptBody(replacedScript);
    // Set JDoodle result
    const result = await examStore.validateScript(testBody);
    test.status = (+result.output === test.output);
    test.result = result.output;
    // Stop loading
    test.loading = false;
  };

  await Promise.allSettled(question.testCases.map(validateTest));
  runningScript.value = false;
}

watch(currentIndex, () => {
  // Reset execution values
  runningScript.value = false;
  executionResult.value = null;
});

onBeforeMount(async () => {
  examStore.selectQuestions();
  // await examStore.getJDoodleToken(jdoodleCredentials);
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
            :class="{ 'bg-green-100': question.testCases.every((t) => t.status) }"
            :name="index"
          >
            <span class="text-2xl font-semibold">{{ index + 1 }}</span>
          </QTab>
        </QTabs>
      </div>


      <div
        v-if="currentQuestion"
        class="current-question pt-14 pb-1 w-full text-white flex flex-col justify-between"
      >
        <div class="question-details px-8">
          <h2 class="question-name text-xl font-semibold">{{ currentQuestion.name }}</h2>

          <p class="description">{{ currentQuestion.description }}</p>

          <p class="description whitespace-pre-line">
            <strong class="block mb-5">Example:</strong>
            {{ currentQuestion.example }}
          </p>
        </div>

        <QSlideTransition>
          <div
            v-if="currentExecution === 'submit' || runningScript || executionResult"
            class="tests-running bg-gray-800 p-2 max-h-96 overflow-y-auto"
          >
            <div
              v-if="currentExecution === 'test'"
              class="test-result"
            >
              <p
                v-if="!executionResult"
                class="test">Running your code ...
              </p>

              <div
                v-else
                class="results"
              >
                <h3 class="details text-green-400 text-lg mb-5 font-semibold">Execution results</h3>
                <p
                  v-if="executionResult.cpuTime"
                  class="test-text"
                >
                  <strong>CPU time</strong>{{ executionResult.cpuTime }}
                </p>
                <p
                  v-if="executionResult.memory"
                  class="test-text"
                >
                  <strong>Memory</strong>{{ executionResult.memory }}
                </p>
                <p class="test-text"><strong>Output</strong>{{ executionResult.output }}</p>
              </div>
            </div>

            <div
              v-if="currentExecution === 'submit'"
              class="submit-result"
            >
              <div
                v-for="(test, index) in currentQuestion.testCases"
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

                  <template v-if="index + 1 < currentQuestion.testCases.length">
                    -----------------------
                  </template>
                </div>
              </div>
            </div>
          </div>
        </QSlideTransition>
      </div>
    </div>

    <CodeEditor
      v-if="currentLanguage"
      v-model:language="currentLanguage"
      class="col-span-9"
      :current-action="currentExecution"
      :socketToken="jdoodleToken"
      :loading="runningScript"
      @submit="submitScript($event)"
      @test="testScript($event)"
    />
  </section>
</template>

<style scoped>
.description {
  @apply text-lg text-neutral-400 my-10;
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
