import { type AskAiProvider } from "./providers";

/**
 * Opens a provider chat in a new tab and copies the prompt to the clipboard.
 * Opens synchronously inside the click handler (popup-safe), then copies.
 * Clipboard is the reliable path (especially Gemini); URL query params pre-fill
 * where the provider still honors them (ChatGPT, Claude).
 */
export function launchAskAiProvider(provider: AskAiProvider, prompt: string): void {
  const url = provider.buildUrl(prompt);
  window.open(url, "_blank", "noopener,noreferrer");

  void navigator.clipboard.writeText(prompt).catch(() => {
    // Prefill URL may still work for ChatGPT / Claude.
  });
}
