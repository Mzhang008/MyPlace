import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// const DUMMY_PLACES = [
//     {
//         id: 'p1',
//         title: 'Empire State Building',
//         description: 'NYC',
//         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
//         address: '20 W 34th St, New York, NY 10001',
//         location: {
//             lat: 40.784405,
//             lng: -73.9878584
//         },
//         creator: 'u1',
//     },
//     {
//         id: 'p2',
//         title: 'Willis Tower',
//         description: 'Formerly named the Sears Tower',
//         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Willis_Tower_From_Lake.jpg',
//         address: '233 S Wacker Dr, Chicago, IL 60606',
//         location: {
//             lat: 41.8788764,
//             lng: -87.6359149
//         },
//         creator: 'u2',

//     }
// ]
const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userID = useParams().userID;
  const [loadedPlaces, setLoadedPlaces] = useState();
  // const loadedPlaces = .filter(place => place.creator === userID);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userID}`,
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
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={onDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
