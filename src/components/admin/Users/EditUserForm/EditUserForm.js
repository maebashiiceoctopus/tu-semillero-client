import React from 'react';
import {Avatar, Form, Input, Select, Row, Col, Button} from 'antd';
import { useDropzone } from 'react-dropzone';
import { useState , useCallback} from 'react';
import noAvatar from "../../../../assets/img/png/no-avatar.png";


import './EditUserForm.scss'
import { urlAlphabet } from 'nanoid';

export default function EditUserForm(props){

    const {user}=props;
    const [avatar, setAvatar]=useState(null);

    return(
        <div className="edit-user-form">
            <AvatarUpload avatar={avatar} setAvatar={setAvatar}/> 

            <h2> {user.email}</h2>
        </div>
    )
}

function AvatarUpload(props){
    const {avatar, setAvatar}=props;

    const onDrop= useCallback(
        acceptedFiles=>{
            const file= acceptedFiles[0];
            setAvatar({file, preview:URL.createObjectURL(file)})
        },
        [setAvatar]
    );
    const {getRootProps, getInputProps, isDragActive}=useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard:true,
        onDrop
    });
    return (
        <div className="upload-avatar" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Avatar size={150} src={noAvatar} />
          ) : (
            <Avatar size={150} src={avatar ? avatar.preview : noAvatar} />
          )}
        </div>
      );
}