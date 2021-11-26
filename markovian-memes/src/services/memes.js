import axios from 'axios'




const getMemes = () => {
    //TODO: get memes from backend
    return axios.get('https://localhost:5001/allSaved/')
        .then((res) => {
            console.log("allMemes: ", res)
            console.log(res.data)
            return res
        })
    
}
const getUserMemes = (id) => {
    console.log("usermemes", id)
    return axios.get('https://localhost:5001/api/Users/' + id)
        .then((res) => {
            console.log("usermemes: ", res)
            console.log(res.data)
            return res
        })
}

const getMeme = (id) => {
    console.log("memes", id)
    return axios.get('https://localhost:5001/meme/' + id)
        .then((res) => {
            console.log("memes: ", res)
            console.log(res.data)
            return res
        })
}

const saveMeme = (memeid, userid) => {
    console.log(memeid, userid)
    return axios.post('https://localhost:5001/Save/' + memeid + "/" +userid)
        .then((res) => {
            console.log("neworodluser: ", res)
            console.log(res.data)
            return res.data
        })
}

const upvoteMeme = (memeid, userid) => {
    console.log(memeid, userid)
    return axios.post('https://localhost:5001/Upvote/' + memeid + "/" +userid.userId)
        .then((res) => {
            console.log("neworodluser: ", res)
            console.log(res.data)
            return res.data
        })
}

export default { getMemes, getMeme, saveMeme, upvoteMeme, getUserMemes}