import React, { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hooks";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/Validators";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import "./Authenticate.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Authenticate = () => {
  let i = 0;
  console.log(i++);
  const auth = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authenticateSubmitHandler = async (event) => {
    event.preventDefault();
    //send to signup/login
    // setIsLoading(true);
    if (!isLogin) {
      //signup
      try {
        const response = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        // const response = await fetch("http://localhost:5000/api/users/signup", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     name: formState.inputs.name.value,
        //     email: formState.inputs.email.value,
        //     password: formState.inputs.password.value,
        //   }),
        // });
        // const data = await response.json();
        auth.login(response.user.id);
      } catch (err) {
        //
      }
    } else {
      //login
      try {
        const response = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(response);
        auth.login(response.user.id);
      } catch (err) {
        //
      }

      console.log("submit auth");
    }
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <hr />
        <form className="login-form" onSubmit={authenticateSubmitHandler}>
          {isLogin ? (
            <></>
          ) : (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
            ></Input>
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
          ></Input>
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(7)]}
            errorText="Please enter a password at least 7 characters long."
          ></Input>
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "Login" : "Signup"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Authenticate;
