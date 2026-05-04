import {genkit} from 'genkit';
import {openAI, gpt35Turbo, gpt4oMini} from 'genkitx-openai';

const modelAlias = process.env.OPENAI_MODEL?.trim();
const modelMap: Record<string, typeof gpt35Turbo> = {
  'gpt-4o-mini': gpt4oMini,
  'gpt-3.5-turbo': gpt35Turbo,
};
const defaultModel = modelAlias ? modelMap[modelAlias] ?? gpt35Turbo : gpt35Turbo;

// OpenRouter configuration - Uses OpenAI-compatible API
const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const useOpenRouter = !!openRouterApiKey;

export const ai = genkit({
  plugins: [
    openAI({
      apiKey: openRouterApiKey || process.env.OPENAI_API_KEY,
      baseURL: useOpenRouter ? 'https://openrouter.ai/api/v1' : undefined,
    }),
  ],
  model: defaultModel,
});
