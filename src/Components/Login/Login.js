import React from 'react'
import { Button } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import './Login.css'
import {auth, provider} from '../../firebase';
import { useStateValue } from '../../StateProvider';
import {actionTypes} from '../../reducer';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
           auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });   
            console.log(result)})
            .catch(error => alert(error.message));
    }

    return (
        <div className="login">
           <div className="login__container">
              <WhatsAppIcon/>
              <div className="login__text">
                 <h1>Sign in</h1>
              </div>
              <Button onClick={signIn}>
                Sign in with Google
               </Button>
           </div>       
        </div>
    )
}

export default Login
