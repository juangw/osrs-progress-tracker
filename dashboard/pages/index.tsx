import { useState, useEffect } from 'react';
import AppEntry from '../src/AppEntry';

function App() {
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return AppEntry()
}

export default App