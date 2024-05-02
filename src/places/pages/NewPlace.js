import React, { useContext } from "react";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hooks";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  //useForm(initialInputs, initialFormValidity)
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
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

  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("submitting new place");
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("creator", auth.userId);
    formData.append("image", formState.inputs.image.value);
    //     description: formState.inputs.description.value,
    //     address: formState.inputs.address.value,
    //     creator: auth.userId,
    const sendNewPlace = async () => {
      try {
        await sendRequest("http://localhost:5000/api/places", "POST", formData, { Authorization: `Bearer ${auth.token}`});
        history.push("/");
      } catch (err) {
        //
      }
    };
    sendNewPlace();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <React.Fragment>
          <form className="place-form" onSubmit={placeSubmitHandler} encType="multipart/form-data">
            <h2>New Place</h2>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please add a valid image"
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (At least 5 characters)."
              onInput={inputHandler}
            />
            <Input
              id="address"
              element="input"
              type="text"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid address."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Add Place
            </Button>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default NewPlace;
