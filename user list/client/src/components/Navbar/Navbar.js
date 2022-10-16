import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import post from '../../images/course.png';
import * as actionType from '../../constants/actionTypes';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
      <>
   
    <nav class="navbar navbar-light bg-light">
  <div class="container">
    
  <Typography component={Link} to="/" variant="h2" align="center">CONTACTS</Typography>
  <div class="d-flex">
  <div  >
        {user?.result ? (
          <div >

            <h5>{user?.result.name}</h5>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </div>
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
