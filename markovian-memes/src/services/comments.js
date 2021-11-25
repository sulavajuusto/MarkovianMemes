import axios from 'axios'
var comments = [
    {
        commentId: 1,
        message: "nice",
        flagged: true,
        timeStamp: '1900-01-25',
        memeid: 1
    },
    {
        commentId: 2,
        message: "very good",
        flagged: true,
        timeStamp: '1900-01-25',
        memeid: 1
    },
    {
        commentId: 3,
        message: "cool",
        flagged: true,
        timeStamp: '1900-01-25',
        memeid: 2
    }
]

const getCommentsForMeme = (id) => {
    return (comments.filter(comment => {
        return (comment.memeid === id)
    }))
}

const newComment = (comment, user, id) => {
    comments = comments.concat({
        commentId: 5,
        message:comment,
        flagged:false,
        timeStamp: Date.now(),
        memeid:id,
        userid:user.id
    })

    console.log(id, user)
    return axios.post('https://localhost:5001/api/Comments/', {message:comment, userid:user.id, memeid:id})
        .then((res) => {
            console.log("neworodluser: ", res)
            console.log(res.data)
            return res.data
        })

    
}


export default { getCommentsForMeme, newComment } 