<script setup lang="ts">
import type { PropType } from 'vue';
import type { CodeLanguage } from '../types';
import type { SelectOption } from '../interfaces';

import { php } from '@codemirror/lang-php';
import { Codemirror } from 'vue-codemirror';
import { java } from '@codemirror/lang-java';
import { watchDebounced } from '@vueuse/core';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { computed, onBeforeMount, onMounted, ref, toRefs, watch } from 'vue';
import { DEFAULT_JAVA, DEFAULT_PHP, DEFAULT_PYTHON, DEFAULT_TYPESCRIPT } from '../constants';

import webstomp from 'webstomp-client';

const socket = new WebSocket('wss://api.jdoodle.com/v1/stomp', ['https']);
const stompClient = webstomp.over(socket, { heartbeat: false, debug: true });

const props = defineProps({
  language: {
    type: String as PropType<CodeLanguage>,
    required: true,
  },
  socketToken: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['test', 'submit', 'update:language']);

const code = ref('');
const { language, socketToken } = toRefs(props);

const editorStyle = {
  height: 'calc(100vh - 60px)',
  width: '100%',
  fontSize: '1.15rem',
}

const languageOptions: SelectOption[] = ['java', 'php', 'python', 'typescript']
  .map((o) => ({
    label: o.toUpperCase(),
    value: o,
  }));

const lang = computed(() => {
  switch (language.value) {
    case 'java': return java();
    case 'typescript': return javascript();
    case 'php': return php();
    default: return python();
  }
});

/**
 * Receive new editor to set the new base code
 * to 'code' ref according with 'options' object.
 * @param {CodeLanguage} lang - Editor language
 */
function resetCode(lang: CodeLanguage): void {
  const options = {
    java: DEFAULT_JAVA,
    typescript: DEFAULT_TYPESCRIPT,
    php: DEFAULT_PHP,
    python: DEFAULT_PYTHON,
  };

  code.value = options[lang];
}

watchDebounced(
  code,
  (newValue) => {
    if (stompClient.connected) {
      stompClient.send('/app/execute-ws-api-token', newValue, {
        message_type: 'execute',
        token: socketToken.value,
      });
    }
  },
  { debounce: 10000 },
);

/**
 * Calls 'resetCode' method to reset editor code
 * with 'newValue' as parameter.
 */
watch(language, (newValue) => {
  resetCode(newValue);
});

/**
 * Calls 'resetCode' method to set default value
 * to 'code' ref.
 */
onBeforeMount(async () => {
  // Set default code
  resetCode(language.value);
});

function onWsConnection() {
  console.log('Connection succeeded');

  stompClient.subscribe('/user/queue/execute-i', (message) => {
    // Handle the received message
    console.log('Received message:', message.body);
    console.log('statusCode:', message.headers);
  });
}

function onWsConnectionFailed(e: any) {
  console.log(e);
  console.log('Connection failed');
}

onMounted(() => {
  stompClient.connect({

  }, onWsConnection, onWsConnectionFailed);
});
</script>

<template>
  <div class="question-editor p-2">
    <Codemirror
      v-model="code"
      :style="editorStyle"
      placeholder="Code goes here..."
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="[lang, oneDark]"
      class="shadow-md"
    />

    <div class="question-actions py-2 flex justify-between text-white">
      <div class="w-48">
        <QSelect
          filled
          dark
          dense
          emit-value
          map-options
          label="Language"
          color="green-13"
          label-color="green-13"
          option-value="value"
          option-label="label"
          :model-value="language"
          :options="languageOptions"
          @update:model-value="emit('update:language', $event)"
        />
      </div>

      <div class="check-actions">
        <QBtn
          no-caps
          label="Run Code"
          class="action bg-neutral-300 text-black"
          @click="emit('test')"
        />

        <QBtn
          no-caps
          label="Submit Code"
          class="action bg-green-500"
          @click="emit('submit')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-actions .action {
  @apply font-semibold ml-4 px-5;
}
</style>
