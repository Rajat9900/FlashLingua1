import axios from "axios"


 export const api_url= "https://flashlingua.cards/api/v1"

export const UserSignup=(payload)=>{
    return axios.post(`${api_url}/users/signup`,payload)
}

export const userLogin = (payload)=>{
    return axios.post(`${api_url}/users/login`,payload)
}

export const SocialLogin = (payload)=>{
    return axios.post(`${api_url}/users/social-login`,payload)
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




