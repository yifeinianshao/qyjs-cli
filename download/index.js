const download = require('download-git-repo')
const { templateUrl } = require('../config')

function downloadGitRepo(type, name) {
    return new Promise(resolve => {
        download(templateUrl[type], name, err => {
            resolve(err)
        })
    })
}

module.exports = {
    downloadGitRepo
}
