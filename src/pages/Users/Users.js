import  React, {useState,useEffect} from 'react';
import {getAccessToken} from '../../api/auth';
import {getUserActive} from '../../api/user';


import "./users.scss";

export default  function Users(){
    const [usersActive, setUsersActive]= useState([]);
    const [usersInactive, setUserInactive]= useState([]);
    const token = getAccessToken();

    console.log(usersActive);
    
    console.log(usersInactive);
    useEffect(()=>{
        getUserActive(token, true).then(response=>{
            setUsersActive(response);
          
        });
        getUserActive(token, false).then(response=>{
            setUserInactive(response);
          
        })
    },[token])
    return(
        <div>
            <h1>
                lista de usuarios
            </h1>
        </div>
    )
}