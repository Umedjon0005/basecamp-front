import { Link } from "react-router-dom";
import React from "react";
import './MainReg.scss';

const Mainreg = () => {
    return (
        <div className="mainreg">
            <div className="title">
                <h2>Welcome to BASECAMP</h2>
            </div>
            <div className="links">
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>
    )
}

export default Mainreg;