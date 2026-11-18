type FlowEvent = 'lookup.invalid' | 'lookup.started' | 'lookup.ready' | 'lookup.empty' | 'adapter.failed' | 'runtime.error' | 'runtime.rejection'

export function record(event: FlowEvent, operationId?: string) {
  const level = event.startsWith('runtime.') || event === 'adapter.failed' ? 'error' : 'info'
  console[level]({ timestamp: new Date().toISOString(), level, event, operationId })
}
export function observeRuntime() {
  window.addEventListener('error', () => record('runtime.error'))
  window.addEventListener('unhandledrejection', () => record('runtime.rejection'))
}
