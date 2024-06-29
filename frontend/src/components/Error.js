import classes from './Error.module.css';

const Error = (props) => {
    return (
        <div className={classes.error}>
            <p>{props.statusCode}</p>
            <p>{props.message}</p>
        </div>
    )
};

export default Error;