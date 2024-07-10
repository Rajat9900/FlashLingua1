import {BrowserRouter as  Router,Route,Routes } from 'react-router-dom'
import Header from '../Header/page'
import Tech from '../../Pages/Tech/Tech'
import Topics from '../../Pages/Topics/Topics'
import Pay from '../../Pages/Pay/Pay'
import MainPage from '../../Pages/MainPage/MainPage'
import LanguageToLearn from '../../Pages/LanguageToLearn/LanguageToLearn'
import Footer from '../Footer/footer'
import Login from '../LoginPage/page'
import Signup from '../Signup/page'
import Language from '../Language.jsx/page'
import Language2 from '../Language2/page'
import RunningBoy from '../RunningBoy/page'
import Phrase from '../../Pages/phrase/Phrase'
import Images from '../../Pages/Images/Images'
import NewCard from '../../Pages/NewCard/NewCard'
import DragDrop from '../../Pages/DragDrop/DragDrop'
import AddSets from '../../Pages/addSetsPage/AddSets'
// import ImagesStyle from '../../Pages/Images/StylesImages/ImagesStyle'

const RoutesDeclare = () => {
  return (
   <>
    <Router>
    <Header/>
    <Routes>
      {/* <Route path='/' element={<Learn/>}></Route>  */}
      {/* <Route path='/imageSlide' element={<ImagesStyle/>}></Route>  */}
        <Route path='/tech' element={<Tech/>}></Route>
       <Route path='/topics' element={<Topics/>}></Route>
      <Route path='/pay' element={<Pay/>}></Route>
      <Route path='/phrase' element={<Phrase/>}></Route>
    <Route path='/mainPage' element={<MainPage/>}></Route>   
       <Route path='/languagetoLearn' element={<LanguageToLearn/>}></Route> 
       <Route path='/' element={<Login/>}></Route> 
       <Route path='/signup' element={<Signup/>}></Route> 
       <Route path='/language' element={<Language/>}></Route>
      <Route path='/language2' element={<Language2/>}></Route>
      <Route path='/runningboy' element={<RunningBoy/>}></Route>
      <Route path='/images' element={<Images/>}></Route>
      <Route path='/newCard' element={<NewCard/>}></Route>
      <Route path='/setsPage' element={<AddSets/>}></Route>
      <Route path='/dragDrop' element={<DragDrop/>}></Route>
      {/* <Route path='/' element={<ViewPage/>}></Route>   */}
     
   </Routes>
     
     <Footer/>
     </Router>
   </>
  )
}

export default RoutesDeclare
