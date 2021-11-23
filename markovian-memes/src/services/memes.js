const memes = [
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


const getMeme = (id) => {
    const foundMeme = memes.filter(meme => {
        return (meme.memeid === id)
    })
    return foundMeme[0]
}


export default {getMemes, getMeme}