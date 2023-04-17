import * as core from '@actions/core'
import * as github from '@actions/github'
import {getFiles} from './github'

async function run(): Promise<void> {
  try {
    const target = core.getInput('target') || github.context.sha
    core.debug(`Commit target => '${target}'`)

    const pattern = /.*/gm
    core.debug(`Pattern => '${pattern}'`)

    const files = (await getFiles(target)).filter(f => {
      if (f === undefined) return false

      core.debug(`Testing file '${f.filename}'`)

      return new RegExp(pattern).test(f.filename)
    })

    core.setOutput('has-changes', files.length > 0)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
