import React from 'react'

import Recognition from './Recognition'
import SignUpPage from './components/SignUpPage'
import AppBar from './components/AppBar'
export default function App() {
  return (
    <div className="App">
      <AppBar/>
      <SignUpPage/>
      <Recognition/>
    </div>
  );
}