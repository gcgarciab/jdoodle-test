<script setup lang="ts">
const props = defineProps({
  stop: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['finish'])

const interval = ref();
const countdown = reactive({
  totalSeconds: 600,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const { stop } = toRefs(props);

/**
 * Set values to 'countdown' keys according
 * to 'totalSeconds' value.
 */
function updateCountDown() {
  countdown.hours = Math.floor(countdown.totalSeconds / 3600);
  countdown.minutes = Math.floor((countdown.totalSeconds % 3600) / 60);
  countdown.seconds = countdown.totalSeconds % 60;
}

/**
 * Receives a number and return it with expected format.
 * @param {number} number - Number to format
 */
function formatNumber(number: number): string {
  return number.toString().padStart(2, '0');
}

/**
 * Set value to 'interval' and start with the countdown
 * action and calls 'clearInterval' when time has been done.
 */
function startCountdown(): void {
  interval.value = setInterval(() => {
    countdown.totalSeconds -= 1;

    if (countdown.totalSeconds <= 0) {
      clearInterval(interval.value);
    }

    updateCountDown();
  }, 1000);
}

watch(stop, () => clearInterval(interval.value));

watch(
  () => countdown.totalSeconds,
  (newValue) => {
    if (newValue === 0) emit('finish');
  }
);

onMounted(() => {
  // Set values to countdown
  updateCountDown();
  // Start
  startCountdown();
});

onBeforeUnmount(() => clearInterval(interval.value));
</script>

<template>
  <div
    class="countdown"
    :class="{ '!text-red-400': countdown.totalSeconds <= 600 }"
  >
    <div class="count-item">
      <strong>Hours</strong>
      <p class="time text-xl">{{ formatNumber(countdown.hours) }}</p>
    </div>
    <div class="count-item border-x">
      <strong>Minutes</strong>
      <p class="time text-xl">{{ formatNumber(countdown.minutes) }}</p>
    </div>
    <div class="count-item">
      <strong>Seconds</strong>
      <p class="time text-xl">{{ formatNumber(countdown.seconds) }}</p>
    </div>
  </div>
</template>

<style scoped>
.countdown {
  @apply flex items-center border border-gray-500 bg-gray-500;
}

.count-item {
  @apply flex flex-col items-center justify-center w-14;
}

.count-item strong {
  @apply text-[10px];
}

.count-item:nth-of-type(2) {
  @apply relative;
}


.time {
  @apply text-xl font-semibold;
}
</style>
