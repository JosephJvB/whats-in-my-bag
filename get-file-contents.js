const fs = require('fs');
const path = require('path');

const results = [];
module.exports = function read (dir) {
    if(fs.lstatSync(dir).isDirectory() == false) {
        return console.log(`Error: ${dir} is not a directory`);
    }

    for(const entry of fs.readdirSync(dir)) {
        // todo: configure ignore pattern
        if(entry.startsWith('.') || entry == 'node_modules') {
            continue;
        }

        const p = path.join(dir, entry);
        if(fs.lstatSync(p).isDirectory()) {
            read(p);
        }
        else {
            results.push({
                file: p,
                raw: fs.readFileSync(p, 'utf8').toLowerCase(),
            });
        }
    }

    return results;
}