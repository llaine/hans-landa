/* eslint-disable no-console */
import {context} from '@actions/github'

export function shouldTriggerBuild(): boolean {
  // const octokit = new GitHub('503d8295502e1b9ec9b88496c436c3d494bcdd55')
  // eslint-disable-next-line no-empty-pattern
  const {
    // repo: {owner, repo},
  } = context

  console.log(context.payload.repository)

  // const pr = octokit.pulls.get({
  //   owner,
  //   repo,
  //   pull_number
  // });

  return true
}
