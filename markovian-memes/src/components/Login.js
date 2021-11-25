import { GoogleLogin } from 'react-google-login';
import { Nav} from 'react-bootstrap'

const clientId = "603636855275-79nri9u60ms5v07da7rjk222q77fl7cr.apps.googleusercontent.com"
const Login = () => {

    const onSuccess = (res) => {
        console.log(res)
        console.log(res.profileObj)
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
                isSignedIn={true}
                render= {renderProps => (
                    <Nav.Link onClick={renderProps.onClick} disabled={renderProps.disabled}> Log in with google</Nav.Link>
                )}
            />
        </div>
    )

}

export default Login;