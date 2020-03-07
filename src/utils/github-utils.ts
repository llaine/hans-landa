export function shouldTriggerBuild(params: {
  githubToken: string,
  // to define with what we get from the event and what we can get from the API
}): boolean {
  return true;
}