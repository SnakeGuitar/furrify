export type Maker = { name: string; specialty: string; reason: string }
const selection: Maker[] = [
  { name: 'Taller Bruma', specialty: 'Cabezas de fursuit', reason: 'Su trabajo con orejas móviles y siluetas de lobo coincide con tu referencia.' },
  { name: 'Atelier Musgo', specialty: 'Patas y accesorios', reason: 'Puede preparar las patas a juego con la paleta de tu personaje.' }
]
export function normalizeCode(value: string) {
  const code = value.trim().toUpperCase()
  return /^FUR-[0-9]{3}$/.test(code) ? code : null
}
export async function readSelection(code: string): Promise<readonly Maker[]> {
  await new Promise(resolve => setTimeout(resolve, 240))
  if (code === 'FUR-503') throw new Error('adapter_unavailable')
  return code === 'FUR-101' ? selection : []
}
