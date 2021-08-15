import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import { EditOutlined, StopOutlined,DeleteOutlined,CheckOutlined} from "@ant-design/icons";

import noAvatar from "../../../../assets/img/png/no-avatar.png";

import "./listUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);

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
        <ActiveUsers usersActive={usersActive} />
      ) : (
        <InactiveUsers usersInactive={usersInactive}/>
      )}
    </div>
  );
}

function ActiveUsers(props) {
  const { usersActive } = props;
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => console.log("editar")}>
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
