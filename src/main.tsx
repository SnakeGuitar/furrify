import { useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { normalizeCode, readSelection, type Maker } from './catalog'
import { observeRuntime, record } from './events'
import './style.css'

type Result = { kind: 'idle' | 'invalid' | 'loading' | 'empty' | 'error' } | { kind: 'ready'; makers: readonly Maker[] }

function App() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<Result>({ kind: 'idle' })
  const busy = result.kind === 'loading'
  async function lookup(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    const id = crypto.randomUUID()
    const code = normalizeCode(value)
    if (!code) {
      record('lookup.invalid', id)
      setResult({kind:'invalid'})
      return
    }
    record('lookup.started', id)
    setResult({kind:'loading'})
    try {
      const makers = await readSelection(code)
      record(makers.length ? 'lookup.ready' : 'lookup.empty', id)
      setResult(makers.length ? {kind:'ready', makers} : {kind:'empty'})
    } catch {
      record('adapter.failed', id)
      setResult({kind:'error'})
    }
  }
  return <><header><strong>Furrify<span>✳</span></strong><small>Edición piloto</small></header>
    <main><section className="intro"><p className="label">Vinculación con makers</p><h1>Tu selección<br/><i>de talleres.</i></h1>
    <p>Descubre los talleres independientes que nuestro equipo ha elegido para tu personaje.</p></section>
    <section className="panel"><h2>Consulta tu selección</h2><p>Escribe el código de tu solicitud para ver las recomendaciones.</p>
    <form onSubmit={lookup}><label htmlFor="code">Código de solicitud</label>
    <input id="code" autoComplete="off" spellCheck={false} placeholder="FUR-101" value={value} disabled={busy}
      aria-invalid={result.kind==='invalid'} aria-describedby={result.kind==='invalid'?'feedback':'hint'}
      onChange={e=>{setValue(e.target.value);setResult({kind:'idle'})}}/>
    <small id="hint">Prueba con el código ficticio FUR-101.</small>
    <button disabled={busy}>{busy?'Consultando…':'Ver recomendaciones'}</button></form>
    <div aria-live="polite" id="feedback">
    {result.kind==='invalid' && <p>Usa el formato FUR- seguido de tres dígitos.</p>}
    {busy && <p>Buscando tu selección…</p>}
    {result.kind==='empty' && <p>Aún no hay recomendaciones para este código.</p>}
    {result.kind==='error' && <p>No pudimos consultar la selección. Inténtalo de nuevo.</p>}
    {result.kind==='ready' && <><h3>Talleres recomendados</h3>{result.makers.map(m=><article key={m.name}><small>{m.specialty}</small><h4>{m.name}</h4><p>{m.reason}</p></article>)}</>}
    </div></section></main><footer>Demostración con talleres y solicitudes ficticios.</footer></>
}
observeRuntime()
createRoot(document.getElementById('root')!).render(<App/>)
