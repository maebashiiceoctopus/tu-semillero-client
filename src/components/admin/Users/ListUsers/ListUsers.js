import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import { EditOutlined, StopOutlined,DeleteOutlined,CheckOutlined} from "@ant-design/icons";

import noAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";

import "./listUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal , setVisibleModal]=useState(false);
  const [modalTitle , setModalTitle]=useState("");
  const [ modalContent, setModalContent]=useState(null);


  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? "Usuarios activos" : "usuarios inactivos"}
        </span>
      </div>
      {viewUsersActive ? (
        <ActiveUsers usersActive={usersActive} setVisibleModal={setVisibleModal} setModalTitle={setModalTitle}
        setModalContent={setModalContent} />
      ) : (
        <InactiveUsers usersInactive={usersInactive}/>
      )}

      <Modal
       title={modalTitle}
       isVisible={isVisibleModal}
       setIsVisible={setVisibleModal}
       >
        {modalContent}
      </Modal>
    </div>
  );
}

function ActiveUsers(props) {
  const { usersActive ,setVisibleModal ,setModalContent,setModalTitle} = props;
  const  editUser = user=>{
    setVisibleModal(true);
    setModalTitle(`Editar ${user.name} ${user.lastname}`);
    setModalContent("Editando un usuario");
  }
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => editUser(user)}>
              <EditOutlined />
            </Button>,

            <Button
              type="danger"
              onClick={() => console.log("Desactivar usuario")}
            >
              <StopOutlined />
            </Button>,
            <Button type="danger" onClick={() => console.log("Eliminar usuario")}>
             <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />}
            title={`${user.name ? user.name : "..."}
                  ${user.lastname ? user.lastname : "..."}
                 
                `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function InactiveUsers(props) {
  const { usersInactive } = props;
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => console.log("Activar")}>
              <CheckOutlined />
            </Button>,

           
            <Button type="danger" onClick={() => console.log("Eliminar usuario")}>
             <DeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : noAvatar} />}
            title={`${user.name ? user.name : "..."}
                  ${user.lastname ? user.lastname : "..."}
                 
                `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}
