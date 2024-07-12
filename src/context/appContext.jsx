import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
 
const [token,setToken] = useState(null)
const [nativeLanguage,setNativeLanguage] = useState('')
const [languageToLearn,setLanguageToLearn] = useState('')
const[cardAdded,setCardAdded]= useState(false)
  

  const value = {

    token,setToken,
    nativeLanguage,setNativeLanguage,
    languageToLearn,setLanguageToLearn,
    cardAdded,setCardAdded
  };

  useEffect(() => {
      if(localStorage.getItem('token')!==null && localStorage.getItem('token')!==undefined){
        console.log('ti', localStorage.getItem('token'))
        setToken(localStorage.getItem('token'))
        setLanguageToLearn(localStorage.getItem("selectedLanguage"))
        setNativeLanguage( localStorage.getItem("selectedSecondLanguage"))
      }
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
