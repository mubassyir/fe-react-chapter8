import React, { Component } from 'react';
import Header from "../stateless_components/header";
import {Body} from "../stateless_components/body";
import UserService from "../service/usersService.js";
import {Modals} from "../stateless_components/modals";
import {Button } from 'react-bootstrap';
import {ModalsConfirm} from "../stateless_components/modalsConfirm"


class UserPage extends Component {

    state = {
        user:{},
        getUser:[],
        modals:false,
        modalsConfirm:false,
        id:0,
        search:"",
        actionModals:""
    }
    // Main Method
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
    
    // Retrive all data
    getAllUser=()=>{
      UserService.getAllUser().then((result)=>{
          this.setState({getUser:result.data});
      }).catch((e)=>{
          console.log(`error on retrive all data : ${e}`)
      })
    }

    //Call modals for create
    callModalsCreate=async()=>{
        await this.setState({modals:true,actionModals:"create"});
        console.log(`action :${this.state.actionModals}`);
    }

    //call modals for update
    callModalsUpdate= async (id)=>{
        await this.setState({id:id,modals:true,actionModals:"update"})
        console.log(`Update Id : ${this.state.id}`);
        console.log(`action :${this.state.actionModals}`);
    }

    //call modals for confirm delete
    callModalsDelete=async(id)=>{
        await this.setState({id:id,modalsConfirm:true,actionModals:"delete"});
        console.log(`Delete Id : ${id}`);
        console.log(`action :${this.state.actionModals}`);
    }

    // function for service to API
    userService=async()=>{
        console.log("calling service")
        let action = await this.state.actionModals; 

        switch(action){
            case "create":{
                UserService.createUser(this.state.user).then((result)=>{
                    console.log(`create user :${result}`);
                    this.getAllUser();
                    this.setState({modals:false});
                }).catch((e)=>{
                    console.log(`error on create user : ${e}`);
                });
                break;
            }
            case "update":{
                UserService.updateUser(this.state.id,this.state.user).then(()=>{
                    this.getAllUser();
                    this.setState({modals:false});
                }).catch((e)=>{
                   console.log(`error on update user : ${e}`);
                })
                   console.log(this.state.user);
                   console.log(this.state.id);
                   break
            }
            case "delete":{
                UserService.deleteUser(this.state.id).then(()=>{
                    this.getAllUser();
                }).catch((e)=>{
                    console.log('error when deleting user');
                })
                break;
            }
            case "search":{
                UserService.searchByEmail(this.state.search).then((result)=>{
                this.setState({getUser:result.data});
            }).catch((e)=>{
                console.log(`error on search bu email ${e}`)
            })
             break;
            }
            default :{
                return null;
            }
        }
    }

    // Retrive data by search
    searchByEmail=async()=>{
        await this.setState({actionModals:"search"});
        this.userService();
    }  

    //Delete user
    deleteUser=async()=>{
        console.log("user responding Yes");
        await this.setState({modalsConfirm:false});
        this.userService()
    }

    render(){
        return (
            <div>
                {/* Header */}
                <Header></Header>

                <div className="container">
                    <Button variant="success" className="mb-3 mr-2" onClick={()=>this.callModalsCreate()}>Manual Add</Button>

                    {/* Body */}
                    <Body
                    users={this.state.getUser}
                    onChangeForm={this.onChangeForm}
                    searchByEmail={this.searchByEmail}
                    callModalsUpdate={this.callModalsUpdate}
                    callModalsDelete={this.callModalsDelete}>
                    </Body>

                    {/* Modals form*/}
                    <Modals 
                    actionModals ={()=>this.state.actionModals}
                    hideModals={()=>this.setState({modals:false})}
                    trigger = {this.state.modals}
                    onChangeForm={this.onChangeForm}
                    userService={()=>this.userService()}>
                    </Modals>

                    {/* Modals confirm delete */}
                    <ModalsConfirm
                    trigger={this.state.modalsConfirm}
                    hideModalsConfirm={()=>this.setState({modalsConfirm:false})}
                    deleteUser={()=>this.deleteUser()}
                    ></ModalsConfirm>
                </div>
            </div>
        );
    }
}

export default UserPage;