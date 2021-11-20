import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import memeService from '../services/memes'

const Memelist = () => {
    const [memes, setMemes] = useState([]);
    useEffect(() => {
        setMemes(memeService.getMemes())
    }, [])
    return (
        <div>
            <h1>Meme directory</h1>
            {memes.map(meme => {
                console.log(meme)
                return (
                    <div id={meme.memeid}>

                        <a href={"/memes/" + meme.memeid}>
                            <Image  src={meme.image} style={{ "width": "20%" }} className="w-20" alt="" thumbnail></Image>
                        </a>
                        
                        <p>{meme.CreatedOnDate}</p>
                        <p>upvotes: {meme.upvotes}, comments: {meme.comments.length}</p>
                    </div>


                )
            })}
        </div>
    )
}

export default Memelist