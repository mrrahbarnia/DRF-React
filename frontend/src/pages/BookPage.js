import { Fragment } from "react";
import { useLoaderData, json } from "react-router-dom";

import Book from "../components/Book";

const BookPage = () => {
    const result = useLoaderData();

    return <Fragment>
        <Book books={result} />
    </Fragment>
}

export default BookPage;


export const loader = async({ request }) => {
    const offset = new URL(request.url).searchParams.get('offset')

    const response = await fetch(`http://127.0.0.1:8000/books/?offset=${offset}`)

    if (response.status === 200) {
        return response;
    } else {
        return json(({message: 'Something went wrong!'}, {status: 500}));
    }
}