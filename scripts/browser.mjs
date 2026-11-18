import assert from 'node:assert/strict'
import { mkdir, access, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { chromium } from 'playwright'
import { preview } from 'vite'

const dir = process.env.EVIDENCE_DIR || path.join('.evidence', randomUUID())
await mkdir(dir, { recursive: true })
const executablePath = process.env.CHROMIUM_PATH
let browser, server, context
try {
  await access('dist/index.html')
  browser = await chromium.launch({ executablePath })
  server = await preview({ preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' })
  context = await browser.newContext({ locale: 'es-MX' })
  await context.tracing.start({ screenshots: true, snapshots: true })
  const page = await context.newPage()
  const errors = [], events = [], pending = []
  page.on('pageerror', err => errors.push(err.name))
  page.on('console', msg => {
    pending.push((async () => {
      const data = await msg.args()[0]?.jsonValue()
      if (data?.event) events.push(data)
      if (msg.type() === 'error' && data?.event !== 'adapter.failed') errors.push('console.error')
    })())
  })
  await page.goto('http://127.0.0.1:' + server.httpServer.address().port)
  await page.getByRole('heading', {name:'Consulta tu selección'}).waitFor()
  const input = page.getByLabel('Código de solicitud')
  async function submit(value) {
    await input.fill(value)
    await page.getByRole('button', {name:'Ver recomendaciones'}).click()
  }
  await submit('abc')
  await page.getByText('Usa el formato FUR- seguido de tres dígitos.').waitFor()
  assert.equal(await input.getAttribute('aria-invalid'), 'true')
  await submit('FUR-503')
  await page.getByText('No pudimos consultar la selección.', {exact:false}).waitFor()
  await submit('FUR-000')
  await page.getByText('Aún no hay recomendaciones', {exact:false}).waitFor()
  await submit(' fur-101 ')
  await page.getByText('Buscando tu selección…').waitFor()
  await page.getByRole('heading', {name:'Taller Bruma'}).waitFor()
  assert.equal(await page.getByRole('article').count(), 2)
  await page.screenshot({path:path.join(dir,'seleccion.png'),fullPage:true})
  await Promise.all(pending)
  assert.deepEqual(errors, [])
  assert.deepEqual(events.map(e=>e.event), ['lookup.invalid','lookup.started','adapter.failed','lookup.started','lookup.empty','lookup.started','lookup.ready'])
  for (const i of [1,3,5]) assert.equal(events[i].operationId, events[i+1].operationId)
  assert.equal(new Set(events.map(e=>e.operationId)).size, 4)
  await writeFile(path.join(dir,'events.json'), JSON.stringify(events,null,2))
  console.log('Recorrido completo; captura y eventos en', dir)
} catch (err) {
  console.error(err)
  process.exitCode = /Executable doesn't exist|ENOENT|Missing X server|Host system is missing dependencies/.test(String(err)) ? 78 : 1
  if (context) {
    await context.tracing.stop({path:path.join(dir,'failure.zip')})
    const page = context.pages()[0]
    if (page && !page.isClosed()) await page.screenshot({path:path.join(dir,'failure.png')})
  }
} finally {
  await browser?.close()
  if (server) await new Promise((resolve,reject)=>server.httpServer.close(err=>err?reject(err):resolve()))
}
