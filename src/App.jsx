

import './App.css'
import Header from './component/Header/page'
import { Route,Routes } from 'react-router-dom'
import Footer from './component/Footer/footer'
import Login from './component/LoginPage/page'
import Signup from './component/Signup/page'
import Language from './component/Language.jsx/page'
import Language2 from './component/Language2/page'
import RunningBoy from './component/RunningBoy/page'

// import Logi

function App() {
 
  return (
    <>
     <Header/>
    <Routes>
      {/* <Route path='/' element={<Header/>}></Route> */}
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/language' element={<Language/>}></Route>
      <Route path='/language2' element={<Language2/>}></Route>
      <Route path='/runningboy' element={<RunningBoy/>}></Route>

    </Routes>
     <Footer/>
    </>
  )
}

export default App
