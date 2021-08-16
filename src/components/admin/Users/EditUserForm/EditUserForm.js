import React from "react";
import { Avatar, Form, Input, Select, Row, Col, Button } from "antd";
import { useDropzone } from "react-dropzone";
import { useState, useCallback ,useEffect} from "react";
import noAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, MailOutlined,LockOutlined} from "@ant-design/icons";


import "./EditUserForm.scss";


export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  useEffect(()=>{
    if(avatar){
      setUserData({...userData,avatar})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[avatar])
  const updateUser = (e) => {
  
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <AvatarUpload avatar={avatar} setAvatar={setAvatar} />
      <EditForm user={user} userData={userData} setUserData={setUserData} updateUser={updateUser}/>
    
    </div>
  );
}

function AvatarUpload(props) {
  const { avatar, setAvatar } = props;

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
        <Avatar size={150} src={avatar ? avatar.preview : noAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const {  userData, setUserData, updateUser } = props;

  const { Option } = Select;

  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input 
            prefix={<UserOutlined />}
            placeholder="Nombre"
            defaultValue={userData.name}
            onChange= {e=> setUserData({...userData,name:e.target.value})}
            >
            </Input>
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
            <Input 
            prefix={<UserOutlined />}
            placeholder="Apellido"
            defaultValue={userData.lastname}
            onChange= {e=> setUserData({...userData,lastname:e.target.value})}
            >
            </Input>
            </Form.Item>
        </Col>
       
      </Row>
      <Row gutter={24}>
        <Col span={12}>
        <Form.Item>
            <Input 
            prefix={<MailOutlined />}
            placeholder="Email"
            defaultValue={userData.email}
            onChange= {e=> setUserData({...userData,email:e.target.value})}
            >
            </Input>
            </Form.Item>
        </Col>
        <Col span={12}>
            <Select
            placeholder="Selecciona un rol"
            onChange={e=> setUserData({...userData,role:e})}
            defaultValue={userData.role}
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
            defaultValue={userData.password}
            onChange= {e=> setUserData({...userData,password:e.target.value})}
            >
            </Input>
            </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item>
        <Input 
            prefix={<LockOutlined />}
            placeholder="Repite la contraseña"
            type="password"
            defaultValue={userData.password}
            onChange= {e=> setUserData({...userData,repeatPassword:e.target.value})}
            >
            </Input>
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
