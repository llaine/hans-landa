import { context, GitHub } from '@actions/github'

export async function shouldTriggerBuild(): Promise<boolean> {
  const octokit = new GitHub('503d8295502e1b9ec9b88496c436c3d494bcdd55')
  const {
    repo: { owner, repo },
    payload,
  } = context

  if (!payload.pull_request) return true

  const pull_number = payload.pull_request.number

  const pr = await octokit.pulls.listReviews({
    owner,
    repo,
    pull_number,
  })

  console.log(pr.data.filter(pr => pr.state === ''))
  return true
}
