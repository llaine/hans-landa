/* eslint-disable no-console */
import {context} from '@actions/github'

export function shouldTriggerBuild(): boolean {
  console.log(context.payload)

  return true
}
