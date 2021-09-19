import React, { useState, useEffect } from 'react';
import { Header } from '../src/Components/Header'
import { HomePage } from '../src/HomePage';

function App() {
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <Header/>
      <HomePage/>
    </div>
  )
}

export default App