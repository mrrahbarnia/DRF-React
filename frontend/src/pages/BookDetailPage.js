import { useLoaderData } from "react-router-dom";

import BookDetail from "../components/BookDetail";

const BookDetailPage = () => {
    const result = useLoaderData();

    return <BookDetail 
        title={result.name} 
        description={result.description} 
        image={result.image} 
        pages={result.pages} 
        price={result.price} 
        stock={result.stock} 
    />
};

export default BookDetailPage;


export const loader = async({ params }) => {
    const bookSlug = params.bookSlug;
    const response = await fetch(`http://127.0.0.1:8000/books/${bookSlug}`)
    
    if (response.status === 200) {
        return response;
    }

}