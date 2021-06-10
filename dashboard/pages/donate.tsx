import React, { useState, useEffect } from 'react';
import Header from '../src/Components/Header'
import {StripeDonation} from '../src/Components/StripeDonation';

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
      <StripeDonation/>
    </div>
  )
}

export default App