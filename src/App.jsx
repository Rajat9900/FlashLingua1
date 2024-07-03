
// import Learn from './Pages/Learn/Learn'
import Tech from './Pages/Tech/Tech'
import Pay from './Pages/Pay/Pay'
import MainPage from './Pages/MainPage/MainPage'
// import Phrase from './Pages/phrase/Phrase'
import Topics from './Pages/Topics/Topics'
import LanguageToLearn from "./Pages/LanguageToLearn/LanguageToLearn"
import Header from './component/Header'
import {BrowserRouter as  Router,Route,Routes } from 'react-router-dom'
import Footer from './component/Footer/footer'

// import ViewPage from './Pages/ViewPages/ViewPage'

function App() {

  return (
    <>
    <Router>
    <Header/>
    <Routes>
      {/* <Route path='/' element={<Learn/>}></Route>  */}
        <Route path='/tech' element={<Tech/>}></Route>
       <Route path='/topics' element={<Topics/>}></Route>
      <Route path='/pay' element={<Pay/>}></Route>
      {/* <Route path='/' element={<Phrase/>}></Route> */}
    <Route path='/' element={<MainPage/>}></Route>   
       <Route path='languagetoLearn' element={<LanguageToLearn/>}></Route> 
      {/* <Route path='/' element={<ViewPage/>}></Route>   */}
      
     
   </Routes>
     
     <Footer/>
     </Router>
    </>
  )
}

export default App
