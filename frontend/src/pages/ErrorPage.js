import { Fragment } from "react"

import MainNavigation from "../components/MainNavigation"
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
    return (
        <Fragment>
            <MainNavigation />
            <main className={classes.main}>
                <p>An error occurred!</p>
                <p>Page not found.</p>
            </main>
        </Fragment>
    )
}

export default ErrorPage;