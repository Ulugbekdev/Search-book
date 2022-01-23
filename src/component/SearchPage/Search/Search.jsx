import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getBooksBySearch } from '../../../redux/reducers/searchReducer';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const [searchError, setSearchError] = useState('');
    const [load, setload] = useState(false);
    const books = useSelector(state => state.searchPage.books);
    const dispatch = useDispatch();

    const searchFormChange = async (e) => {
        const searchValue = e.target.value;
        if (search.length > 0) setSearchError('');
        setSearch(searchValue);
    } 

    const searchFormSubmit = async (e) => {
        e.preventDefault(e);
        const searchValue = e.target[0].value;
        if (search.length === 0) setSearchError('Enter something');
        setload(true);
        await dispatch(getBooksBySearch(searchValue, books)).then(resolve => {}, reject => {
            setSearchError(reject);
        });
        setload(false);
    } 

    return (
        <>
            <Box
                component='form'
                sx={{
                    '& > :not(style)': { m: 1 },
                    mx: 'auto',
                    width: 1,
                    maxWidth: 500,
                    display: 'flex',
                    alignItems: 'start',
                    py: '25px' 
                }}
                noValidate
                autoComplete='off'
                onSubmit={(e) => searchFormSubmit(e)}
            >
                {searchError
                    ? <TextField
                        error
                        size='small'
                        fullWidth
                        label='Login'
                        variant='outlined'
                        type='text'
                        name='Search'
                        value={search}
                        onChange={(e) => searchFormChange(e)}
                        helperText={searchError}/>
                    : <TextField
                        fullWidth
                        size='small'
                        label='Search'
                        variant='outlined'
                        type='text'
                        value={search}
                        onChange={(e) => searchFormChange(e)}/>
                }
                <LoadingButton size='medium' loading={load} loadingIndicator="Searching..." variant="contained" type='submit'>
                    Search
                </LoadingButton>
            </Box>
        </>
    )
}

export default Search;