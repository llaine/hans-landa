import { context } from '@actions/github'

export function shouldTriggerBuild(): boolean {
  // const octokit = new GitHub('503d8295502e1b9ec9b88496c436c3d494bcdd55')
  // const {
  // repo: {owner, repo},
  // } = context

  console.log(context.payload.pull_request)

  // const pr = octokit.pulls.get({
  //   owner,
  //   repo,
  //   pull_number
  // });

  return true
}
