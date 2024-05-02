import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userID = useParams().userID;
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userID}`,
          "GET"
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        //
      }
    };
    fetchPlaces();
  }, [sendRequest, userID]);

  const onDeleteHandler = (deletionId) => {
    setLoadedPlaces((prev) => prev.filter((place) => place.id !== deletionId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!loadedPlaces &&
        <Card className="medium">
          <h2>No places found.</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      }
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={onDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
