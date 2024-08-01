export function truncateText(text: string): string {
  if (text.length > 120) {
    return text.slice(0, 120) + "...";
  }
  return text;
}
