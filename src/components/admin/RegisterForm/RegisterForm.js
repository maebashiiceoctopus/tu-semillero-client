import React from 'react';
import {Form, Input, Button,Checkbox,notification} from 'antd';
import {MailOutlined,LockOutlined } from "@ant-design/icons";
import "./registerForm.scss";

export default function RegisterForm(){
    return (

        <Form className="register-form">
            <Form.Item>
                <Input prefix ={<MailOutlined style={{color:"rgb(0,0,0,.25)"}}/> } type="email" name="email" placeholder="Correo electronico" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix ={<LockOutlined  style={{color:"rgb(0,0,0,.25)"}}/> } type="password" name="password" placeholder="Contraseña" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Input prefix ={<LockOutlined  style={{color:"rgb(0,0,0,.25)"}}/> } type="password" name="repeatPassword" placeholder="Repite la contraseña" className="register-form__input"/>
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy" >
                    He leido y acepto la politica de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>

        </Form>
    )
}