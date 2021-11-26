import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import memeService from '../services/memes'
import commentService from '../services/comments'

import {
    Link
  } from "react-router-dom";
  
  const Memelist = (props) => {
    const [memes, setMemes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            var memeList = []
            var res = await memeService.getMemes()
            console.log(res)
            console.log("=??====")
            console.log(res.data)
            memeList = res.data
            var promises = memeList.map(async(meme) => {
                console.log("meme", meme)
                var comments = []
                comments = await commentService.getCommentsForMeme(meme.memeId)
                var fetchedMeme = await memeService.getMeme(meme.memeId)
                console.log("comments", comments)
                console.log(fetchedMeme)
                return {...meme, comments: comments, fetchedMeme: fetchedMeme }
            })
            var results = await Promise.all(promises)
            console.log("results:", results)
            setMemes(results)
        }
        
        fetchData()
    
    }, [])

    return (
        <div>
            <h1>Meme directory</h1>
            { memes.length > 0 ?
                memes.map((meme) => {
                    console.log("meme", meme)
                    return (
                        <div id={meme.memeId}>

                            <Link to={"/memes/" + meme.memeId}>
                                <Image src={'data:image/jpeg;base64,' + meme.fetchedMeme.data.data} style={{ "width": "20%" }} className="w-20" alt="" thumbnail></Image>
                            </Link>

                            <p></p>
                            <p>upvotes: {meme.fetchedMeme.upvotes}, comments: {meme.comments.length}</p>
                        </div>


                    )
                })
                :
                <p></p>}
        </div>
    )
}

export default Memelist