import Axios from 'axios'

export async function triggerBuild({
  bitriseBuildTriggerToken,
  bitriseAppSlug,
  bitriseWorkflow,
  branchName,
  commitHash,
  pullRequestId,
  branchDestName,
  commitMessage,
}: {
  bitriseBuildTriggerToken: string
  bitriseAppSlug: string
  bitriseWorkflow: string
  branchName: string
  commitHash: string
  pullRequestId?: number
  branchDestName?: string
  commitMessage?: string
}): Promise<BitriseResponse> {
  console.log(
    `Triggering Bitrise workflow ${bitriseWorkflow} on branch ${branchName} for app slug ${bitriseAppSlug}...`,
  )
  return Axios.post(
    `https://app.bitrise.io/app/${bitriseAppSlug}/build/start.json`,
    {
      hook_info: {
        type: 'bitrise',
        build_trigger_token: bitriseBuildTriggerToken,
      },
      build_params: {
        branch: branchName,
        workflow_id: bitriseWorkflow,
        commit_hash: commitHash,
        commit_message: commitMessage,
        pull_request_id: pullRequestId,
        branch_dest: branchDestName,
      } as BitriseBuildParams,
      triggered_by: 'curl',
    },
  ).then(result => {
    const data = result.data as BitriseResponse
    console.log(`Build url: ${data.build_url}`)
    return data
  })
}

// More info here https://api-docs.bitrise.io/#/builds/build-trigger
interface BitriseBuildParams {
  branch: string
  workflow_id: string

  branch_dest?: string
  branch_dest_repo_owner?: string
  branch_repo_owner?: string
  build_request_slug?: string
  commit_hash?: string
  commit_message?: string
  diff_url?: string
  pull_request_author?: string
  pull_request_head_branch?: string
  pull_request_id?: number
  pull_request_merge_branch?: string
  pull_request_repository_url?: string
  skip_git_status_report?: boolean
  tag?: string
}

interface BitriseResponse {
  status: string // 'ok' when succeed
  message: string
  slug: string
  service: 'bitrise'
  build_slug: string
  build_number: number
  build_url: string
  triggered_workflow: string
}
