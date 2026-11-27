import fs from 'node:fs'
import { load } from 'cheerio'

const file = 'C:/Users/zohair/AppData/Local/Temp/opencode/velour-live.html'
const html = fs.readFileSync(file, 'utf8')
const $ = load(html)
const scripts = $('script').toArray().map((s, i) => ({
  i,
  src: $(s).attr('src') || '',
  type: $(s).attr('type') || '',
  len: ($(s).html() || '').length,
  head: ($(s).html() || '').slice(0, 200).replace(/\s+/g, ' '),
}))
console.log('script count', scripts.length)
console.log(JSON.stringify(scripts.filter((s) => s.src || s.len > 200), null, 2))
const keys = ['data-wf-ix', 'ix3', 'interaction', 'Webflow.push', 'gsap', 'SplitText', 'animate', 'data-ix', 'wf-page', 'data-wf--', 'visibility: hidden']
for (const k of keys) {
  const re = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  console.log(k, (html.match(re) || []).length)
}
