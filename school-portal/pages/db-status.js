import { useState } from 'react'

export default function DBStatus() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function checkDb() {
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/test-db')
      const json = await res.json()
      setStatus({ ok: res.ok, data: json })
    } catch (err) {
      setStatus({ ok: false, error: err.message })
    } finally { setLoading(false) }
  }

  async function createSample() {
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/create-sample')
      const json = await res.json()
      setStatus({ ok: res.ok, data: json })
    } catch (err) {
      setStatus({ ok: false, error: err.message })
    } finally { setLoading(false) }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>DB Status & Test</h1>
      <p>Use these buttons to verify MongoDB read/write via the API.</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={checkDb} disabled={loading}>Check DB (list collections)</button>
        <button onClick={createSample} disabled={loading}>Create Sample Document</button>
      </div>

      {loading && <p>Working...</p>}

      {status && (
        <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 6, overflow: 'auto' }}>
          {JSON.stringify(status, null, 2)}
        </pre>
      )}
    </main>
  )
}
