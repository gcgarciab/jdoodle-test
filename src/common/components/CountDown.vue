<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { watch } from 'vue';
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const interval = ref<number>();
const countdown = reactive({
  totalSeconds: 3600,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const emit = defineEmits(['finish'])

function updateCountDown() {
  countdown.hours = Math.floor(countdown.totalSeconds / 3600);
  countdown.minutes = Math.floor((countdown.totalSeconds % 3600) / 60);
  countdown.seconds = countdown.totalSeconds % 60;
}

function startCountdown() {
  interval.value = setInterval(() => {
    countdown.totalSeconds -= 1;

    if (countdown.totalSeconds <= 0) {
      clearInterval(interval.value);
    }

    updateCountDown();
  }, 1000);
}

onMounted(() => {
  // Set values to countdown
  updateCountDown();
  // Start
  startCountdown();
});

onBeforeUnmount(() => clearInterval(interval.value));

watch(
  () => countdown.totalSeconds,
  (newValue) => {
    console.log(newValue);
    if (newValue === 0) emit('finish');
  }
);
</script>

<template>
  <div class="countdown">
    <p v-if="countdown.hours > 0">Hours: {{ countdown.hours }}</p>
    <p v-if="countdown.minutes > 0">Minutes: {{ countdown.minutes }}</p>
    <p>Seconds: {{ countdown.seconds }}</p>
  </div>
</template>

<style scoped>

</style>
