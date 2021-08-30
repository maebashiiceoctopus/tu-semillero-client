import React, { useState ,useEffect} from "react";
import { Switch, List, Avatar, Button } from "antd";
import { EditOutlined, StopOutlined,DeleteOutlined,CheckOutlined} from "@ant-design/icons";

import noAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm/EditUserForm";
import { getAvatarApi } from "../../../../api/user";

import "./listUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive ,setReloadUsers} = props;
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
        setModalContent={setModalContent} setReloadUsers={setReloadUsers}/>
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
  const { usersActive ,setVisibleModal ,setModalContent,setModalTitle,setReloadUsers} = props;
  const  editUser = user=>{
    setVisibleModal(true);
    setModalTitle(`Editar ${user.name} ${user.lastname}`);
    setModalContent(<EditUserForm user={user} setIsVisible={setVisibleModal} setReloadUsers={setReloadUsers}/>);
  }
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <ActiveUser user={user} editUser={editUser}/>}
    />
  );
}

//render one user
function ActiveUser(props){
  const {user,editUser}=props;
  const [avatar,setAvatar]=useState(null);

  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
    
  }, [user])
  return(
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
            avatar={<Avatar src={avatar ? avatar : noAvatar} />}
            title={`${user.name ? user.name : "..."}
                  ${user.lastname ? user.lastname : "..."}
                 
                `}
            description={user.email}
          />
        </List.Item>
  )

}

function InactiveUsers(props) {
  const { usersInactive } = props;

  
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <InactiveUser user={user} />}

     
    />
  );
}

function InactiveUser(props){
  const {user}= props;
  const [avatar,setAvatar]=useState(null);
  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
    
  }, [user])

  return(
   
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
          avatar={<Avatar src={avatar ? avatar : noAvatar} />}
          title={`${user.name ? user.name : "..."}
                ${user.lastname ? user.lastname : "..."}
               
              `}
          description={user.email}
        />
      </List.Item>

  )
  
}