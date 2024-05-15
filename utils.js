const path = require('path')
const resolveRoot = (str) => {
    return path.resolve(process.cwd(), str);
};


module.exports = {
    resolveRoot
}

