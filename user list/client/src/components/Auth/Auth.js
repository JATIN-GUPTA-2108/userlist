import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try ag ain later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div class="container">
    <div class="row align-items-start p-3 border border-3"
    style={{"backgroundColor":"aqua"}}>
      <div class="col">
        
      </div>
      <div class="col">
        <h1>{ isSignup ? 'Sign up' : 'Sign in' }</h1>
        <form  onSubmit={handleSubmit}>
          <div container spacing={2}>
            { isSignup && (
            <>
              <Input   name="firstName" placeholder="First Name" handleChange={handleChange}  />
              <Input name="lastName" placeholder="Last Name" handleChange={handleChange}  />
            </>
            )}
            <Input name="email" placeholder="Email Address" handleChange={handleChange} type="email" />
            <Input name="password"  placeholder='password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" placeholder="Repeat Password" handleChange={handleChange} type="password" /> }
          </div>
          <button className='m-2' type="submit" color="primary" >
            { isSignup ? 'Sign Up' : 'Sign In' }
          </button>
         
          <div container justify="flex-end">
            <div item>
              <button onClick={switchMode}className='m-2'>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </button>
            </div>
          </div>
        </form>
        </div>
    <div class="col">
     </div> 
    </div>
  </div>
  );
};

export default SignUp;
    