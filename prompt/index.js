const inquirer = require('inquirer')
const { question } = require('../config')

function prompt() {
    return new Promise(resolve => {
        inquirer.prompt(question).then(answers => {
            resolve(answers)
        })
    })
}

module.exports = {
    prompt
}
