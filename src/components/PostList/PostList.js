import React,{useState,useEffect} from "react";
import { Spin,List,notification,Card,Avatar} from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../Pagination/Pagination";
import {getPostApi, getPostsApi} from "../../api/posts";
import "moment/locale/es";



import "./PostList.scss";

export default function PostList(props) {
  const {location,history}=props;


  const [posts, setPosts]=useState(null);
  const [coverImage,setcoverImage]=useState(null);


  const {page =1}= queryString.parse(location.search);

  useEffect(()=>{
    getPostsApi(12,page).then(response=>{
      if(response?.code !==200){
        notification["warning"]({
          message:response.message
        })
      }else{
        setPosts(response.posts)
      }
    }).catch(()=>{
      notification["error"]({
        message:"Error del servidor"
      });
    });
  },[page]);


  
console.log(posts)
  if (!posts) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <div>
       <List
          dataSource={posts.docs}
          renderItem={post => <Post post={post} />}
        />
      <Pagination posts={posts} location={location} history={history}/>
    </div>
  );
}


function Post (props){
    const { Meta } = Card;

  const {post}=props;
  return (
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    
  >
    <Meta
      title={post.description}
      
    />
    <p dangerouslySetInnerHTML={{ __html: post.description }}>
     
    </p>
  </Card>
  )
}