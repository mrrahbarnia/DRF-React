import BookItem from './BookItem';
import classes from './Book.module.css';
import BooksPagination from './BooksPagination';

const Book = (props) => {
    const booksArray = props.books.results;

    const nextPagePagination = props.books.next;
    const prevPagePagination = props.books.previous;
    
    return (
        <div className={classes.container}>
            <div className={classes.books}>
                    {booksArray.map(book => <BookItem key={book.slug} slug={book.slug} src={book.image} name={book.name} description={book.description}/>
                )}
            </div>
            <BooksPagination next={nextPagePagination} previous={prevPagePagination} />
        </div>
    )
};

export default Book;