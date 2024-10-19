import * as React from "react";
import * as Router from "react-router-dom";

export function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <div id="company-logo-box">
                <p id="company-logo">Qtt's</p>
            </div>
            <ul id="nav-buttons">
                <Router.Link to="/">
                    <li id="nav-projects-btn"><span className="material-icons-round">apartment</span>Projects</li>
                </Router.Link>
                <Router.Link to="/project">
                    <li id="nav-users-btn"><span className="material-icons-round">account_circle</span>Users</li>
                </Router.Link>
                <li><a href="#"><span className="material-icons-round">account_circle</span>Section 1</a></li>
                <li><a href="#section2"></a><span className="material-icons-round">account_circle</span>Section 2</li> 
            </ul>
        </aside>

    )
}