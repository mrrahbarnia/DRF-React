import { Fragment } from "react"
import { useRouteError } from "react-router-dom";

import Error from "../components/Error";
import MainNavigation from "../components/MainNavigation"

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error.status);

    let statusCode = 404;
    let message = 'Not Found!';

    if (error.status === 500) {
        statusCode = 500;
        message = error.message;
    }

    return (
        <Fragment>
            <MainNavigation />
            <Error statusCode={statusCode} message={message} />
        </Fragment>
    )
}

export default ErrorPage;