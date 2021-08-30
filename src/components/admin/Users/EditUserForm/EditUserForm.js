import React from "react";
import { Avatar, Form, Input, Select, Row, Col, Button ,notification} from "antd";
import { useDropzone } from "react-dropzone";
import { useState, useCallback, useEffect } from "react";
import noAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { getAvatarApi , uploadAvatarApi,updateUserApi} from "../../../../api/user";
import { getAccessToken } from '../../../../api/auth';

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

   useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = e => {
   
    const token = getAccessToken();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas no coinciden."
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios."
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatar;
        updateUserApi(token, userUpdate, user._id).then(result => {
          notification["success"]({
            message: result.message
          });
         
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then(result => {
        notification["success"]({
          message: result.message
        });
        
      });
    }
  };

  return (
    <div className="edit-user-form">
      <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        user={user}
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function AvatarUpload(props) {
  const { avatar, setAvatar } = props;
  
  const [avatarUrl, setAvatarUrl]= useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={noAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;

  const { Option } = Select;

  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellido"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Select
            placeholder="Selecciona un rol"
            onChange={(e) => setUserData({ ...userData, role: e })}
            value={userData.role}
          >
            <Option value="admin">Administrador</Option>
            <Option value="editor">Editor Contenido</Option>
            <Option value="revisor">Revisor Contenido</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              type="password"
            
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Repite la contraseña"
              type="password"
                
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
