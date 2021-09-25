import React, { useState ,useEffect} from "react";
import { Switch, List, Avatar, Button, notification,Modal as ModalAntd} from "antd";
import { EditOutlined, StopOutlined,DeleteOutlined,CheckOutlined} from "@ant-design/icons";

import noAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm/EditUserForm";
import AddUserForm from "../AddUserForm/AddUserForm";
import { getAvatarApi ,activateUserApi,deleteUserApi} from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";

import "./listUsers.scss";

const {confirm}=ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive ,setReloadUsers} = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal , setVisibleModal]=useState(false);
  const [modalTitle , setModalTitle]=useState("");
  const [ modalContent, setModalContent]=useState(null);
  
  const addUserModal=()=>{
    setVisibleModal(true)
    setModalTitle("Creando nuevo usuario");
    setModalContent(  
      <AddUserForm setVisibleModal={setVisibleModal} setReloadUsers={setReloadUsers}></AddUserForm>
    )
  }


  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
          <span>
            {viewUsersActive ? "Usuarios activos" : "usuarios inactivos"}
          </span>
        </div>

        <Button type="primary" onClick={addUserModal}>
          Crear usuario
        </Button>
      </div>

      {viewUsersActive ? (
        <ActiveUsers
          usersActive={usersActive}
          setVisibleModal={setVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <InactiveUsers
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
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
    setModalTitle(`Editar ${user.name ? user.name:"datos" } ${user.lastname? user.lastname:" "}`);
    setModalContent(<EditUserForm user={user} setIsVisible={setVisibleModal} setReloadUsers={setReloadUsers}/>);
  }
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <ActiveUser user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
    />
  );
}

//render one user
function ActiveUser(props){
  const {user,editUser, setReloadUsers}=props;
  const [avatar,setAvatar]=useState(null);

  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response=>{
        setAvatar(response);
      })
    }else{
      setAvatar(null);
    }
    
  }, [user]);
  const desactivateUser= ()=>{
    const accesToken= getAccessToken();
    activateUserApi(accesToken,user._id,false)
    .then(response =>{
      notification["success"]({
        message:response
      })
      setReloadUsers(true);
      
    })
    .catch(err=>{
      notification["error"]({
        message:err
      })
    })
  }

  const showDeleteConfirm= ()=>{
    const accesToken=getAccessToken();
    confirm({
      title:"Eliminando Usuario",
        content:`¿Estás seguro que quieres eliminar a ${user.email}?`,
        okText:"Eliminar",
        okType:"danger",
        cancelText:"Cancelar",
        onOk(){
          deleteUserApi(accesToken,user._id)
          .then(response=>{
            notification["success"]({message:response})
            setReloadUsers(true)
          })
          .catch(err=>{
             notification["error"]({message:err})
          })
        }

    })
  }
  return(
    <List.Item
          actions={[
            <Button type="primary" onClick={() => editUser(user)}>
              <EditOutlined />
            </Button>,

            <Button
              type="danger"
              onClick={desactivateUser}
            >
              <StopOutlined />
            </Button>,
            <Button type="danger" onClick={showDeleteConfirm}>
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
  const { usersInactive ,setReloadUsers} = props;

  
  return (
    <List
      className="active-users"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <InactiveUser user={user} setReloadUsers={setReloadUsers}/>}

     
    />
  );
}

function InactiveUser(props){
  const {user,setReloadUsers}= props;
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
  
  const activateUser= ()=>{
    const accesToken= getAccessToken();
    activateUserApi(accesToken,user._id,true)
    .then(response =>{
      notification["success"]({
        message:response
      })
      setReloadUsers(true);
      
    })
    .catch(err=>{
      notification["error"]({
        message:err
      })
    })
  }

  const showDeleteConfirm = () => {
    const accesToken = getAccessToken();
    confirm({
      title: "Eliminando Usuario",
      content: `¿Estás seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accesToken, user._id)
          .then((response) => {
            notification["success"]({ message: response });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({ message: err });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckOutlined />
        </Button>,

        <Button type="danger" onClick={showDeleteConfirm}>
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
  );
  
}