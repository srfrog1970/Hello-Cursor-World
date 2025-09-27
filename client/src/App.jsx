import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiMessage, setApiMessage] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch hello message
        const helloResponse = await fetch('/api/hello')
        if (!helloResponse.ok) throw new Error('Network response was not ok')
        const helloData = await helloResponse.json()
        setApiMessage(helloData.message || 'No message')

        // Fetch current time
        const timeResponse = await fetch('/api/time')
        if (timeResponse.ok) {
          const timeData = await timeResponse.json()
          setCurrentTime(timeData.time)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const incrementCounter = async () => {
    try {
      const response = await fetch('/api/counter', { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        setCounter(data.count)
      }
    } catch (err) {
      console.error('Error incrementing counter:', err)
    }
  }

  return (
    <div className="container">
      <h1>Hello Cursor World (MERN)</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <div className="content">
          <div className="message-box">
            <h2>Backend Message</h2>
            <p><strong>{apiMessage}</strong></p>
          </div>
          
          {currentTime && (
            <div className="time-box">
              <h2>Current Server Time</h2>
              <p>{currentTime}</p>
            </div>
          )}

          <div className="counter-box">
            <h2>Interactive Counter</h2>
            <p>Count: <strong>{counter}</strong></p>
            <button onClick={incrementCounter} className="counter-btn">
              Increment Counter
            </button>
          </div>
        </div>
      )}
      {!loading && error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p style={{ marginTop: '2rem', color: '#666' }}>
        This React app calls the Express backend at various endpoints.
      </p>
    </div>
  )
}

export default App
