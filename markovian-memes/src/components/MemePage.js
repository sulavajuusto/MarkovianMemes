import {
    useParams,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { Nav, Container, ListGroup } from 'react-bootstrap'
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import CachedIcon from '@material-ui/icons/Cached';
import memeService from '../services/memes'
import Image from 'react-bootstrap/Image'

import commentService from '../services/comments'

const MemePage = () => {
    const [comments, setComments] = useState([]);
    const [meme, setMeme] = useState(null);
    const id = parseInt(useParams().id)
    useEffect(() => {
        const foundMeme = memeService.getMeme(id)
        setMeme(foundMeme)
        const foundComments = commentService.getCommentsForMeme(id)
        console.log(foundComments)
        setComments(foundComments)
    }, [id])

    if (meme) {
        return (
            <div>

                <div className="meme-container">

                    <div className="image-container">
                        <Image src={meme.image} alt="" fluid />
                    </div>
                    <div className="w-100 d-flex justify-content-between">

                        <span>
                            <Button variant="success" ><ShareIcon /></Button>
                            <Button variant="dark"><GetAppIcon /></Button>
                        </span>

                    </div>
                </div>
                <div>
                    <h2>Comments: </h2>
                    <ListGroup>
                        {comments.map(comment => {
                            return (
                                <ListGroup.Item id={comment.commentId}>
                                    {comment.timeStamp}: {comment.message}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>



            </div>
        )
    } else {
        return (
            <div><p>loading</p></div>
        )
    }
   
}

export default MemePage