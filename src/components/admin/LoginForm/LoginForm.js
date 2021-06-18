import React,{useState} from "react";
import "./loginForm.scss";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { signInApi } from '../../../api/user';

export default function LoginForm() {
    const [inputs, setInputs]=useState({
        email:'',
        password:''
    });

    const changeForm= e =>{
       setInputs({
           ...inputs,
           [e.target.name]:e.target.value,
       })
    }

    const login =e =>{
      
        console.log(inputs);
        signInApi(inputs);
    }


  return (
    <Form className="login-form"  onChange={changeForm} onFinish={login}>
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{ color: "rgb(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgb(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
        
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
