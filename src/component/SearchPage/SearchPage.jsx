import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getBooks, getDetailsInfoBook } from '../../redux/reducers/searchReducer';
import Search from './Search/Search';
import SearchResult from './SearchResult/SearchResult';
import SearchDetails from './SearchDetails/SearchDetails';
import PaginationCommon from '../PaginationCommon/PaginationCommon';
import Header from '../Header/Header';

const SearchPage = (props) => {
    const [isDetailsInfo, setIsDetailsInfo] = useState(false);
    const [isClose, setIsClose] = useState(true);
    const login = useSelector(state => state.loginPage.login);
    const maxTotalBooks = useSelector(state => state.searchPage.maxTotalBooks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks(maxTotalBooks));
    }, []);

    useEffect(() => {
        if (isClose) return setIsDetailsInfo(false);
    }, [isClose]);

    const getDetailsInfo = async (link) => {
        await dispatch(getDetailsInfoBook(link));
        setIsDetailsInfo(true);
        setIsClose(false);
    }

    if (!login) return <Navigate to={'/login'} />;

    return (
        <>
            <Header />
            <Search />
            <SearchResult getDetailsInfo={getDetailsInfo} />
            {isDetailsInfo ? <SearchDetails setIsClose={(boolean) => setIsClose(boolean)} /> : null}
        </>
    )
}

export default SearchPage;