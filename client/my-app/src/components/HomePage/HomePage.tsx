import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { AppBar } from '@material-ui/core';
import './HomePage.css';
import FormComp from '../FormComp/FormComp';
import Swal from 'sweetalert2';


const CLIENT_ID = '213563774258-u65snpotb10nmhh5lniou72ph518auv4.apps.googleusercontent.com';

interface MyProps {
}

interface MyState {
    isLogined: boolean,
    userEmail: string
}

export class HomePage extends React.Component<MyProps,MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      isLogined: false,
      userEmail: ''
    };
  }

  // login to google account
  login =  (response:any) => {
    if(response.vt && response.vt.bu){
      this.setState(state => ({
        isLogined: true,
        userEmail: response.vt.bu
      }));
    }
  }

  // logout of google account
  logout = () => {
    this.setState(state => ({
      isLogined: false,
      userEmail: ''
    }));
  }

  handleLogoutFailure = () => {
    Swal.fire({
      title: '!שגיאה',
      text: '.המערכת לא הצליחה להתחבר',
      icon: 'error',
      confirmButtonText: 'נסה שנית'
    })
  }


  public render() {
    return (
      <div>
          <AppBar position="static">
            <div>
              <h2 className="title">אכלת אותה</h2>
              <div className="username" hidden={!this.state.isLogined}>
                <GoogleLogout
                  clientId={ CLIENT_ID }
                  buttonText='התנתק'
                  onLogoutSuccess={ this.logout }
                  onFailure={ this.handleLogoutFailure }
                >
                </GoogleLogout>
                <p className="hello">{this.state.userEmail} שלום</p>
            </div>
            </div>
          </AppBar>
          { this.state.isLogined ?
            <FormComp userEmail={this.state.userEmail}></FormComp>: <div className="comp">
                <h2>...ברוכים הבאים לאכלת אותה! בואו נתחבר ומיד נתחיל</h2>
                <GoogleLogin
                clientId={ CLIENT_ID }
                buttonText='sign in with Google'
                onSuccess={ this.login }
                cookiePolicy={ 'single_host_origin' }
                responseType='code,token'/>
              </div>}
      </div>
    );
  }
}

export default HomePage;
