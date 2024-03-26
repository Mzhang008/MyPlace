import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/Validators";
import { useForm } from "../../shared/hooks/form-hooks";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "NYC",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.784405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Willis Tower",
    description: "Formerly named the Sears Tower",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Willis_Tower_From_Lake.jpg",
    address: "233 S Wacker Dr, Chicago, IL 60606",
    location: {
      lat: 41.8788764,
      lng: -87.6359149,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  
  console.log(auth);

  const [formState, inputHandler, setFormData] = useForm({
    title: {
        value: '',
        isValid: false,
        },
    description: {
        value: '',
        isValid: false,
        }
    },
    false);

  useEffect(() => {
    if (identifiedPlace){
    setFormData({
        title: {
            value: identifiedPlace.title,
            isValid: true
            },
        description: {
            value: identifiedPlace.description,
            isValid: true,
            }
    },
    true);
    }
    setIsLoading(false);
    }, [setFormData, identifiedPlace]);
  
  

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log("update");
    console.log(formState.inputs); //TODO update on server
  }

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
        <div className="center">
            Loading...
        </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <h2>Editing Place</h2>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (At least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
