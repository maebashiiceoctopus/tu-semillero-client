import React, { useState, useEffect, useCallback} from "react";
import {
  Image,
  Form,
  Input,
  Button,
  DatePicker,
  notification
} from "antd";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import nocoverImage from "../../../../assets/img/png/no-pictures.png";

import { Editor } from "@tinymce/tinymce-react";
import { LinkOutlined, FontSizeOutlined, DeleteOutlined } from "@ant-design/icons";

import {getAccessToken} from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/posts"

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});
  const [coverImage, setcoverImage] = useState(null);


  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);


  const processPost = e => {
 
    const { description, url, content, date } = postData;

    if (!description || !url || !content || !date) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });
    } else {
      if (!post) {
        addPost();
        console.log(postData)
      } else {
        updatePost();
      }
    }
  };

  const addPost = () => {
    const token = getAccessToken();

    addPostApi(token, postData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
  };

  const updatePost = () => {
    const token = getAccessToken();
    updatePostApi(token, post._id, postData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
  };

  return (
    <section className="add-edit-post-form">
      <div className="add-edit-post-form__upload">
        <h2 className="add-edit-post-form__text">Por favor selecciona una imagen de vista previa:</h2>
      <CoverImageUpload coverImage={coverImage} setcoverImage={setcoverImage} />
      </div>
       
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </section>
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
            value={postData.description}
            onChange={e => setPostData({ ...postData, description: e.target.value })}
          />
        </div>
        <div className="post-form-content__input">
          <Input

            prefix={<LinkOutlined />}
            placeholder="url"
            value={postData.url}
            onChange={e =>
                setPostData({
                  ...postData,
                  url: transformTextToUrl(e.target.value)
                })
              }
           
          />
        </div>
        <div className="post-form-content__input">
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="Fecha de publicación"
            value={postData.date && moment(postData.date)}
            onChange={(e, value) =>
                setPostData({
                  ...postData,
                  date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
                })
              }
          />
        </div>
      </section>
      <Editor
        

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
         onBlur={e =>
            setPostData({ ...postData, content: e.target.getContent() })
          }
       />
    
    <Button type="primary" htmlType="submit" className="btn-submit">
        {post ? "Actualizar post" : "Crear post"}
      </Button>
     
    </Form>
  );
}
function CoverImageUpload(props) {
  const { coverImage, setcoverImage } = props;
  
  const [coverImageUrl, setcoverImageUrl]= useState(null);

  useEffect(() => {
    if (coverImage) {
      if (coverImage.preview) {
        setcoverImageUrl(coverImage.preview);
      } else {
        setcoverImageUrl(coverImage);
      }
    } else {
      setcoverImageUrl(null);
    }
  }, [coverImage]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setcoverImage({ file, preview: URL.createObjectURL(file) });
    },
    [setcoverImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className="upload-cover-image" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image  src={nocoverImage} preview="false"/>
      ) : (
        <Image  preview="false"  src={coverImageUrl ? coverImageUrl : nocoverImage} />
      )}
    </div>
  );
}

function transformTextToUrl(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
  }