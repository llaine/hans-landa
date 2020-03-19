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

const COMMAND_TRIGGER = '@Hans-landa'

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
    branchName = context.payload.pull_request.head.ref
    commitHash = context.payload.pull_request.head.sha
  }

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
  const client = new GitHub(props.githubToken)
  console.log(JSON.stringify(context.payload, null, 2))

  const prInformation = context.payload.pull_request?.url.split('/')
  const prNumber = parseInt(`${prInformation.pop()}`, 10)
  const owner = prInformation[4]
  const repo = prInformation[5]
  const pr = await client.pulls.get({ pull_number: prNumber, owner, repo })
  const branchName = pr.data.head.ref
  const commitHash = pr.data.head.sha
  const branchDestName = pr.data.base.ref
  const { command, workflow } = parseComment(context.payload.comment.body)
  if (command === COMMAND_TRIGGER && workflow === props.bitriseWorkflow) {
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
