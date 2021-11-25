
import React from 'react';
import { Nav} from 'react-bootstrap'
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function Logout(props) {
  const onSuccess = () => {
    console.log('Logout made successfully');
    props.login(null)
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render= {renderProps => (
            <Nav.Link onClick={renderProps.onClick} disabled={renderProps.disabled}> Log out</Nav.Link>
        )}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;