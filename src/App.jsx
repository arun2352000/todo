import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Body from './components/Body.jsx'
import FormComponent from './components/FormComponent.jsx'
import Navbar from './components/Navbar.jsx'
import FetchComponent from './components/FetchComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
            <h1>this is app componenet</h1>
      </div> */}
      <Navbar/>
      <FormComponent/>
      {/* <Body/> */}
      <FetchComponent/>
    </>
  )
}

export default App
