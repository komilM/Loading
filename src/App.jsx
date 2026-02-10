import React, { useEffect, useState } from 'react'
import "./App.css"

const App = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = () => {
    setLoading(true)
    setError(null)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) {
          throw new Error("Ma'lumot olishda xatolik")
        }
        return res.json()
      })
      .then(data => {
        setData(data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return <h2 className="error">{error}</h2>
  }

  return (
    <div style={{ marginTop: 12 }}>
      {data.map((u) => (
        <div
          key={u.id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <b>{u.name}</b>
          <div>{u.email}</div>
          <small>{u.company?.name}</small>
        </div>
      ))}
    </div>
  )
}

export default App
