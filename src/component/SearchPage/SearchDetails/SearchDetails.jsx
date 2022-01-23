import React from "react";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SearchDetails = (props) => {
    const bookInfo = useSelector(state => state.searchPage.bookDetailInfo);
    
    const bookAuthors = bookInfo.volumeInfo.authors.length > 0 ? bookInfo.volumeInfo.authors.join(', ') : bookInfo.volumeInfo.authors;

    return (
        <>
            <Card sx={{
                width: 1,
                maxWidth: 700,
                minHeight: 300,
                maxHeight: 600,
                backgroundColor: '#282c34',
                position: 'fixed', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'start', position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height='600'
                        image={bookInfo.volumeInfo.imageLinks.medium}
                        alt={bookInfo.volumeInfo.title}
                        sx={{ width: 1/2 }}
                    />
                    <CardContent sx={{ overflowY: 'scroll', width: 1/2 }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {bookInfo.volumeInfo.title}
                        </Typography>
                        <Typography gutterBottom variant='subtitle1' component="div">
                            {bookAuthors}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" component="div">
                            {bookInfo.volumeInfo.publishedDate}
                        </Typography>
                        <Typography variant='body2' component='div'>
                            {bookInfo.volumeInfo.description}
                        </Typography>
                        <CardActions>
                            <IconButton onClick={() => props.setIsClose(true)} sx={{position: 'absolute', top: '15px', right: '15px'}}>
                                <CloseIcon color="primary" fontSize="large" sx={{fontWeight: '700'}}/>
                            </IconButton>
                        </CardActions>
                    </CardContent>
                </Box>
            </Card>
        </>
    )
}

export default SearchDetails;