import React, { useState } from 'react';

// css
import { Container, Form, FormLabel, FormGroup, FormControl, Button } from 'react-bootstrap';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangehandler = (event) => {
        setPassword(event.target.value);
    }

    const formSubmitHandler = () => {

    }

    return (
        <section>
            <Container>
                <h1>Log In</h1>
                <Form onSubmit={formSubmitHandler}>
                    <FormGroup>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={emailChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Your Password</FormLabel>
                        <FormControl 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={passwordChangehandler}
                        />
                    </FormGroup>
                    <Button
                        variant="primary"
                    >Create Account</Button>
                    <Button
                        variant="secondary"
                    >Create New Account</Button>
                </Form>
            </Container>
        </section>
    );
};

export default AuthForm;