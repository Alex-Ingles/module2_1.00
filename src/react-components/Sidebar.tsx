import * as React from "react";

export function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <div id="company-logo-box">
                <p id="company-logo">Qtt's</p>
            </div>
            <div id="nav-buttons">
                <li id="nav-projects-btn"><span className="material-icons-round">apartment</span>Projects</li>
                <li id="nav-users-btn"><span className="material-icons-round">account_circle</span>Users</li>
                <li><a href="#"><span className="material-icons-round">account_circle</span>Section 1</a></li>
                <li><a href="#section2"></a><span className="material-icons-round">account_circle</span>Section 2</li> 
            </div>
        </aside>

    )
}