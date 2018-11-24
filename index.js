#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const program = require('commander')
const ora = require('ora')
const chalk = require('chalk')
const { downloadGitRepo } = require('./download')
const { prompt } = require('./prompt')

function log(context, isfail = true) {
    console.log(isfail ? chalk.red(context) : chalk.green(context))
}

function resolve(src) {
    return path.resolve(__dirname, '.', src)
}

const json = fs.readFileSync(resolve('package.json'))
const { version } = JSON.parse(json.toString())

program
    .version(version, '-v, --version')
    .command('init <name>')
    .action(async name => {
        if(!fs.existsSync(name)) {
            const answers = await prompt()
            const spinner = ora('正在下载模板...').start()
            const err = await downloadGitRepo(name)
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
