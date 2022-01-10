import React, { useState, useEffect } from "react";
import { Spin, List, notification, Card, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../Pagination/Pagination";
import { getPostsApi } from "../../api/posts";
import { getCoverApi } from "../../api/posts";

import "moment/locale/es";

import "./PostCards.scss";

export default function PostCards(props) {
  const { location, history } = props;

  const [posts, setPosts] = useState(null);
  const [coverImage, setcoverImage] = useState(null);

  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
  }, [page]);

  console.log(posts);
  if (!posts) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <section className="post-container">
      <h1 className="section-title">Temas Nuevos</h1>
      <hr className="line"></hr>
      <p className="section-description">Acá encontraras los temas que nuestros estudiantes vienen adelandanto en los semilleros de investigación </p>

      <List
        className="card-container"
        dataSource={posts.docs}
        renderItem={(post) => <Post post={post} />}
      />
      <Pagination posts={posts} location={location} history={history} />
    </section>
  );
}

function Post(props) {
  const { Meta } = Card;
 
  const { post } = props;

  console.log(post)

  const [coverImage,setcoverImage]=useState(null);
  console.log(post)


  useEffect(()=>{
    if(post.cover){
      getCoverApi(post.cover).then(response=>{
        setcoverImage(response);
      })
    }
    
  },[post])



  return (
    <Card
      className="card-contaider__card"
      
      cover={
        <img className="img-content"
          alt="example"
          src={coverImage}
        />
      }
    >
      <Meta title={post.description} />
      <p
        className="post-description"
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></p>
      <div className="button-container">
        <Link to={`blog/${post.url}`}>
          <Button className="button-post" type="primary">
            Ver más
          </Button>
        </Link>
      </div>
    </Card>
  );
}
