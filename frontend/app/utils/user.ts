export function extractUserIDFromURL(url: string) {
  return url.split("/")[url.split("/").length - 1];
}

export function extractUserNameFromURL(url: string) {
  return extractUserIDFromURL(url)
}
