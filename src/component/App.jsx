import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import { Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getLoginAc } from '../redux/reducers/loginReducer';

const SearchPage = React.lazy(() => import('./SearchPage/SearchPage'));

const App = (props) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getLoginAc(localStorage.getItem('token')));
    }, []);

    return (
        <>
            <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: '#20232a' }} >
                <Container maxWidth='lg'>
                    <Routes>
                        <Route path={'/'} element={<Login />} />
                        <Route path={'/login'} element={<Login />} />
                        <Route path='/search' element={
                            <Suspense fallback={<div>Loading</div>}>
                                <SearchPage />
                            </Suspense>
                        } />
                    </Routes>
                </Container>
            </Box>
        </>
    )
}

export default App;