import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import memeService from '../services/memes'
import commentService from '../services/comments'
import { useHistory } from 'react-router-dom';

import {
    Link
} from "react-router-dom";

const Memelist = (props) => {
    const [memes, setMemes] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            var memeList = []
            var res = await memeService.getUserMemes(props.user.userId)
            console.log(res)
            console.log("=??====")
            console.log(res.data.savedMemes)
            memeList = res.data.savedMemes
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
        if (!props.user) {
            history.push('/');
        } else {
            fetchData()
        }
        
       






        
    }, [])

    return (
        <div>
            <h1>Your memes</h1>
            { memes.length > 0 ?
                memes.map((meme) => {
                    console.log("meme", meme)
                    return (
                        <div id={meme.memeId}>

                            <Link to={"/memes/" + meme.memeId}>
                                <Image src={'data:image/jpeg;base64,' + meme.fetchedMeme.data.data} style={{ "width": "20%" }} className="w-20" alt="" thumbnail></Image>
                            </Link>

                            <p>{meme.fetchedMeme.data.memeText}</p>
                            <p>upvotes: {meme.fetchedMeme.data.upvotes.length}, comments: {meme.comments.length}</p>
                        </div>


                    )
                })
                :
                <p>Loading</p>}
        </div>
    )
}

export default Memelist