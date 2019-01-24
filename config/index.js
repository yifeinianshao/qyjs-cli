const templateAuthor = 'yifeinianshao'
const templateUrl = {
    vue: `${templateAuthor}/vue-template`,
    react: `${templateAuthor}/react-template`,
    wxapp: `${templateAuthor}/wx-app`
}

const question = [
    {
        name: 'description',
        message: '请输入项目描述'
    },
    {
        name: 'author',
        message: '请输入作者名称'
    }
]

module.exports = {
    question,
    templateUrl
}
