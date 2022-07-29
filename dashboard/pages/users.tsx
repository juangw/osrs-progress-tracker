import React, { useState, useEffect } from 'react';
import { Header } from '../src/Components/Header'
import { UsersPage } from '../src/Components/UsersPage';

function Users() {
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
      <UsersPage/>
    </div>
  )
}

export default Users