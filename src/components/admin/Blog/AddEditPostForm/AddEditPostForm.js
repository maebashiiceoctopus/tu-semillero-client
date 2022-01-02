import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  notification
} from "antd";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { LinkOutlined, FontSizeOutlined, DeleteOutlined } from "@ant-design/icons";

import {getAccessToken} from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/posts"

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = e =>{
      if (!post) {
          console.log("creando post")
      } else {
          console.log("editando post")
      }
  }

  return (
    <div className="add-edit-post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className="post-form" layout="inline" onFinish={processPost}>
      <section className="post-form-content">
        <div className="post-form-content__input">
          <Input
            className
            prefix={<FontSizeOutlined />}
            placeholder="Titulo"
            value={postData.title}
            onChange={e => setPostData({ ...postData, title: e.target.value })}
          />
        </div>
        <div className="post-form-content__input">
          <Input

            prefix={<LinkOutlined />}
            placeholder="url"
            value={postData.url}
           
          />
        </div>
        <div className="post-form-content__input">
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de publicación"
            value={postData.date && moment(postData.date)}
            
          />
        </div>
      </section>
      <Editor
        
        value="<p>This is the initial content of the editor.</p>"
         init={{
           height: 400,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
    
    <Button type="primary" htmlType="submit" className="btn-submit">
        {post ? "Actualizar post" : "Crear post"}
      </Button>
     
    </Form>
  );
}

