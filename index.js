#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const ora = require('ora')
const chalk = require('chalk')
const { downloadGitRepo } = require('./download')
const { prompt } = require('./prompt')
const packageConfig = require('./package.json')

function log(context, isfail = true) {
    console.log(isfail ? chalk.red(context) : chalk.green(context))
}

program
    .version(packageConfig.version, '-v, --version')
    .command('init <type> <name>')
    .action(async (type, name) => {
        if(!fs.existsSync(name)) {
            const answers = await prompt()
            const spinner = ora('正在下载模板...').start()
            const err = await downloadGitRepo(type, name)
            if (err) {
                spinner.fail()
                log(err)
            } else {
                spinner.succeed()
                const absoluteUrl = process.cwd()
                const packageJson = `${absoluteUrl}/${name}/package.json`
                const meta = {
                    ...answers,
                    name
                }
                if (fs.existsSync(packageJson)) {
                    const content = fs.readFileSync(packageJson).toString()
                    const result = Object.assign(JSON.parse(content), meta)
                    fs.writeFileSync(packageJson, JSON.stringify(result, null, 4))
                }
                log('模板下载完成', false)
            }
        } else {
            log('项目已存在')
        }
    })

program
    .parse(process.argv)
