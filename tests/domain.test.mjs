import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeCode, readSelection } from '../src/catalog.ts'
test('admite un código copiado con espacios y minúsculas', () => {
  assert.equal(normalizeCode(' fur-101 '), 'FUR-101')
  for (const invalid of ['', '101', 'FUR-10', 'FUR-1000', 'FUR-1a1']) assert.equal(normalizeCode(invalid), null)
})
test('la selección manual contiene de uno a tres talleres distintos, con motivo', async () => {
  const makers = await readSelection('FUR-101')
  assert.ok(makers.length > 0 && makers.length <= 3)
  assert.equal(new Set(makers.map(m => m.name)).size, makers.length)
  assert.ok(makers.every(m => m.reason.trim()))
})
test('distingue una selección vacía de un fallo del adaptador', async () => {
  assert.deepEqual(await readSelection('FUR-000'), [])
  await assert.rejects(readSelection('FUR-503'), /adapter_unavailable/)
})
