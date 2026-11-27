import fs from 'node:fs'
const f = 'C:/Users/zohair/AppData/Local/Temp/opencode/velour-site.js'
const s = fs.readFileSync(f, 'utf8')
for (const key of ['gsap', 'SplitText', 'ScrollTrigger', 'Lenis', 't-', 'id:"i-', 'from(', 'to(', 'set(']) {
  console.log('\n=== ' + key + ' ===')
  let i = -1
  let n = 0
  while ((i = s.indexOf(key, i + 1)) !== -1 && n < 30) {
    console.log('--- @' + i + ' ---\n' + s.slice(Math.max(0, i - 180), Math.min(s.length, i + 420)))
    n++
  }
}
