import axios from 'axios'


const getCommentsForMeme = (id) => {
    return axios.get('https://localhost:5001/api/Comments/meme/' + id) 
        .then((res) => {
            console.log("getCommentsformeme,", res)
            return res.data
        })
}

const newComment = (comment, user, id) => {
    console.log(id, user)
    return axios.post('https://localhost:5001/api/Comments/', {message:comment, userid:user, memeid:id})
        .then((res) => {
            console.log("Commentadded: ", res)
            return res.data
        })

    
}


export default { getCommentsForMeme, newComment } 