import { redirect } from "react-router-dom";

import BookForm from "../components/BookForm";

const AddBook = () => {
    return <BookForm />
};

export default AddBook;

export const action = async({ request }) => {
    const data = await request.formData();

    const response = await fetch('http://127.0.0.1:8000/books/create/', {
        method: 'POST',
        body: data
    })
    const jsonData = await response.json()
    if (response.status === 201) {
        return redirect('/book');
    } else {
        console.log(jsonData);
    }
};