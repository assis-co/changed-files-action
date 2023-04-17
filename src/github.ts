// eslint-disable-next-line import/named
import {TaskOptions, simpleGit} from 'simple-git'
import * as debug from 'debug'
import * as core from '@actions/core'

if (core.isDebug()) debug.enable('simple-git, simple-git:*')

export async function getChangedFiles(
  source: string,
  target: string
): Promise<string[]> {
  const git = simpleGit()
  const options: TaskOptions = {
    '--name-only': null
  }

  options[source] = null
  options[target] = null

  core.debug(`[changed-files-action] diff options '${JSON.stringify(options)}'`)

  const diff = await git.diff(options)

  const files = diff.trim().split('\n')

  core.debug(
    `[changed-files-action] Founded these files '${JSON.stringify(files)}'`
  )

  return files
}
