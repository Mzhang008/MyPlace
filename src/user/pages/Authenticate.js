import React, { useState } from 'react';
import { useForm } from "../../shared/hooks/form-hooks";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import Card from '../../shared/components/UIElements/Card';
import "./Authenticate.css";


const Authenticate = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }                
    }, false);

    const authenticateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs); //TODO backend
        console.log("submit");
    };

    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData(
            {
                ...formState.inputs,
                name: undefined
            }, 
            (formState.inputs.email.isValid && formState.inputs.password.isValid)
            );
        } else {
            setFormData({
                ...formState.inputs,
                name: ''
            },
            false
            );
        }
        setIsLogin(prev => !prev);
    }
    return (
      <Card className="authentication">
        {isLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <hr />
        <form className="login-form" onSubmit={authenticateSubmitHandler}>
            {isLogin ? <></> :
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                >
                </Input>
            }
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                onInput={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."            
            >
            </Input>
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(7)]}
                errorText="Please enter a password at least 7 characters long."    
            >
            </Input>
            <Button type="submit" disabled={!formState.isValid}>
                {isLogin ? "Login" : "Signup"}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
            Switch to {isLogin ? "Signup" : "Login"}
        </Button>
      </Card>
    );
};

export default Authenticate;