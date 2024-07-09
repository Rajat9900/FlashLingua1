import axios from "axios"


const api_url= "https://flashlingua.cards/api/v1"

export const UserSignup=(payload)=>{
    return axios.post(`${api_url}/users/signup`,payload)
}

export const userLogin = (payload)=>{
    return axios.post(`${api_url}/users/login`,payload)
}
