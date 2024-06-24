import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

const RootPage = () => {
    return (
        <Fragment>
            <MainNavigation />
            <Outlet />
        </Fragment>
    )
}

export default RootPage;