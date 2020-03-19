import * as core from '@actions/core'
import { triggerBuild } from './utils/bitrise-utils'
import { context, GitHub } from '@actions/github'
import {
  getActionProps,
  isCommentOnPr,
  ActionProps,
  shouldTriggerCommitBuild,
  shouldTriggerMessageBuild,
  parseComment,
} from './utils/github'

/**
 * Token to trigger the command line
 */
const COMMAND_TRIGGER = '@hans-landa'

async function run(): Promise<void> {
  try {
    const props = getActionProps()
    if (isCommentOnPr(context) && shouldTriggerMessageBuild(props.triggerOn)) {
      await buildOnComment(props)
    } else if (shouldTriggerCommitBuild(props.triggerOn)) {
      await buildOnCommit(props)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function buildOnCommit(props: ActionProps): Promise<void> {
  let branchName = context.ref.slice(11)
  let commitHash = context.sha

  if (context.payload.pull_request) {
    console.log('>>Triggered by commit on PR')
    branchName = context.payload.pull_request.head.ref
    commitHash = context.payload.pull_request.head.sha
  } else {
    console.log('>>Triggered by commit')
  }

  console.log(JSON.stringify(context.payload, null, 2))
  triggerBuild({
    ...props,
    branchName,
    commitHash,
    commitMessage: context.payload.pull_request?.body,
    pullRequestId: context.payload.pull_request?.number,
    branchDestName: context.payload.pull_request?.base.ref,
  })
}

async function buildOnComment(props: ActionProps): Promise<void> {
  console.log('>>Triggered by comment on PR')
  console.log(JSON.stringify(context.payload, null, 2))

  const client = new GitHub(props.githubToken)

  const prNumber = context.payload.issue?.number
  const repo = context.payload.repository?.name
  const owner = context.payload.repository?.owner.login
  console.log({
    prNumber,
    repo,
    owner,
  })
  if (!prNumber || !repo || !owner) {
    console.log('Unable to find PR info', {
      prNumber,
      repo,
      owner,
    })
    return
  }
  const pr = await client.pulls.get({ pull_number: prNumber, owner, repo })
  const branchName = pr.data.head.ref
  const commitHash = pr.data.head.sha
  const branchDestName = pr.data.base.ref
  const { command, workflow } = parseComment(context.payload.comment.body)
  console.log({
    command,
    workflow,
  })
  if (
    command === COMMAND_TRIGGER &&
    (workflow === props.bitriseWorkflow || workflow === props.commandAlias)
  ) {
    triggerBuild({
      ...props,
      branchName,
      commitHash,
      commitMessage: '',
      pullRequestId: prNumber,
      branchDestName,
    })
  }
}

run()
