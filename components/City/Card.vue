<script setup lang="ts">
import slug from "slug";
const props = defineProps<{ name: string }>();
const to = `/sehir/${slug(props.name)}`;
</script>

<template>
  <NuxtLink :to="to" class="city-card">{{ name }}</NuxtLink>
</template>

<style scoped>
.city-card {
  border: 1px solid var(--color-primary);
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: 500ms cubic-bezier(0.19, 1, 0.22, 1);
  flex: 10em;
}

.city-card:hover {
  background-color: var(--color-primary);
  transform: translateY(-10px);
  color: white;
}
</style>
