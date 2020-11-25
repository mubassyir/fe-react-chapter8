import React from "react";
import {Button,Form,FormControl,Card } from 'react-bootstrap';
import "./body.css"

export const Body = ({users,onChangeForm,searchByEmail,callModalsUpdate,callModalsDelete})=>{

    if (users.length === 0) return null

    const UserRow = (user,index) => {
        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                      <div className="row action-row">
                          <div>
                            <Button className="btn-success" onClick={() => callModalsUpdate(user.id)}>Update</Button>
                          </div>
                          <div>
                            <Button className="btn-danger" onClick={() => callModalsDelete(user.id)}>Delete</Button>
                          </div>
                      </div>
                  </td>
              </tr>
          )
    }

const userTable = users.map((user,index) => UserRow(user,index))

    return(
        <Card>
        <div className="container">
            <div className="container row">
                <div className="col-md mt-3">
                    <h2>Users</h2>
                </div>
                <div className="col-md">
                    <Form inline className="my-3" >
                        <FormControl type="text" placeholder="Search" onChange={(e) => onChangeForm(e)} className=" mr-sm-2" name="search" />
                        <Button variant="secondary" onClick= {(e) => searchByEmail()}>Search</Button>
                    </Form>
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                   {userTable}
                </tbody>
            </table>
        </div>
        </Card>
    )
}
