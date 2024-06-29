import classes from './BookDetail.module.css';

const BookDetail = (props) => {
    const price = (props.price).toFixed(2)

    return (
        <div className={classes.wrapper}>
            <div className={classes.book__image}>
                <img src={`http://127.0.0.1:8000/${props.image}`} alt={props.title} />
            </div>
            <div className={classes.book__text}>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
            </div>
            <div className={classes.book__info}>
                <span>Pages: {props.pages}</span>
                <span>Price: ${price}</span>
                <span>Stock: {props.stock}</span>
            </div>
        </div>
    )
};

export default BookDetail;
