import * as core from '@actions/core'
import {shouldTriggerBuild} from './utils/github'
import { triggerBuild } from './utils/bitrise-utils'

// import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    shouldTriggerBuild()
  } catch (error) {
    core.setFailed(error.message)
  }

  // 1 recup params app_slug & build_trigger_token & github_token
  // check if we want to trigger the build //tbd
  // trigger the build

  triggerBuild({
    bitriseAppSlug: 'ca04e0425716e1ce',
    bitriseWorkflow: 'primary',
    bitriseBuildTriggerToken: 'Gs7vZtsWEz-UZ_vNdNxDIA',
    branchName: 'implement-bitrise-utils',
    commitHash: 'fb96e1ed33612afb5190156fc1ce53922fd2609a',
    pullRequestId: 10,
  })
}

run()
