import React, { useState, useEffect } from "react";
import { Button,notification } from 'antd';
import Modal  from "../../components/Modal";
import queryString from "query-string";


import "./Blog.scss";

const Blog = () => {

const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary">Nuevo Post</Button>
            </div>

            <h1>PostLists....</h1>
            <h2>Paginacion</h2>
            <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      />
               

        
        </div>
    );
}

export default Blog;
