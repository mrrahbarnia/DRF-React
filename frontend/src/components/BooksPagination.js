import { Fragment } from 'react';
import classes from './BooksPagination.module.css';
import { Link } from 'react-router-dom';

const BooksPagination = ({next, previous}) => {
    let nextOffset = null;
    let prevOffset = null;

    if (next) {
        nextOffset = new URL(next).searchParams.get('offset')
    }
    if (previous) {
        prevOffset = new URL(previous).searchParams.get('offset')
    }


    return (
        <Fragment>
            <ul className={classes.ul}>
                {previous ? <Link to={`?offset=${prevOffset}`}>previous</Link> : undefined}
                {next ? <Link to={`?offset=${nextOffset}`}>next</Link> : undefined}
            </ul>
        </Fragment>
    )
};

export default BooksPagination;