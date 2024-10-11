import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Map from './components/Map';
import './App.css'; // Import the CSS file

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    setUser(response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.error(response);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID"> {/* Replace with your client ID */}
      <div className="app-container">
        <h1>Hospital Finder</h1>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Login with Google
              </button>
            )}
          />
        ) : (
          <Map user={user} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;