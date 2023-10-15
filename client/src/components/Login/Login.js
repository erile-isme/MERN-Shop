import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// import Icon from './icon';
import useStyles from './styles';
import Input from './Input';
// import { signup, signin } from '../../actions/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Login = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  // const clientId =
  //   '453507003309-cvh525arb9ut5b75f2vhr5mdsto1givb.apps.googleusercontent.com';

  // useEffect(() => {
  //   gapi.load('client:auth2', () => gapi.auth2.init({ clientId: clientId }));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); //react always refresh if a form is submitted

    // if (isSignUp) {
    //   dispatch(signup(formData, history));
    // } else {
    //   dispatch(signin(formData, history));
    // }
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleShowPass = () => {
    setShowPassword((prevShowPass) => !prevShowPass);
  };

  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp);
    setShowPassword(false);
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj; //with ?, even though it's null, it won't through error -> unidentified
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({
  //       type: 'AUTH',
  //       data: { result, token },
  //     });
  //     history.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log('Google Sign In was unsuccesfully. Try Again Later.');
  // };

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <form
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Grid>
              {isSignUp && (
                <>
                  <Input
                    name='firstName'
                    label='First Name'
                    handleChange={handleChange}
                    autoFocus={true}
                    half
                  />
                  <Input
                    name='lastName'
                    label='Last Name'
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name='email'
                label='Email Address'
                handleChange={handleChange}
                type='email'
              />
              <Input
                name='password'
                label='Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPass={handleShowPass}
              />
              {isSignUp && (
                <Input
                  name='confirmPassword'
                  label='Repeat Password'
                  handleChange={handleChange}
                  type='password'
                />
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            {/* <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={'single_host_origin'}
            /> */}
            <Grid container justify-content='center'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
