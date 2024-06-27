import { useParams } from "react-router-dom";

const BookDetail = () => {
    const params = useParams();

    return <h1>{params.bookSlug}</h1>
};

export default BookDetail;