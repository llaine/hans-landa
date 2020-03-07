export interface ShouldTriggerBuildParams {
  githubToken: string
}

export function shouldTriggerBuild(params: ShouldTriggerBuildParams): boolean {
  // eslint-disable-next-line no-console
  console.log(params);
  return true
}
