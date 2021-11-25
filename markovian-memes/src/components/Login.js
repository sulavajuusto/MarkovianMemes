import { GoogleLogin } from 'react-google-login';
import { Nav} from 'react-bootstrap'
import loginService from '../services/login'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
const Login = (props) => {

    const onSuccess = async (res) => {
        console.log(res)
        console.log(res.profileObj)
        // loginService.login(res.tokenId)
        var userid = await loginService.login(res.tokenId)
        var user = await loginService.getUserById(userid)
        props.login(user)
    }
    const onFailure = (res) => {
        console.log(res)
        console.log(res.profileObj)
        if(res.error ==="popup_closed_by_user") {
            window.alert("Something went wrong, most likely you need to enable third party cookies.")
        }
        
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={false}
                render= {renderProps => (
                    <Nav.Link onClick={renderProps.onClick} disabled={renderProps.disabled}> Log in with google</Nav.Link>
                )}
            />
        </div>
    )

}

export default Login;