import fs from 'node:fs'
const s = fs.readFileSync('public/js/webflow.schunk.js', 'utf8')
const i = s.indexOf('e.timing?.duration??i.DEFAULTS.DURATION')
console.log(s.slice(i - 1500, i + 2500))
