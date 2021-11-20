const comments = [
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

export default { getCommentsForMeme } 