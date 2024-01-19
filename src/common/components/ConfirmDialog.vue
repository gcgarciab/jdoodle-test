<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm']);
</script>

<template>
  <DefaultDialog
    :title="title"
    :has-borders="false"
  >
    <template #body>
      <p class="text-lg text-neutral-200">
        {{ description }}
      </p>
      <slot />
    </template>

    <template #actions:append>
      <QBtn
        label="Cancel"
        flat
        type="button"
        class="text-black w-28 bg-neutral-300 font-semibold"
        @click="emit('cancel')"
      />

      <QBtn
        :label="confirmText"
        flat
        class="w-28 font-semibold bg-green-500"
        :loading="loading"
        @click="emit('confirm')"
      />
    </template>
  </DefaultDialog>
</template>
