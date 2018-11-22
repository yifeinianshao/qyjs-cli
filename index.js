const program = require('commander')
// cli init
program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .action(name => {
        console.log(name)
    })

program.parse(process.argv)
