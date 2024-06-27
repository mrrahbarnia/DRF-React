import { Link } from "react-router-dom";

import classes from "./BookItem.module.css";

const BookItem = (props) => {
    return (
        <div className={classes.wrapper}>
            <img className={classes.wrapper__img} src={props.src} alt={props.name} />
            <div className={classes.info}>
                <h3 className={classes.wrapper__title}><Link to={props.slug}>{props.name}</Link></h3>
                <p className={classes.wrapper__description}>{props.description}</p>
            </div>
        </div>
    )
};

export default BookItem;