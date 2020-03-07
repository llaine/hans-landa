import * as core from '@actions/core'
import envVariableExists from 'utils/envVariableExists'
import {shouldTriggerBuild} from 'utils/github'

async function run(): Promise<void> {
  try {
    envVariableExists(process.env.github_token, 'github_token')
    envVariableExists(process.env.bitrise_app_slug, 'bitrise_app_slug')
    envVariableExists(
      process.env.bitrise_build_trigger_token,
      'bitrise_build_trigger_token'
    )

    shouldTriggerBuild()
  } catch (error) {
    core.setFailed(error.message)
  }

  // 1 recup params app_slug & build_trigger_token & github_token
  // check if we want to trigger the build //tbd
  // trigger the build
}

run()
