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
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Authenticate = () => {
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

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prev) => !prev);
  };

  const authenticateSubmitHandler = async (event) => {
    event.preventDefault();
    //send to signup/login

    if (!isLogin) {
      //signup
      try {
        const formData = new FormData(); //use formData so file upload can be added to http request body as it (binary data) cannot be converted to json
        formData.append('name', formState.inputs.name.value)
        formData.append('email', formState.inputs.email.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          formData,
        );
        auth.login(response.userId, response.token);
      } catch (err) {
        //
      }
    } else {
      //login
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(response.userId, response.token);
      } catch (err) {
        //
      }

      console.log("submit auth");
    }
  };

  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <hr />
        <form className="login-form" onSubmit={authenticateSubmitHandler} encType="multipart/form-data">
          {!isLogin && (
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
          {!isLogin && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please add a valid image"
            />
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a password at least 6 characters long."
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
