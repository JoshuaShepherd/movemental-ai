import type { AskAiProviderId } from "@/lib/agent-room/ask-ai";

type ProviderIconProps = {
  provider: AskAiProviderId;
  className?: string;
};

/** Recognizable provider marks — inline SVG, no external assets. */
export function AskAiProviderIcon({ provider, className }: ProviderIconProps) {
  switch (provider) {
    case "chatgpt":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.938 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .742 7.097 5.98 5.98 0 0 0 .511 4.938 6.051 6.051 0 0 0 6.514 2.899A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.758a.775.775 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.168a.08.08 0 0 1-.038-.057V6.956a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.499 2.607 1.5v2.998l-2.597 1.5-2.607-1.5z"
          />
        </svg>
      );
    case "claude":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="#D97757"
            d="M12 2.5c-.4 0-.8.2-1 .6L2.8 18.1c-.3.5-.1 1.2.4 1.5.2.1.4.2.6.2h17.4c.6 0 1.1-.5 1.1-1.1 0-.2-.1-.4-.2-.6L13 3.1c-.2-.4-.6-.6-1-.6zm0 3.2 6.8 11.8H5.2L12 5.7z"
          />
          <path
            fill="#D97757"
            d="M12 6.8 8.2 13.5h7.6L12 6.8zm-4.5 9.2 1.8 3.2h11.4l1.8-3.2H7.5z"
            opacity="0.85"
          />
        </svg>
      );
    case "gemini":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="ask-ai-gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="50%" stopColor="#9B72CB" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ask-ai-gemini-grad)"
            d="M12 2l1.8 5.5L19.5 9l-5.7 1.5L12 16l-1.8-5.5L4.5 9l5.7-1.5L12 2zm0 14.5 2.2 6.8 2.2-6.8 6.8-2.2-6.8-2.2L12 5.5l-2.2 6.8-6.8 2.2 6.8 2.2L12 16.5z"
          />
        </svg>
      );
    default:
      return null;
  }
}
