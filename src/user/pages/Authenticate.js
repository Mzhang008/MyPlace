import React from 'react';
import { useForm } from "../../shared/hooks/form-hooks";
import Input from '../../shared/components/FormElements/Input';
import "../../places/pages/PlaceForm.css";
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/Validators';

const Authenticate = () => {
    
    const [formState, inputHandler] = useForm(
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
    return (
        <form className="place-form" onSubmit={authenticateSubmitHandler}>
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                onChange={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."            
            >
            </Input>
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                onChange={inputHandler}
                validators={[VALIDATOR_MINLENGTH(7)]}
                errorText="Please enter a password at least 7 characters long."    
            >
            </Input>
            <Button type="submit" disabled={!formState.isValid}>
                Submit
            </Button>
        </form>
    );
};

export default Authenticate;