import { search } from '../../api/api';
import { converterValue } from '../../common/converter/converter';

const GET_BOOKS = 'GET-BOOKS';
const GET_DETAILS_INFO = 'GET-DETAILS-INFO';
const ADD_BOOKS_SEARCH = 'ADD-BOOKS-SEARCH';

let defualtState = {
    books: [],
    booksResultSearch: [],
    bookDetailInfo: null,
    maxTotalBooks: 8,
    booksTotalItems: 0
};

export default function searchReducer(state = defualtState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                isBooks: true,
                books: action.payload.books,
                booksTotalItems: action.payload.totalItems
            }
        case ADD_BOOKS_SEARCH:
            return {
                ...state,
                booksResultSearch: action.payload
            }
        case GET_DETAILS_INFO:
            return {
                ...state,
                bookDetailInfo: action.data
            }
        default:
            return state
    }
}

const getBooksAC = (books, totalItems) => ({ type: GET_BOOKS, payload: { books, totalItems } });
const addBooksSearchAC = (books) => ({ type: ADD_BOOKS_SEARCH, payload: books });
const getDetailsInfoBookAC = (data) => ({ type: GET_DETAILS_INFO, data });

export const getBooks = (maxTotalBooks, startIndex = 0) => async dispatch => {
    const data = await search.getBooks(maxTotalBooks, startIndex);
    // const books = data.items
    // .filter((currentEl, index, arr) => {
    //     let arrayCoincidence = [];
    //     arr.filter((el) => currentEl.volumeInfo.title === el.volumeInfo.title ? arrayCoincidence.push(currentEl) : false);
    //     return arrayCoincidence.length === 1;
    // });
    dispatch(getBooksAC(data.items, data.totalItems));
};

export const getBooksBySearch = (value, arrayBooks) => dispatch => {
    return new Promise((resolve, reject) => {
        const books = arrayBooks.filter((item) => {
            const searchValue = converterValue(value);
            const titleBook = converterValue(item.volumeInfo.title);
            return titleBook.indexOf(searchValue) !== -1;
        });
        if (books.length === 0) reject('No results');
        resolve(dispatch(addBooksSearchAC(books)));
    });
};

export const getDetailsInfoBook = link => async dispatch => {
    const data = await search.getInfoBook(link);
    dispatch(getDetailsInfoBookAC(data));
}