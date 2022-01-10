import React, { useState,useEffect } from "react";
import { List, Button, notification, Modal,Image } from "antd";
import { Link } from "react-router-dom";

import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./PostList.scss";
import {getAccessToken} from "../../../../api/auth";
import {deletePostApi} from "../../../../api/posts"
import { getCoverApi } from "../../../../api/posts";
const { confirm } = Modal;

export default function Postlist(props) {
  const { posts, setReloadPosts, editPost } = props;
 
  const deletePost = post => {
    const accessToken = getAccessToken();

    confirm({
      title: "Eliminando post",
      content: `¿Desear eliminar el post ${post.description}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(accessToken, post._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadPosts(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor."
            });
          });
      }
    });
  };


  return (
    <div className="posts-list">
    <List
      dataSource={posts.docs}
      renderItem={post => (
        <Post post={post} deletePost={deletePost}  editPost={editPost} />
      )}
    />
  </div>

  );
}

function Post(props) {
  const { post, deletePost,editPost } = props;
  const [coverImage,setcoverImage]=useState(null);
  
useEffect(()=>{
  if(post.cover){
    getCoverApi(post.cover).then(response=>{
      setcoverImage(response);
    })
  }
  
},[post])
 

  return (
    <List.Item
      actions={[
        <Link to= {`/blog/${post.url}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,

        <Button type="primary">
          <EditOutlined onClick={()=> editPost(post)} />
        </Button>,
        <Button type="danger" onClick={() => deletePost(post)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <div  className="post-image">
      <Image src={coverImage}></Image>
      </div>
     
      <List.Item.Meta title={post.description} />
      
    
    </List.Item>
  );
}


