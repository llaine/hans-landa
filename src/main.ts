import * as core from '@actions/core'
import { triggerBuild } from './utils/bitrise-utils'
import { context, GitHub } from '@actions/github'

async function run(): Promise<void> {
  try {
    const bitriseAppSlug = core.getInput('bitrise_app_slug')
    const bitriseBuildTriggerToken = core.getInput(
      'bitrise_build_trigger_token',
    )
    const bitriseWorkflow = core.getInput('bitrise_workflow')
    if (context.payload.comment && context.payload.issue) {
      const client = new GitHub(core.getInput('github_token'))
      const prInformations = context.payload.issue.pull_request.url.split('/')
      const prNumber = prInformations.pop()
      const owner = prInformations[4]
      const repo = prInformations[5]
      const pr = await client.pulls.get({ pull_number: prNumber, owner, repo })
      const branchName = pr.data.head.ref
      const commitHash = pr.data.head.sha
      const branchDestName = pr.data.base.ref
      const comment = context.payload.comment.body
      if (comment.startsWith('@hans-landa')) {
        triggerBuild({
          bitriseAppSlug,
          bitriseBuildTriggerToken,
          bitriseWorkflow,
          branchName,
          commitHash,
          commitMessage: '',
          pullRequestId: prNumber,
          branchDestName,
        })
      }
    } else {
      let branchName = context.ref.slice(11)
      let commitHash = context.sha

      if (context.payload.pull_request) {
        branchName = context.payload.pull_request.head.ref
        commitHash = context.payload.pull_request.head.sha
      }

      triggerBuild({
        bitriseAppSlug,
        bitriseWorkflow,
        bitriseBuildTriggerToken,
        branchName,
        commitHash,
        commitMessage: context.payload.pull_request?.body,
        pullRequestId: context.payload.pull_request?.number,
        branchDestName: context.payload.pull_request?.base.ref,
      })
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
