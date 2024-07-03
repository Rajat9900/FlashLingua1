
// import Learn from './Pages/Learn/Learn'
// import Tech from './Pages/Tech/Tech'
// import Pay from './Pages/Pay/Pay'
import MainPage from './Pages/MainPage/MainPage'
// import Phrase from './Pages/phrase/Phrase'
// import Topics from './Pages/Topics/Topics'
// import Header from './components/Header'

// import LanguageToLearn from "./Pages/LanguageToLearn/LanguageToLearn"
// import Languages from "./components/Languages"
import Header from './component/Header'
// import { Route,Routes } from 'react-router-dom'
import Footer from './component/Footer/footer'

function App() {

  return (
    <>
    <Header/>
     
    
    {/* <Routes>
      <Route path='/' element={<Header/>}></Route>
      <Route path='/' element={<Header/>}></Route>
      <header/>
      <div className='ml-8 mr-8 '>
      </div> */}
{/* <Header/> */}
{/* <Learn/> */}
      {/* <Tech/> */}
      {/* <Topics/> */}
      {/* <Pay/> */}
      {/* <Phrase/>*/}
      <MainPage/>
      {/* <Languages/> */}
      {/* <LanguageToLearn/> */}

    {/* </Routes> */}
     
     <Footer/>
    </>
  )
}

export default App
