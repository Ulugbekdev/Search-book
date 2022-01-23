import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLogin } from '../../redux/reducers/loginReducer';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Login = (props) => {
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState('Enter something');
    const [loginDirty, setLoginDirty] = useState(false);
    const [load, setLoad] = useState(false);
    const isLogin = useSelector(state => state.loginPage.login);
    const dispatch = useDispatch();

    const reg = /[A-Za-z]/;

    const loginBlur = () => {
        setLoginDirty(true);
        if (login.length > 0) return setLoginError('');
        return setLoginError('Enter something');
    };

    const loginChange = (e) => {
        setLogin(e.target.value);
        if (e.target.value.length > 16) {
            setLoginDirty(true);
            setLoginError('Maximum length the symbols 16');
            return
        } else if (!reg.test(login)) {
            setLoginDirty(true);
            setLoginError('Enter in the latin');
            return
        }
        return setLoginError('');
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (login.length === 0) {
            setLoginError('Enter something');
            setLoginDirty(true);
            return
        }
        setLoad(true);
        await dispatch(getLogin(e.target[0].value));
        setLoad(false);
    }

    if (isLogin) return <Navigate to={'/search'} />

    return (
        <>
            <Box
                component='form'
                sx={{
                    mx: 'auto',
                    width: 1,
                    maxWidth: 300,
                    padding: '30px',
                    borderRadius: '10px',
                    backgroundColor: '#282c34',
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -40%)'
                }}
                noValidate
                autoComplete='off'
                onSubmit={(e) => loginSubmit(e)}
            >
                {loginDirty && loginError
                    ? <TextField
                        error
                        fullWidth
                        label='Login'
                        variant='outlined'
                        type='text'
                        name='login'
                        value={login}
                        onChange={(e) => loginChange(e)}
                        onBlur={() => loginBlur()}
                        helperText={loginError}
                        sx={{ my: 1 }} />
                    : <TextField
                        fullWidth
                        label='Login'
                        variant='outlined'
                        type='text'
                        name='login'
                        value={login}
                        onChange={(e) => loginChange(e)}
                        onBlur={() => loginBlur()}
                        sx={{ my: 1 }} />
                }
                <LoadingButton
                    loading={load}
                    size='large'
                    loadingIndicator='Loading...'
                    variant="contained"
                    type='submit'
                    sx={{ width: 100, mx: 'auto', display: 'block' }}>
                    Login
                </LoadingButton>
            </Box>
        </>
    )
}

export default Login;