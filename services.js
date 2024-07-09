import axios from "axios"


const api_uri= "https://a4fe-2401-4900-1c6e-686a-b08e-afa8-2f8b-1f21.ngrok-free.app/api/v1"

export const UserSignup=(payload)=>{
    return axios.post(`${api_uri}/users/signup`,payload)
}

export const userLogin = (payload)=>{
    return axios.post(`${api_uri}/users/login`,payload)
}

export const SocialLogin = (payload)=>{
    return axios.post(`${api_uri}/users/social-login`,payload)
}





