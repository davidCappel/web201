import { useState } from 'react'
import './App.css';
import Calendar from './components/Calendar';

const App = () => {

  return (
    <div className="App">

      <h1>True Crime</h1>
      <h2>Crime over the past week</h2>
      <Calendar></Calendar>
    </div>
  )
}

export default App
