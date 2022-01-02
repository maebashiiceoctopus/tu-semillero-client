import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import Modal from "../../components/Modal";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Postlist from "../../components/admin/Blog/PostList/PostList";

import "./Blog.scss";
import { getPostsApi } from "../../api/posts";
import Pagination from "../../components/Pagination/Pagination";
import AddEditPostForm from "../../components/admin/Blog/AddEditPostForm";


const Blog = (props) => {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);


  useEffect(() => {
    getPostsApi(12, page)
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
    setReloadPosts(false);
  }, [page, reloadPosts]);


  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}
      />
    );
  };

  if(!posts ){
    return null;
  }

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary" onClick={addPost}>Nuevo Post</Button>
      </div>
   
      <Postlist posts={posts} setReloadPosts={setReloadPosts}/>
      <Pagination posts={posts} location={location} history={history}/>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      />
    </div>
  );
};

export default withRouter(Blog);
