// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const getStuff = () => "Wild function'ed text"
  const getMorningGreeting = () => <div>Good Morning</div>
  const getEveningGreeting = () => <div>Good Evening</div>
  let isMorninig = new Date().getHours() < 12


  return (
    <>
      <div className="ex-space">
        <h4 className='ex-title'>Spot-check 1</h4 >
        <div className="exercise" id="spotcheck-1">
          <h1>Stuff: {getStuff()}</h1>
        </div>
      </div>
      <div className="ex-space">
        <h4 className='ex-title'>Spot-check 2</h4 >
        <div className="exercise" id="spotcheck-2">
          {isMorninig ? getMorningGreeting() : getEveningGreeting()}
        </div>
      </div>

    </>
  )

}

export default App
