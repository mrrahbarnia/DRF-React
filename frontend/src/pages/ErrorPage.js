import { Fragment } from "react"

import Error from "../components/Error";
import MainNavigation from "../components/MainNavigation"

const ErrorPage = () => {
    return (
        <Fragment>
            <MainNavigation />
            <Error />
        </Fragment>
    )
}

export default ErrorPage;