import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

let Header=()=>{
    return (
        <div>
            <Navbar className = "bg-secondary" expand="lg">
                <h1 className="text-light font-weight-bold">CRUD USER GAME</h1>
            </Navbar>
            <p className="ml-3">Manually crud User Database With ReactJs</p>
        </div>
    )
}

export default Header;