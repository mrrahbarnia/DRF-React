import { Form } from "react-router-dom";

import classes from './BookForm.module.css';

const BookForm = () => {
    
    return (
        <Form method="post" className={classes.wrapper} encType="multipart/form-data" >
            <div className={classes.text}>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="name" required/>
            </div>
            <div className={classes.text}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={9} required />
            </div>
            <div className={classes.image}>
                <label htmlFor="image">Image</label>
                <input id="image" name="image" accept="image/jpeg,image/png,image/gif" type="file" required />
            </div>
            <div className={classes.text}>
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" minLength={0} required />
            </div>
            <div className={classes.text}>
                <label htmlFor="pages">Pages</label>
                <input id="pages" name="pages" type="number" minLength={0} required />
            </div>
            <div className={classes.text}>
                <label htmlFor="stock">Stock</label>
                <input id="stock" name="stock" type="number" minLength={0} required />
            </div>
            <div className={classes.btn}>
                <button type="submit">Add Book</button>
            </div>
        </Form>
    )
};

export default BookForm;