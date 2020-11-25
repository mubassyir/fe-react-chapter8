import React from "react"
import {Modal,Button} from "react-bootstrap"

export const ModalsConfirm=({trigger,hideModalsConfirm,deleteUser})=>{
    return(
            <Modal 
            show={trigger} 
            onHide={() => hideModalsConfirm()}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure to <span className="text-danger">delete?</span></Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={e=> hideModalsConfirm()} >Close</Button>
                  <Button variant="danger" onClick={e => deleteUser()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        
    )
}