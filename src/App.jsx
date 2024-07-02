

import './App.css'
import Header from './component/Header'
import { Route,Routes } from 'react-router-dom'
import Footer from './component/Footer/footer'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Header/>}></Route>
      <Route path='/' element={<Header/>}></Route>


    </Routes>
     <header/>
     <Footer/>
    </>
  )
}

export default App
