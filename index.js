const fs = require('fs');
const getFileContents = require('./get-file-contents');

const args = process.argv.slice(2);
const query = args.shift();
if(!query) {
    console.log('no search query provided');
    exit(1);
}
const q = query.toLowerCase();
const p = args.shift() || process.cwd();
if(!fs.existsSync(p)) {
    console.log(`path does not exist @ ${p}`);
    return exit(1);
}

const contentsRaw = getFileContents(p);
if(!contentsRaw) return exit(1);
const results = [];
for(const r of contentsRaw) {
    if(!r.raw.includes(q)) {
        continue;
    }
    results.push({
        [r.file]: r.raw.split(q).length - 1
    });
}
console.log(`Found "${q}" in ${results.length} files`);
results.forEach((r, i) => console.log(r));
exit(0);

function exit(n) {
    console.log('Exiting...');
    process.exit(n);
}