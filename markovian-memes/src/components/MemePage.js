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
            generateImage(foundMeme.data.data, foundMeme.data.memeText)
        }
        fetchData()

    }, [id])
    const newComment = async (e) => {
        e.preventDefault()
        console.log(e)
        console.log(comment)
        await commentService.newComment(comment, props.user.userId, id)
        const foundComments = await commentService.getCommentsForMeme(id)
        console.log(foundComments)
        setComments(foundComments)
    }
    const saveImage = () => {
        var canvas = document.getElementById("canvas");
        var dataURL = canvas.toDataURL("image/png");
        var newTab = window.open('about:blank', 'image from canvas');
        newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

        
        var link = document.createElement('a');
        link.download = 'meme.png';
        link.href = dataURL
        link.click();
          

    }
    if (meme) {
        console.log("===", meme)
        return (
            <div>

                <div className="meme-container">

                    <div className="image-container">
                        <canvas id="canvas" width="800" height="600"></canvas>
                        <Image id="img" alt="" hidden fluid />
                    </div>
                    <div className="w-100 d-flex justify-content-center">

                        <span>
                            {props.user ? <Button variant="warning"><ArrowUpwardIcon onClick={() => memeService.upvoteMeme(id, props.user)} /></Button> : <span></span>}
                            <Button variant="dark" onClick={saveImage}><GetAppIcon /></Button>
                        </span>

                    </div>
                </div>
                <div>
                    <h2>Comments: </h2>
                    <ListGroup>
                        {comments.map(comment => {
                            return (
                                <ListGroup.Item id={comment.commentId}>
                                    {comment.message}
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

const generateImage = (data, memetext) => {
    const image = document.getElementById('img');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = "50px Impact";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    image.setAttribute('src', "data:image/jpg;base64," + data);
    image.onload = () => {
        ctx.drawImage(image, 0, 0)
        var text = parseText(memetext.split("\n")[0]);
        ctx.fillText(text[0], canvas.width / 2, 50);
        ctx.fillText(text[1], canvas.width / 2, 100);
        ctx.strokeText(text[0], canvas.width / 2, 50);
        ctx.strokeText(text[1], canvas.width / 2, 100);
        var text2 = parseText(memetext.split("\n")[1]);
        if (text2[1] != "") {
            ctx.fillText(text2[0], canvas.width / 2, 540);
            ctx.strokeText(text2[0], canvas.width / 2, 540);
            ctx.fillText(text2[1], canvas.width / 2, 590);
            ctx.strokeText(text2[1], canvas.width / 2, 590);
        }
        else {
            ctx.fillText(text2[0], canvas.width / 2, 590);
            ctx.strokeText(text2[0], canvas.width / 2, 590);
        }






    };
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    return

}

function parseText(text) {
    var text1 = text;
    var text2 = "";
    if (text.length > 30) {
        var text1 = text.substring(0, text.indexOf(' ', 30));
        var text2 = text.substring(text.indexOf(' ', 30), text.length - 1);
    }
    return [text1, text2];
}
export default MemePage