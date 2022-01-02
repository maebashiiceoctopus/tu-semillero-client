import React from "react";
import { List, Button, notification, Modal } from "antd";
import { Link } from "react-router-dom";

import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./PostList.scss";

export default function Postlist(props) {
  const { posts } = props;

  console.log(posts.docs);
  return (
    <div className="posts-list">
      <List
        dataSource={posts.docs}
        renderItem={(post) => <Post post={post} />}
      />
    </div>
  );
}

function Post(props) {
  const { post } = props;

  return (
    <List.Item
      actions={[
        <Link to= {`/blog/${post.url}`} target="_blank">
          <Button type="primary">
            <EyeOutlined />
          </Button>
        </Link>,

        <Button type="primary">
          <EditOutlined />
        </Button>,
        <Button type="danger">
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={post.description} />
    </List.Item>
  );
}
