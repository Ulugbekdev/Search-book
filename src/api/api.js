import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes/"
});

export const search = {
    getBooks(maxTotalBooks, startIndex) {
        return instance.get(`?q=book&maxResults=${maxTotalBooks}&startIndex=${startIndex}`).then((response) => response.data);
    },
    getInfoBook(link) {
        return instance.get(link).then((response) => response.data);
    }
};