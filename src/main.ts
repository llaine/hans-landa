import * as core from '@actions/core'
import {shouldTriggerBuild} from './utils/github'

async function run(): Promise<void> {
  try {
    shouldTriggerBuild()
  } catch (error) {
    core.setFailed(error.message)
  }

  // 1 recup params app_slug & build_trigger_token & github_token
  // check if we want to trigger the build //tbd
  // trigger the build
}

run()
