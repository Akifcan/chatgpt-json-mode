<script setup lang="ts">
import type { CityProps } from "~/types/city.types";
const route = useRoute();

const city = ref<CityProps>();
const error = ref<boolean>(false);

const getSuggestions = async () => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ cityName: route.params.slug }),
  });
  if (response.status !== 200) {
    return (error.value = true);
  }
  const data = await response.json();
  city.value = data.result;
  console.log(city.value);
};

onMounted(getSuggestions);
</script>

<template>
  <div v-if="error">Beklenmedik bir hata oluştu...</div>
  <div v-else-if="city" class="wrapper">
    <p>
      {{ city.answer }}
    </p>
    <CityFieldset title="Tavsiyeler">
      <p>
        {{ city.suggestion }}
      </p>
    </CityFieldset>
    <CityFieldset title="Ne Yiyebilirsiniz?">
      <p>
        {{ city.food }}
      </p>
    </CityFieldset>
    <CityFieldset title="Dikkat Etmeniz Gerekenler">
      <p class="dont">
        {{ city.dont }}
      </p>
    </CityFieldset>
  </div>
  <div v-else>Lütfen Bekleyin...</div>
</template>

<style scoped>
p {
  font-size: 1.1rem;
  line-height: 1.4;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.dont {
  color: crimson;
}
</style>
