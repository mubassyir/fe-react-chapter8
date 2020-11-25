import React from "react";
import { Button,Modal } from 'react-bootstrap';

export const Modals=({actionModals,hideModals,trigger,onChangeForm,userService})=>{

  let title = ""
  if(actionModals==="create"){
    title = "Create User";
  } else{
    title = "Update User";
  }
  return (
    <>
      <Modal show={trigger} onHide={e => hideModals()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
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
          <Button variant="secondary" onClick={() => hideModals()}>
            Close
          </Button>
          <Button variant="primary" onClick= {() => userService()}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
