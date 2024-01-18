<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasBorders: {
    type: Boolean,
    required: false,
    default: true,
  },
  hasBodyPadding: {
    type: Boolean,
    required: false,
    default: true,
  },
  hasActions: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const visible = ref(true);
</script>

<template>
  <QDialog
    v-model="visible"
    persistent
  >
    <QCard
      flat
      class="bg-gray-600 w-1/3 text-white rounded-lg"
    >
      <QCardSection
        v-if="title.length"
        class="relative py-2"
      >
        <h2 class="text-h6 p-2">{{ title }}</h2>
      </QCardSection>

      <QSeparator
        v-if="hasBorders"
        class="bg-neutral-500"
      />

      <QCardSection
        :class="{ 'py-0' : !hasBorders }"
        style="max-height: 50vh"
        class="scroll p-6 relative min-h-[150px]"
      >
        <slot name="body" />
      </QCardSection>

      <QSeparator
        v-if="hasBorders"
        class="bg-neutral-500"
      />

      <QCardActions
        v-if="hasActions"
        class="p-4"
      >
        <QSpace />
        <slot name="actions:append" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
