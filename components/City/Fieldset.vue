<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <slot />
  </fieldset>
</template>

<style scoped>
legend {
  padding-inline: 1rem;
  color: var(--color-primary);
  font-weight: bold;
}
fieldset {
  padding: 1rem;
}
</style>
