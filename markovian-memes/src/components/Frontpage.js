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
                                <Image src="/images/Meme1.png" alt="" onClick={nextImage} fluid />
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

export default Frontpage