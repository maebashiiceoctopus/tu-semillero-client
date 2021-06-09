import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import "./registerForm.scss";
import { signUpApi } from "../../../api/user";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const registerUser = async e => {
    const { email, privacyPolicy, password, repeatPassword } = formValid;
    const emailValue = inputs.email;
    const privacyPolicyValue = inputs.privacyPolicy;

    const passwordValue = inputs.password;
    const repeatPasswordValue = inputs.repeatPassword;

    if (
      !emailValue ||
      !passwordValue ||
      !repeatPasswordValue ||
      !privacyPolicyValue
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    }else{
      if(passwordValue !==repeatPasswordValue){
        notification["error"]({
          message:"Las contraseñas no coinciden"
        })
      }else{
        const result = await signUpApi(inputs);
        if(!result.ok ){
          notification['error']({
            message:result.message
          });
        }else{
          notification['success']({
            message:result.message
          })
        }
      }
    }
  };

  return (
    <Form
      className="register-form"
      onChange={changeForm}
      onFinish={registerUser}
    >
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{ color: "rgb(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          value={inputs.email}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgb(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          value={inputs.password}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgb(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repite la contraseña"
          className="register-form__input"
          value={inputs.repeatPassword}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          checked={inputs.privacyPolicy}
          onChange={inputValidation}
        >
          He leido y acepto la politica de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
