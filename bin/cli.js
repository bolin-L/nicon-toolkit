let program = require('commander');
let pkg     = require('../package.json');

program
    .version(pkg.version)
    .usage('[options] [value ...]')
    .option('-c, --config <config>', 'set icon repo config file path')
    .parse(process.argv);

module.exports = program;
