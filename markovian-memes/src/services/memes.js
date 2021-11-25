import axios from 'axios'


var memes = [
    {
        memeid: 1,
        memeText: "meme text",
        createdOnDate: "2021-10-19",
        comments: [1, 2],
        upvotes: 15,
        image: "/images/Meme1.png"

    },
    {
        memeid: 2,
        memeText: "meme text",
        createdOnDate: "2021-10-19",
        comments: [3],
        upvotes: 2,
        image: "/images/Meme2.jpg"

    },
    {
        memeid: 3,
        memeText: "meme text",
        createdOnDate: "2021-10-19",
        comments: [],
        upvotes: 3,
        image: "/images/Meme3.jpg"
    }
]


const getMemes = () => {
    //TODO: get memes from backend
    return (memes)
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
    return axios.post('https://localhost:5001/Upvote/' + memeid + "/" +userid)
        .then((res) => {
            console.log("neworodluser: ", res)
            console.log(res.data)
            return res.data
        })
}

export default { getMemes, getMeme, saveMeme, upvoteMeme, getUserMemes}