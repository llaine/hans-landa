import * as core from '@actions/core'
import { triggerBuild } from './utils/bitrise-utils'
import { context } from '@actions/github'

async function run(): Promise<void> {
  try {
    const bitriseAppSlug = core.getInput('bitrise_app_slug')
    const bitriseBuildTriggerToken = core.getInput(
      'bitrise_build_trigger_token',
    )
    const bitriseWorkflow = core.getInput('bitrise_workflow')
    let branchName = context.ref.slice(11)
    let commitHash = context.sha

    if (context.payload.pull_request) {
      branchName = context.payload.pull_request.head.ref
      commitHash = context.payload.pull_request.sha
    }

    triggerBuild({
      bitriseAppSlug,
      bitriseWorkflow,
      bitriseBuildTriggerToken,
      branchName,
      commitHash,
      pullRequestId: context.payload.pull_request?.number,
      branchDestName: context.payload.pull_request?.base.ref,
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
