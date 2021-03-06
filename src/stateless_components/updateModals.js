import React from "react";
import { Button,Modal } from 'react-bootstrap';

export const UpdateModals=({trigger,handleUpdateModals,onChangeForm,updateUser})=>{

  return (
    <>
      <Modal show={trigger} onHide={e => handleUpdateModals()}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
        <div className="container">
            <div className="row">
                <div className="col-md-10 mrgnbtm">
                    <form>   
                        <div className="form-group col">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" onChange={(e) => onChangeForm(e)}  className="form-control" name="email" id="email" placeholder="ex:markondah@gmai.co.uk" required/>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="exampleInputPassword">Password</label>
                            <input type="password" onChange={(e) => onChangeForm(e)}  className="form-control" name="password" id="password"  placeholder="ex: ******" required/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e => handleUpdateModals()}>Close</Button>
          <Button variant="primary" onClick= {(e) => updateUser()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
