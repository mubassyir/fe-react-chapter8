import React, { Component } from 'react';
import Header from "../stateless_components/header";
import {Body} from "../stateless_components/body";
import UserService from "../service/usersService.js";
import {Modals} from "../stateless_components/modals";
import {UpdateModals} from "../stateless_components/updateModals";
import {Button } from 'react-bootstrap';
import {ModalsConfirm} from "../stateless_components/modalsConfirm"


class UserPage extends Component {

    state = {
        user:{},
        getUser:[],
        modals:false,
        modalsConfirm:false,
        updateModals:false,
        id:0,
        search:""
    }
    // Main Methode
    componentDidMount() {
        this.getAllUser();
    }

    onChangeForm=(e)=>{
        let user = this.state.user;
        if(e.target.name ==="email"){
            user.email = e.target.value;
        } else if(e.target.name ==="password"){
            user.password = e.target.value;
        } else if(e.target.name === "search"){
            this.setState({search:e.target.value})
        }
    }

    handleModals =()=>{
        let modalsState = this.state.modals;
        this.setState({modals:!modalsState})
    }

    handleUpdateModals =()=>{
        let updateModalsState = this.state.updateModals;
        this.setState({updateModals:!updateModalsState});
    }

    handleModalsConfirm=()=>{
        let confirmModalsState = this.state.modalsConfirm;
        this.setState({modalsConfirm:!confirmModalsState});
    }

    setStateId= async (id)=>{
        await this.setState({id:id})
        this.handleUpdateModals();
        console.log(`Update Id : ${this.state.id}`);
    }

    setStateConfirm=async(id)=>{
        await this.setState({id:id});
        console.log(`Delete Id : ${id}`);
        this.handleModalsConfirm();
    }

    // Retrive all data
    getAllUser=()=>{
        UserService.getAllUser().then((result)=>{
            this.setState({getUser:result.data})
        }).catch((e)=>{
            console.log(`error on retrive all data : ${e}`)
        })
    }

    // Create User
    createUser=()=>{
        UserService.createUser(this.state.user).then((result)=>{
            console.log(`create user :${result}`);
            this.getAllUser();
        }).catch((e)=>{
            console.log(`error on create user : ${e}`)
        })
        this.handleModals();
    }

    // Retrive data by search
    searchByEmail=()=>{
        UserService.searchByEmail(this.state.search).then((result)=>{
            this.setState({getUser:result.data});
            console.log(`seach by email : ${result}`);
        }).catch((e)=>{
            console.log(`error on search bu email ${e}`)
        })
    }  

    //Update user
    updateUser=()=>{
        UserService.updateUser(this.state.id,this.state.user).then(()=>{
            this.getAllUser();
            this.handleUpdateModals();
        }).catch((e)=>{
            console.log(`error on update user : ${e}`)
        })
        console.log(this.state.user)
        console.log(this.state.id)
    }

    //Delete user
    deleteUser=()=>{
        console.log("user responding Yes")
        UserService.deleteUser(this.state.id).then(()=>{
            this.getAllUser();
            this.setStateConfirm();
        }).catch((e)=>{
            console.log(`error when deleting user : ${e}`)
        })
    }

    render(){
        return (
            <div>
                {/* Header */}
                <Header></Header>

                <div className="container">
                    <Button variant="success" className="mb-3 mr-2" onClick={this.handleModals}>Manual Add</Button>

                    {/* Body */}
                    <Body
                    users={this.state.getUser}
                    onChangeForm={this.onChangeForm}
                    searchByEmail={this.searchByEmail}
                    setStateId={this.setStateId}
                    setStateConfirm={this.setStateConfirm}>
                    </Body>

                    {/* Modals manual add */}
                    <Modals 
                    handleModals={this.handleModals}
                    trigger = {this.state.modals}
                    onChangeForm={this.onChangeForm}
                    createUser={this.createUser}>
                    </Modals>

                    {/* Modals update user */}
                    <UpdateModals
                    trigger = {this.state.updateModals}
                    handleUpdateModals={this.handleUpdateModals}
                    onChangeForm={this.onChangeForm}
                    updateUser={this.updateUser}
                    ></UpdateModals>

                    {/* Modals confirm delete */}
                    <ModalsConfirm
                    trigger={this.state.modalsConfirm}
                    handleModalsConfirm={this.handleModalsConfirm}
                    deleteUser={this.deleteUser}
                    ></ModalsConfirm>
                </div>
            </div>
        );
    }
}

export default UserPage;