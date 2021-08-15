import  React, {useState,useEffect} from 'react';
import {getAccessToken} from '../../api/auth';
import {getUserActive} from '../../api/user';

import ListUsers from '../../components/admin/Users/ListUsers';


import "./users.scss";

export default  function Users(){
    const [usersActive, setUsersActive]= useState([]);
    const [usersInactive, setUserInactive]= useState([]);
    const token = getAccessToken();

    console.log(usersActive);
    
    console.log(usersInactive);
    useEffect(()=>{
        getUserActive(token, true).then(response=>{
            setUsersActive(response.users);
          
        });
        getUserActive(token, false).then(response=>{
            setUserInactive(response.users);
          
        })
    },[token])
    return(
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} />
        </div>
    )
}