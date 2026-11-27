import fs from 'node:fs'
const [interactions, timelines] = JSON.parse(fs.readFileSync('C:/Users/zohair/AppData/Local/Temp/opencode/velour-ix3.json', 'utf8'))
const tl = Object.fromEntries(timelines.map((t) => [t.id, t]))
for (const ix of interactions) {
  console.log('\nINTERACTION ' + ix.id + ' scope=' + JSON.stringify(ix.scope))
  for (const trig of ix.triggers) {
    console.log('  TRIGGER ' + trig[0] + ' ' + JSON.stringify(trig[1]) + ' -> ' + JSON.stringify(trig[2]))
  }
  console.log('  timelineIds: ' + ix.timelineIds.join(', '))
  console.log('  conditionalPlayback: ' + JSON.stringify(ix.conditionalPlayback || null))
  for (const id of ix.timelineIds) {
    const t = tl[id]
    console.log('  TIMELINE ' + id)
    for (const a of t?.actions || []) {
      console.log('    ' + JSON.stringify(a))
    }
  }
}
