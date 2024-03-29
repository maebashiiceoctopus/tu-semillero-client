import  React, {useState,useEffect} from 'react';
import {getAccessToken} from '../../api/auth';
import {getUserActiveApi} from '../../api/user';

import ListUsers from '../../components/admin/Users/ListUsers';


import "./users.scss";

export default  function Users(){
    const [usersActive, setUsersActive]= useState([]);
    const [usersInactive, setUserInactive]= useState([]);
    const [reloadUsers,setReloadUsers]=useState([false]);
    const token = getAccessToken();


    

    useEffect(()=>{
        getUserActiveApi(token, true).then((response) => {
          setUsersActive(response.users);
        });
        getUserActiveApi(token, false).then((response) => {
          setUserInactive(response.users);
        });
        setReloadUsers(false);
    },[token, reloadUsers])
    return(
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUsers={setReloadUsers}/>
        </div>
    )
}