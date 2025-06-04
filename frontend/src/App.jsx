import { useState } from 'react'
import './App.css'
import Selam from './components/selam'
import Sayac from './components/sayac'

function App() {
  
  return (
    <div>
      <Selam isim="Patron" />
      <Sayac/>
    </div>

    
  )
}

export default App
