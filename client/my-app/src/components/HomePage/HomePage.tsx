import React from 'react';
import {useState} from 'react';
import { GoogleLogin, GoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AppBar } from '@material-ui/core';
import FormComp from '../FormComp/FormComp';
import Swal from 'sweetalert2';
import useStyles from './HomePageStyle';

const CLIENT_ID = '213563774258-u65snpotb10nmhh5lniou72ph518auv4.apps.googleusercontent.com';

const HomePage = (props) => {;
  const styles = useStyles();
  
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  // login to google account
  const login =  (response: GoogleLoginResponse | GoogleLoginResponseOffline ) => {
    if ("profileObj" in response){
      setIsLogined(true);
      setUserEmail(response.profileObj.email)
    }
  }

  // logout of google account
  const logout = () => {
    setIsLogined(false);
    setUserEmail('');
  }

  const handleLogoutFailure = () => {
    Swal.fire({
      title: '!שגיאה',
      text: '.המערכת לא הצליחה להתחבר',
      icon: 'error',
      confirmButtonText: 'נסה שנית'
    })
  }

  return (
    <div>
        <AppBar position="static">
          <div>
            <h2 className={styles.title}>אכלת אותה</h2>
            <img alt="logo" className={styles.logo} src="logo.png" width='80' height="60"></img>
            <div className={styles.username} hidden={!isLogined}>
              <div className={styles.logoutbtn}>
                <GoogleLogout
                clientId={ CLIENT_ID }
                buttonText='logout'
                onLogoutSuccess={ logout }
                onFailure={ handleLogoutFailure }
              >
              </GoogleLogout>
              </div>
              <p className={styles.hello}>שלום {userEmail}</p>
          </div>
          </div>
        </AppBar>
        { isLogined ?
          <FormComp userEmail={userEmail}/> : <div className={styles.comp}>
              <h2>...ברוכים הבאים לאכלת אותה! בואו נתחבר ומיד נתחיל</h2>
              <GoogleLogin
              clientId={ CLIENT_ID }
              buttonText='sign in with Google'
              onSuccess={ login }
              cookiePolicy={ 'single_host_origin' }
              responseType='code,token'/>
            </div>}
    </div>
  );
}

export default HomePage;
