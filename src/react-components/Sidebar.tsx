import * as React from "react";
import * as Router from "react-router-dom";

export function Sidebar() {

// const sidebarStyle: React.CSSProperties = [

// ]

    return (
        <aside id="sidebar" className="sidebar">
            <div id="company-logo-box">
                <p id="company-logo">Qtt's</p>
            </div>
            <ul id="nav-buttons">
                <Router.Link to="/">
                    <li><bim-label style={{color: "#fff"}} icon="material-symbols:apartment">Projects</bim-label></li>
                </Router.Link>
                <Router.Link to="/users">
                    <li><bim-label style={{color: "#fff"}} icon="mdi:user">Users</bim-label></li>
                </Router.Link>
                
                {/* <a href="#">
                    <li>
                        <span 
                            className="material-icons-round">account_circle
                        </span>
                        Section 1
                    </li>
                </a>
                <a href="#section2">
                    <li>
                        <span 
                            className="material-icons-round">account_circle
                        </span>
                        Section 2
                    </li> 
                </a> */}
            </ul>
        </aside>

    )
}