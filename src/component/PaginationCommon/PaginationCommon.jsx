import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../redux/reducers/searchReducer';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';

const PaginationCommon = ({booksTotalItems, maxTotalBooks}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks(maxTotalBooks, currentPage));
    }, [currentPage]);

    const commonCountPage = Math.ceil(booksTotalItems / maxTotalBooks) - 1;

    return (
        <>
            <Stack>
                <Pagination
                    count={commonCountPage}
                    variant='outlined'
                    size='large'
                    color='primary'
                    sx={{ py: '25px', mx: 'auto' }}
                    onChange={(_, currentNum) => setCurrentPage(currentNum)} />
            </Stack>
        </>
    )
}

export default PaginationCommon;