#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const handlebars = require('handlebars')
const ora = require('ora')
const chalk = require('chalk')
const { downloadGitRepo } = require('./download')
const { prompt } = require('./prompt')

function log(context, isfail = true) {
    console.log(isfail ? chalk.red(context) : chalk.green(context))
}

const json = fs.readFileSync('./package.json')
const { version } = JSON.parse(json.toString())

program
    .version(version, '-v, --version')
    .command('init <name>')
    .action(name => {
        if(!fs.existsSync(name)) {
            prompt().then(answers => {
                const spinner = ora('正在下载模板...').start()
                downloadGitRepo(name).then(err => {
                    if (err) {
                        spinner.fail()
                        log(err)
                    } else {
                        spinner.succeed()
                        const packageJson = `${name}/package.json`
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        }
                        if (fs.existsSync(packageJson)) {
                            const content = fs.readFileSync(packageJson).toString()
                            const result = handlebars.compile(content)(meta)
                            fs.writeFileSync(packageJson, result)
                        }
                        log('模板下载完成', false)
                    }
                })
            })
        } else {
            log('项目已存在')
        }
    })

program
    .parse(process.argv)
