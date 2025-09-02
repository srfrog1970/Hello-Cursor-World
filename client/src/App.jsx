import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchHello() {
      try {
        const response = await fetch('/api/hello')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setApiMessage(data.message || 'No message')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHello()
  }, [])

  return (
    <div className="container">
      <h1>Hello Cursor World (MERN)</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <p>
          Backend says: <strong>{apiMessage}</strong>
        </p>
      )}
      {!loading && error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p style={{ marginTop: '2rem', color: '#666' }}>
        This React app calls the Express backend at <code>/api/hello</code>.
      </p>
    </div>
  )
}

export default App
