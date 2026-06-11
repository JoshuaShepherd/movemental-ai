export type AskAiProviderId = "chatgpt" | "claude" | "gemini";

export type AskAiProvider = {
  id: AskAiProviderId;
  label: string;
  /** Opens a new chat with the prompt pre-filled where the provider supports it. */
  buildUrl: (prompt: string) => string;
};

const encode = (prompt: string) => encodeURIComponent(prompt);

export const ASK_AI_PROVIDERS: readonly AskAiProvider[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encode(prompt)}`,
  },
  {
    id: "claude",
    label: "Claude",
    buildUrl: (prompt) => `https://claude.ai/new?q=${encode(prompt)}`,
  },
  {
    id: "gemini",
    label: "Gemini",
    buildUrl: (prompt) => `https://gemini.google.com/app?prompt=${encode(prompt)}`,
  },
] as const;

export function buildAskAiProviderUrls(prompt: string): Record<AskAiProviderId, string> {
  return Object.fromEntries(
    ASK_AI_PROVIDERS.map((provider) => [provider.id, provider.buildUrl(prompt)]),
  ) as Record<AskAiProviderId, string>;
}
