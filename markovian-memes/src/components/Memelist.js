import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import memeService from '../services/memes'
import commentService from '../services/comments'

import {
    Link
  } from "react-router-dom";
  
const Memelist = () => {
    const [memes, setMemes] = useState([]);
    useEffect(() => {
        setMemes(memeService.getMemes())
    }, [])
    return (
        <div>
            <h1>Meme directory</h1>
            {memes.map((meme) => {
                console.log(meme)
                var comments = []
                comments = commentService.getCommentsForMeme(meme.memeid)
                console.log(comments)
                return (
                    <div id={meme.memeid}>

                        <Link to={"/memes/" + meme.memeid}>
                            <Image  src={meme.image} style={{ "width": "20%" }} className="w-20" alt="" thumbnail></Image>
                        </Link>
                        
                        <p>{meme.CreatedOnDate}</p>
                        <p>upvotes: {meme.upvotes}, comments: {comments.length}</p>
                    </div>


                )
            })}
        </div>
    )
}

export default Memelist