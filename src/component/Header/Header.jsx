import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoginAc } from '../../redux/reducers/loginReducer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = (props) => {
    const dispatch = useDispatch();

    const logOut = (e) => {
        localStorage.setItem('token', '');
        dispatch(getLoginAc(''));
        return <Navigate to={'/login'}/>;
    }

    return (
        <>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx={{backgroundColor: '#282c34' }}>
                    <Toolbar sx={{backgroundColor: 'inherit' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Search books
                        </Typography>
                        <Button color="inherit" onClick={(e) => logOut(e)}>Log out</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Header;