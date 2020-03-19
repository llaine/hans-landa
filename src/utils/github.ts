import { getInput } from '@actions/core'
import { Context } from '@actions/github/lib/context'

export async function shouldTriggerBuild(): Promise<boolean> {
  // TODO
  return true
}

type TriggerType = 'all' | 'command'
export interface ActionProps {
  bitriseAppSlug: string
  bitriseBuildTriggerToken: string
  bitriseWorkflow: string
  githubToken: string
  triggerOn: TriggerType
  commandAlias?: string
}

/**
 * Validate and return the props given to the action.
 * See action.yml
 */
export function getActionProps(): ActionProps {
  const triggerOn = (getInput('trigger_on', { required: false }) ||
    'all') as TriggerType
  return {
    triggerOn,
    bitriseAppSlug: getInput('bitrise_app_slug', { required: true }),
    bitriseBuildTriggerToken: getInput('bitrise_build_trigger_token', {
      required: true,
    }),
    bitriseWorkflow: getInput('bitrise_workflow', { required: true }),
    githubToken: getInput('github_token', { required: true }),
    commandAlias: getInput('command_alias', { required: false }),
  }
}

export function isCommentOnPr(context: Context): boolean {
  return (
    !!context.payload.comment &&
    !!context.payload.issue?.pull_request &&
    context.payload.action === 'created'
  )
}

export function shouldTriggerCommitBuild(trigger: TriggerType): boolean {
  return trigger === 'all'
}

export function shouldTriggerMessageBuild(trigger: TriggerType): boolean {
  return trigger === 'all' || trigger === 'command'
}

export function parseComment(
  comment: string,
): { command: string; workflow: string } {
  const [command, workflow] = comment.split(' ')
  return { command, workflow }
}
