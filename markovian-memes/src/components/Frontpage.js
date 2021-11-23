import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { Nav, Container } from 'react-bootstrap'
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import CachedIcon from '@material-ui/icons/Cached';
var imageFlag = 0;
const images = ["/images/Meme1.png", "/images/Meme2.jpg", "/images/Meme3.jpg", "/images/Meme4.jpg"];
const Frontpage = (props) => {
    return (
        <div>
            <header className="App-header">
                <h1>Markovian memes..</h1>
            </header>
            {
                (!props.savedMemes) ?
                    <div>
                        <CachedIcon fontSize="large" style={{ "marginTop": "2%", "color": "white" }} />
                        <div className="meme-container">

                            <div className="image-container">
                                    <canvas id="canvas" width="800"height="600" onClick={generateImage}></canvas>
                                    <Image id="img" src="/images/Meme1.png" alt="" hidden/>
                            </div>
                            <div className="w-100 d-flex justify-content-between">
                                {props.loggedIn ? <Button variant="warning"><StarOutlineIcon /></Button> : <span></span>}

                                <span>
                                    <Button variant="success" ><ShareIcon /></Button>
                                    <Button variant="dark"><GetAppIcon /></Button>
                                </span>

                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className=" image-container">

                            <Image style={{ "width": "20%" }} className="w-20" src="/images/Meme1.png" alt="" thumbnail />

                            <Image style={{ "width": "20%" }} className="w-20" src="/images/Meme2.jpg" alt="" thumbnail />

                            <Image style={{ "width": "20%" }} className="w-20" src="/images/Meme3.jpg" alt="" thumbnail />
                        </div>
                    </div>
            }
        </div>
    )
}



function nextImage(e) {
    imageFlag += 1;
    if (imageFlag > 3) {
      imageFlag = 0;
    }
    e.target.setAttribute('src', images[imageFlag]);
  }

  function generateImage(e) {
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
    request.onload = function() {
        
        image.setAttribute('src', "data:image/jpg;base64," + request.response.data);
        var text = parseText(request.response.memeText.split("\n")[0]);
        ctx.fillText(text[0],canvas.width/2,50);
        ctx.fillText(text[1],canvas.width/2,100);
        ctx.strokeText(text[0],canvas.width/2,50);
        ctx.strokeText(text[1],canvas.width/2,100);
        var text2 = parseText(request.response.memeText.split("\n")[1]);
        if (text2[1] != "") {
            ctx.fillText(text2[0],canvas.width/2,540);
            ctx.strokeText(text2[0],canvas.width/2,540);
            ctx.fillText(text2[1],canvas.width/2,590);
            ctx.strokeText(text2[1],canvas.width/2,590);
        }
        else {
            ctx.fillText(text2[0],canvas.width/2,590);
            ctx.strokeText(text2[0],canvas.width/2,590); 
        }
        
        
      };
    request.send();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image,0,0)
    ctx.stroke();
  
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