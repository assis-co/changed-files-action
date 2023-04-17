import * as core from '@actions/core'
import {minimatch} from 'minimatch'
import {getChangedFiles} from './github'

async function run(): Promise<void> {
  try {
    const source = core.getInput('source')
    const target = core.getInput('target')
    const pattern = core.getInput('pattern')
    core.debug(`[changed-files-action] Commit target => '${target}'`)
    core.debug(`[changed-files-action] Pattern => '${pattern}'`)

    const files = (await getChangedFiles(source, target)).filter(
      minimatch.filter(pattern, {matchBase: true})
    )

    core.setOutput('has-changes', files.length > 0)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
