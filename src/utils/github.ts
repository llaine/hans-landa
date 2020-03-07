/* eslint-disable no-console */
import * as core from '@actions/core'
import {context} from '@actions/github'

export function shouldTriggerBuild(): boolean {
  const isPrDraft = core.getInput('draft', {required: true}) === 'true'

  console.log('is PR draft ', isPrDraft)

  console.log(context.payload)

  return true
}
