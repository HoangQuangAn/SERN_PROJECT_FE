import axios from "../axios"
const handleLogin=(userEamil, userPassword)=>{
    return axios.post('/api/login',{email:userEamil,password:userPassword});
}

export {handleLogin}