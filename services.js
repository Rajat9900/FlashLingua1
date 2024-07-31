import axios from "axios"


// export const api_url= "http://localhost:8803/v1"
 export const api_url= "https://flashlingua.cards/api/v1"
 export const AppUrl= "https://flashlingua.cards/"
//  export const AppUrl= "http://localhost:5173/"

export const UserSignup=(payload)=>{
    return axios.post(`${api_url}/users/signup`,payload)
}

export const userLogin = (payload)=>{
    return axios.post(`${api_url}/users/login`,payload)
}

export const SocialLogin = (payload)=>{
    return axios.post(`${api_url}/users/social-login`,payload)
}

export const AddCard = (payload,token)=>{
    return axios.post(`${api_url}/cards/add-card`,payload,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const EditCard = (payload,token)=>{
    return axios.post(`${api_url}/cards/edit-card`,payload,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const addSet = (payload,token)=> {
return axios.post(`${api_url}/set/add`,payload,{
    headers:{
        Authorization:"Bearer "+ token
    }
})
}

export const addGetSet = (token)=> {
return axios.get(`${api_url}/set/`,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}

export const getallCards = (token)=> {
return axios.get(`${api_url}/cards/get-all-cards`,{
    headers:{
        //Authorization:"Bearer "+ token
    } 
})
}

export const getCard = (payload,token)=> {
return axios.post(`${api_url}/cards/get-card`,payload,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}



export const getCards = (token)=> {
return axios.get(`${api_url}/cards/`,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}

export const getSets = (token)=> {
return axios.get(`${api_url}/set/`,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}


export const getViewCards = (token,id)=> {
return axios.get(`${api_url}/set/view-cards/`+id,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}


export const getFilteredCards=(payload)=>{
    return axios.post(`${api_url}/cards/get-filtered-card`,payload)
}


export const updateCardsOrder=(token,payload,id)=>{
    return axios.put(`${api_url}/set/update-card-order/`+id,payload,{
         headers:{
        Authorization:"Bearer "+ token
    } 
    })
}

export const createPaymentIntent = (token)=> {
return axios.get(`${api_url}/users/create-intent/`,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}


export const savePayment = (token,payload)=> {
return axios.post(`${api_url}/users/save-payment/`,payload,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}

export const deletedbCard = (token,payload)=> {
return axios.post(`${api_url}/cards/delete-card/`,payload,{
    headers:{
        Authorization:"Bearer "+ token
    } 
})
}



