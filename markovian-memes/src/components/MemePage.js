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
import Form from 'react-bootstrap/Form'
import commentService from '../services/comments'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';



const MemePage = (props) => {
    const [comments, setComments] = useState([]);
    const [meme, setMeme] = useState(null);
    const [comment, setComment] = useState("")
    const id = parseInt(useParams().id)
    useEffect(() => {
        const fetchData = async () => {
            const foundMeme = await memeService.getMeme(id)
            setMeme(foundMeme)
            const foundComments = await commentService.getCommentsForMeme(id)
            console.log(foundComments)
            setComments(foundComments)
        }
        fetchData()

    }, [id])
    const newComment = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log(comment)
        await commentService.newComment(comment, props.user.userId, id)
        const foundComments = commentService.getCommentsForMeme(id)
        console.log(foundComments)
        setComments(foundComments)
    }
    if (meme) {
        console.log("===", meme)
        return (
            <div>

                <div className="meme-container">

                    <div className="image-container">
                        <Image src={'data:image/jpeg;base64,' + meme.data.data} alt="" fluid />
                    </div>
                    <div className="w-100 d-flex justify-content-between">

                        <span>
                            {props.user ? <Button variant="warning"><ArrowUpwardIcon onClick={() => memeService.upvoteMeme(id)} /></Button> : <span></span>}
                            {props.user ? <Button variant="warning"><ArrowDownwardIcon onClick={() => memeService.downVoteMeme(id)} /></Button> : <span></span>}
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
                    <Form onSubmit={newComment}>
                        <Form.Group className="mb-3" controlId="formComment">
                            <Form.Label style={{ "color": "white" }}>Add Comment</Form.Label>
                            <Form.Control className="text-center" type="comment" placeholder="Enter Comment" onChange={(e) => { setComment(e.target.value) }} />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!props.user}>
                            Submit
                        </Button>
                    </Form>

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