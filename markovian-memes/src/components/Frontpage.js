
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import CachedIcon from '@material-ui/icons/Cached';
import React, { useState, useEffect } from 'react';
import MemeService from '../services/memes'

const Frontpage = (props) => {
    const [memeid, setMemeid] = useState(null)
    const saveMeme_ =() => {
        MemeService.saveMeme(memeid, props.loggedIn.userId)
    }

    const generateImage = () => {
        let request = new XMLHttpRequest();
        request.open('GET', "https://localhost:5001/Meme");
        request.responseType = 'json';
        const image = document.getElementById('img');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = "50px Impact";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.strokeStyle = 'black';
        request.onload = function () {
            setMemeid(request.response.memeId)
            console.log(memeid)
            image.setAttribute('src', "data:image/jpg;base64," + request.response.data);
            image.onload = () => {
                ctx.drawImage(image, 0, 0)
                var text = parseText(request.response.memeText.split("\n")[0]);
                ctx.fillText(text[0], canvas.width / 2, 50);
                ctx.fillText(text[1], canvas.width / 2, 100);
                ctx.strokeText(text[0], canvas.width / 2, 50);
                ctx.strokeText(text[1], canvas.width / 2, 100);
                var text2 = parseText(request.response.memeText.split("\n")[1]);
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
            }
    
    
    
    
    
        };
        request.send();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.stroke();
        return
    }
    useEffect(() => {
        generateImage()
    }, [])

    const saveImage = () => {
        console.log("savedimage")
        var canvas = document.getElementById("canvas");
        var dataURL = canvas.toDataURL("image/png");
        var newTab = window.open('about:blank', 'image from canvas');
        newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

        
        var link = document.createElement('a');
        link.download = 'meme.png';
        link.href = dataURL
        link.click();
          

    }
    return (
        <div>
            <header className="App-header">
                <h1>Markovian memes..</h1>
            </header>
            <div>
                <CachedIcon fontSize="large" style={{ "marginTop": "2%", "color": "white" }} />
                <div className="meme-container">

                    <div className="image-container">
                        <canvas id="canvas" width="800" height="600" onClick={generateImage}></canvas>
                        <Image id="img" src="/images/Meme1.png" alt="" hidden />
                    </div>
                    <div className="w-100 d-flex justify-content-between">
                        {props.loggedIn ? <Button variant="warning"><StarOutlineIcon /></Button> : <span></span>}
                        
                        <span>
                            <Button variant="success" onClick={saveMeme_} disabled={!props.loggedIn}><ShareIcon /></Button>
                            <Button variant="dark" onClick={saveImage}><GetAppIcon /></Button>
                        </span>

                    </div>
                </div>
            </div>

        </div>
    )
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

export default Frontpage