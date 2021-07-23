import  React , {useState} from 'react';
import { Switch, List, Avatar, Button , Icon } from 'antd';

import noAvatar from '../../../../assets/img/png/no-avatar.png';

import './listUsers.scss';
import { diffKeys } from 'rc-motion/lib/util/diff';

export default function ListUsers(props){
    const {usersActive,usersInactive}= props;

    return(
        <div>
            <h1>Lista de usuarios</h1>
        </div>
    )

}