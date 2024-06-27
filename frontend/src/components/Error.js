import classes from './Error.module.css';

const Error = () => {
    return (
        <div className={classes.error}>
            <p>An error occurred!</p>
            <p>Something went wrong...</p>
        </div>
    )
};

export default Error;