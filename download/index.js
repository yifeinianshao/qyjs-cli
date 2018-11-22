const download = require('download-git-repo')
const { templateUrl } = require('../config')

function downloadGitRepo(name) {
    return new Promise(resolve => {
        download(templateUrl, name, err => {
            resolve(err)
        })
    })
}

module.exports = {
    downloadGitRepo
}
