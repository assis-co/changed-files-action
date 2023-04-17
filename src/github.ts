// eslint-disable-next-line import/named
import {TaskOptions, simpleGit} from 'simple-git'

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

  const diff = await git.diff(options)

  const files = diff.trim().split('\n')

  return files
}
