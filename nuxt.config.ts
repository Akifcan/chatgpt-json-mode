// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    openAISecret: process.env.OPENAI_SECRET_KEY,
    openAIModel: process.env.OPENAI_GPT_MODEL,
  },
  css: ["~/assets/styles/main.css"],
});
