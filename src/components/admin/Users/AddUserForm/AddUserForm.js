import React, { useState } from "react";
//antd components
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
//api
import { newUserApi } from "../../../../api/user";
//auth
import { getAccessToken } from "../../../../api/auth";
//icons
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
//SASS
import "./AddUserForm.scss";

export default function EditUserForm(props) {
  const { setVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  const addUser = () => {
    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    }else if(userData.password !==userData.repeatPassword){
        
      notification["error"]({
        message: "Las contraseñas no coinciden.",
      });
    }else{
       const accesToken=getAccessToken();

       newUserApi(accesToken, userData)
       .then(response=>{
           notification["success"]({
               message:response
           })
           setVisibleModal(false);
           setReloadUsers(true);
           setUserData({});

       }).catch(err=>{
           notification["error"]({message:err})
       })
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      ></AddForm>
    </div>
  );
}

//style in line
const style = {
  color: "rgba(0, 0, 0, 0.25)",
};

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              style={style}
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
              style={style}
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
              style={style}
              placeholder="Correo electronico"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccione un rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewr">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              style={style}
              placeholder="Contraseña"
              type="password"
              value={userData.password}
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
              style={style}
              placeholder="Repetir contraseña"
              type="password"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
