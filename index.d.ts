export interface Commit {
  author: string[];
  committer: string[];
  distinct: boolean;
  id: string;
  message: string;
  timestamp: Date;
  tree_id: string;
  url: string;
}

export interface Author {
  email: string;
  name: string;
  username: string;
}

export interface Committer {
  email: string;
  name: string;
  username: string;
}

export interface HeadCommit {
  author: Author;
  committer: Committer;
  distinct: boolean;
  id: string;
  message: string;
  timestamp: Date;
  tree_id: string;
  url: string;
}

export interface Pusher {
  email: string;
  name: string;
}

export interface License {
  key: string;
  name: string;
  node_id: string;
  spdx_id: string;
  url: string;
}

export interface Owner {
  avatar_url: string;
  email: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface Repository {
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: number;
  default_branch: string;
  deployments_url: string;
  description?: any;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage?: any;
  hooks_url: string;
  html_url: string;
  id: number;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string;
  languages_url: string;
  license: License;
  master_branch: string;
  merges_url: string;
  milestones_url: string;
  mirror_url?: any;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: Owner;
  private: boolean;
  pulls_url: string;
  pushed_at: number;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers: number;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  updated_at: Date;
  url: string;
  watchers: number;
  watchers_count: number;
}

export interface Sender {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface RootObject {
  after: string;
  base_ref?: any;
  before: string;
  commits: Commit[];
  compare: string;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  head_commit: HeadCommit;
  pusher: Pusher;
  ref: string;
  repository: Repository;
  sender: Sender;
}


