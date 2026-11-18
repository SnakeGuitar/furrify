import { spawnSync } from 'node:child_process'
import { createHash, randomUUID } from 'node:crypto'
import { mkdirSync, writeFileSync, readFileSync, readdirSync, lstatSync, readlinkSync } from 'node:fs'
import path from 'node:path'

const id = new Date().toISOString().replaceAll(':','-') + '-' + randomUUID().slice(0,8)
const dir = path.join('.evidence',id)
mkdirSync(dir,{recursive:true})
const checks = ['check','test','build','browser'].map(name=>({name,command:'npm run '+name,status:'not_run',exitCode:null}))
function git(...args) { return spawnSync('git',args,{encoding:'utf8'}) }
const files = git('ls-files','--cached','--others','--exclude-standard','-z')
if (files.status !== 0) throw Error('Ejecuta verify desde la raíz del repositorio Git.')
const sha = data => createHash('sha256').update(data).digest('hex')
const manifest = {}
for (const file of files.stdout.split('\0').filter(Boolean).sort()) {
  const stat = lstatSync(file,{throwIfNoEntry:false})
  manifest[file] = !stat ? 'deleted' : sha(stat.isSymbolicLink()?readlinkSync(file):readFileSync(file))
}
writeFileSync(path.join(dir,'files.json'),JSON.stringify(manifest,null,2))
const report = {id,revision:git('rev-parse','--verify','HEAD').stdout.trim() || null,sourceHash:sha(JSON.stringify(manifest)),node:process.version,platform:process.platform,chromiumPath:process.env.CHROMIUM_PATH || null,checks}
function save() {
  report.artifacts = readdirSync(dir).filter(n=>!['summary.md','result.json'].includes(n))
  writeFileSync(path.join(dir,'result.json'),JSON.stringify(report,null,2))
  writeFileSync(path.join(dir,'summary.md'),['# Verificación '+id,'','Fuente SHA-256 '+report.sourceHash,'',...checks.map(c=>'- '+c.command+' — '+c.status+' (salida '+(c.exitCode ?? 'sin ejecutar')+') '+(c.reason||'')),'','Evidencias: '+report.artifacts.join(', ')].join('\n')+'\n')
}
save()
for (const check of checks) {
  if (check.name==='browser' && checks.find(c=>c.name==='build').status!=='passed') {
    check.reason='La compilación requerida no terminó correctamente.'
    save()
    continue
  }
  const r = spawnSync('npm',['run',check.name],{encoding:'utf8',env:{...process.env,EVIDENCE_DIR:path.resolve(dir)}})
  check.exitCode=r.status
  check.status=r.error || r.status===78 ? 'blocked' : r.status===0 ? 'passed' : 'failed'
  if (r.error || r.signal) check.reason=String(r.error || r.signal)
  writeFileSync(path.join(dir,check.name+'.log'),[r.stdout,r.stderr,check.reason].filter(Boolean).join('\n'))
  console.log(check.command,check.status)
  save()
}
console.log(dir)
const problem=checks.find(c=>c.status!=='passed')
if (problem) process.exitCode=problem.exitCode || 1
