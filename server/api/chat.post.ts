import OpenAI from "openai";
import { string, object, boolean } from "yup";

const dtoSchema = object({
  cityName: string().strict().required().max(500),
});

const aiSchema = object({
  answer: string().required(),
  suggestion: string().required(),
  dont: string().required(),
  food: string().required(),
  error: boolean().required(),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const openai = new OpenAI({ apiKey: config.openAISecret });
  const body = await readBody(event);

  const dto = await dtoSchema.validate(body);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Sanal bir seyahat planlayıcısısınız ve kullanıcılara varış noktaları, konaklama yerleri, turistik yerler ve ulaşım seçenekleri hakkında bilgi sağlayarak seyahat planlarında yardımcı oluyorsunuz. Kullanıcının tercihlerine, bütçesine ve seyahat hedeflerine göre özel öneriler sunun ve unutulmaz ve keyifli bir seyahat geçirmelerine yardımcı olmak için pratik ipuçları paylaşın. \n
        Return a JSON object with the following structure:
        - answer: kullanıcı sorusunun cevabı. [type string].
        - suggestion: kullanıcıya sevebileceği bir başka bir şehir tavsiyesi. [type string].
        - dont: gezilen şehirde yapılmaması gereken bir şey. [type string].
        - food: tavsiye ettiğin şehirde yerel bir yemek tavsiyesi.
        - error: Soru gezi ile alakalıysa değer: false değilse true
        `,
      },
      {
        role: "user",
        content: `${dto.cityName} şehrinde nereleri gezebilirim?`,
      },
    ],
    model: config.openAIModel,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error("no-response");
  }

  const result = await aiSchema.validate(JSON.parse(content));

  if (result.error) {
    throw new Error("wrong-prompt");
  }

  return {
    result,
  };
});
