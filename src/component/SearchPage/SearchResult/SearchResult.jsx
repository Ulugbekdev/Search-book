import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import PaginationCommon from '../../PaginationCommon/PaginationCommon';

const SearchResult = (props) => {
    const books = useSelector(state => state.searchPage.books);
    const searchBooks = useSelector(state => state.searchPage.booksResultSearch);
    const maxTotalBooks = useSelector(state => state.searchPage.maxTotalBooks);
    const booksTotalItems = useSelector(state => state.searchPage.booksTotalItems);

    const onClickBook = async (link) => {
        props.getDetailsInfo(link);
    }

    const booksArray = (searchBooks.length > 0 ? searchBooks : books).map((item, key) => (
        <Grid item xs={12} sm={6} md={3} key={item.key}>
            <Card sx={{backgroundColor: '#282c34', borderRadius: '10px' }}>
                <CardMedia
                    component='img'
                    height='200'
                    image={item.volumeInfo.imageLinks.smallThumbnail}
                    alt={item.volumeInfo.title}
                />
                <CardContent sx={{ height: '150px', backgroundColor: 'inherit' }}>
                    <Typography gutterBottom variant='h6' component='div'>
                        {item.volumeInfo.title}
                    </Typography>
                    <Typography gutterBottom variant='subtitle1' component='div'>
                        {item.volumeInfo.publishedDate}
                    </Typography>
                </CardContent>
                <CardActions sx={{backgroundColor: 'inherit'}}>
                    <Button size='small' variant='contained' onClick={() => onClickBook(item.id)}>More</Button>
                </CardActions>
            </Card>
        </Grid>
    ));

    return (
        <>
            <Grid container spacing={2} sx={{ py: '25px' }}>
                {booksArray}
            </Grid>
            <PaginationCommon maxTotalBooks={maxTotalBooks} booksTotalItems={booksTotalItems}/>
        </>
    )
}

export default SearchResult;