import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './post'

function App() {
  

  return (
    <>
      <h1>Welcome to Web102 &#127881;</h1>
      <h2> Write a post about what you're most excited to learn about</h2>
      <Post name={"Christine Hughes"} isExcitedAbout ={"I'm excited to learn about Props"} likes ={"100"}></Post>
    </>
  )
}

export default App
