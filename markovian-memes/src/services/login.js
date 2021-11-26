import axios from 'axios'

const login = (idToken) => {
    const config = { headers: {'Content-Type': 'application/json'} };
    return axios.post('https://localhost:5001/Account/google-login', idToken, config)
        .then((res) => {
            console.log(res)
            return res.data
        })

}

const newOrOldUser = (userName) => {
    const config = { headers: {'Content-Type': 'application/json'} };
    return axios.post('https://localhost:5001/api/Users/new', {userName:userName}, config)
        .then((res) => {
            console.log("neworodluser: " ,res)
            console.log(res.data)
            return res.data
        })
}

const getUserById = (id) => {
    console.log(id)
    return axios.get('https://localhost:5001/api/Users/' + id) 
        .then((res) => {
            console.log("getuserByid,", res)
            return res.data
        })
}
export default { login, newOrOldUser,getUserById } 