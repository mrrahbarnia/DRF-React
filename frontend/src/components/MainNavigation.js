import { Link } from "react-router-dom";

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header>
            <ul className={classes.ul}>
                <li>
                    <Link to="/">Books</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </header>
    )
};

export default MainNavigation;