import React from "react";
import UsersList from "../components/UsersList";

//each user needs id, image, name, places
const Users = (props) => {
    const USERS = [
        {id: 'u1',
        name: 'Max', 
        image:'https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg', 
        places: 3},
        {id: 'u2',
        name: 'Max2', 
        image:'https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg', 
        places: 3}
    ];
    return <UsersList items={USERS} />
}

export default Users;