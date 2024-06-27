import { useState } from 'react';

import classes from './Login.module.css';

const IsEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false)
    const [isTouchedEmail, setIsTouchedEmail] = useState(false)

    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false);
    const [isTouchedPassword, setIsTouchedPassword] = useState(false);

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

    const emailInputChangeHandler = event => {
        setEnteredEmail(event.target.value);
        if (IsEmailValid(event.target.value)) {
            setEnteredEmailIsValid(true);
        } else {
            setEnteredEmailIsValid(false);
        }
    }

    const emailOnBlurHandler = () => {
        setIsTouchedEmail(true);
    }

    const passwordOnBlurHandler = () => {
        setIsTouchedPassword(true);
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        setIsTouchedEmail(true);
        setIsTouchedPassword(true);

        if (!IsEmailValid(enteredEmail)) {
            setEnteredEmailIsValid(false);
            return;
        }

        if (enteredPassword.length < 8) {
            setEnteredPasswordIsValid(false);
            return;
        }

        setEnteredEmailIsValid(true);
        setEnteredPasswordIsValid(true);

        setEnteredEmail('');
        setEnteredPassword('');
    }

    const passwordInputChangeHandler = event => {
        setEnteredPassword(event.target.value);

        if (event.target.value.length < 8) {
            setEnteredPasswordIsValid(false);
        } else {
            setEnteredPasswordIsValid(true);
        }
    };

    const emailInputIsInvalid = !enteredEmailIsValid && isTouchedEmail;
    const emailInputErrorClasses = emailInputIsInvalid ? `${classes.input} ${classes['input-error']}` : classes.input;

    const passwordInputIsInvalid = !enteredPasswordIsValid && isTouchedPassword;
    const passwordInputErrorClasses = passwordInputIsInvalid ? `${classes.input} ${classes['input-error']}` : classes.input;

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={classes['form-control']}>
                <label htmlFor='email'>Email</label>
                <input className={emailInputErrorClasses} id='email' type='text' onChange={emailInputChangeHandler} onBlur={emailOnBlurHandler} value={enteredEmail} />
            </div>
            <div className={classes['form-control']}>
                <label htmlFor='password'>Password</label>
                <input className={passwordInputErrorClasses} id='password' type='password' onChange={passwordInputChangeHandler} value={enteredPassword} onBlur={passwordOnBlurHandler} />
            </div>
            <div className={classes['form-action']}>
                <button disabled={!formIsValid} type='submit'>Login</button>
            </div>
        </form>
    )
};

export default Login;