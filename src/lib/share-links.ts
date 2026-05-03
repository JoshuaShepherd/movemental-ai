/** Pure URL builders for social compose flows — safe for client or server. */

export function shareTwitterIntent(title: string, pageUrl: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`;
}

export function shareLinkedInOffsite(pageUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
}

export function shareFacebookSharer(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}

export function shareBlueskyCompose(title: string, pageUrl: string): string {
  const text = `${title}\n\n${pageUrl}`;
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
}

export function shareEmail(title: string, pageUrl: string): string {
  return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${pageUrl}\n`)}`;
}
