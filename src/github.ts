import * as core from '@actions/core'
import * as github from '@actions/github'
import {CommitFile} from './types'

export async function getFiles(
  target: string
): Promise<(CommitFile | undefined)[]> {
  const client = github.getOctokit(core.getInput('github_token'))

  const commits = await client.rest.repos.listCommits({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    sha: target
  })

  core.debug(
    `Retrieving files '${JSON.stringify(commits.data.map(d => d.files))}'`
  )

  if (!commits.data) return []

  const files = commits.data.flatMap(c => c.files)

  return files
}
