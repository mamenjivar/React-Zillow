import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// store
import AuthContext from '../store/auth-context';

// css
import { Container, Form, FormLabel, FormGroup, FormControl, Button } from 'react-bootstrap';

const AuthForm = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const authCtx = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setLogin((prevState) => !prevState);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = email;
        const enteredPassword = password;

        setLoading(true);
        let url;
        if(login) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        }

        fetch(url, 
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            setLoading(false);
            if(res.ok) {
                return res.json();
            } else {
                // if request fails
                return res.json().then(data => {
                    let errorMessage = "Authentication failed!";
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => {
            // successful request
            console.log(data);
            const expirationTime = new Date(
                new Date().getTime() + (+data.expiresIn * 1000)
            );
            authCtx.login(data.idToken, expirationTime.toISOString());

            // can't use back button and redirects to new page
            history.replace('/'); 
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    return (
        <section>
            <Container>
                <h1 className="text-center">{login ? 'Login' : 'Sign Up'}</h1>
                <Form onSubmit={formSubmitHandler}>
                    <FormGroup>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={emailChangeHandler}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Your Password</FormLabel>
                        <FormControl 
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={passwordChangeHandler}
                        required
                        />
                    </FormGroup>
                    {!loading && <Button type="submit" variant="primary" block>{login ? 'Login' : 'Create Account'}</Button>}
                    {loading && <Button disabled={loading} block>Sending Request...</Button>}
                    <Button
                        variant="secondary"
                        onClick={switchAuthModeHandler}
                        block
                    >
                        {login ? 'Create new account' : 'Login with existing account'}
                    </Button>
                </Form>
            </Container>
        </section>
    );
};

export default AuthForm;