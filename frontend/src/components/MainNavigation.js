import { NavLink } from "react-router-dom";

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <ul className={classes.ul}>
                <li>
                    <NavLink to="login" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }>Login</NavLink>
                </li>
                <li>
                    <NavLink to="book" className={({isActive}) =>
                        isActive ? classes.active : undefined
                    }>Books</NavLink>
                </li>
            </ul>
            <div className={classes.search}>
                <input type="text" placeholder="Search your favorite book here"></input>
            </div>
        </header>
    )
};

export default MainNavigation;