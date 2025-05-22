import * as React from "react"
import * as ReactDOM from "react-dom/client"
import * as Router from "react-router-dom"
import { Sidebar } from "./react-components/Sidebar"
import { ProjectsPage } from "./react-components/ProjectsPage"
import { ProjectDetailsPage } from "./react-components/ProjectDetailsPage"
import { ProjectDetailsPage2 } from "./react-components/ProjectDetailsPage2"
import { UsersPage } from "./react-components/UsersPage"

import { ProjectsManager } from "./classes/ProjectsManager"
import * as BUI from "@thatopen/ui"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "bim-grid": any;
            "bim-label": any;
            "bim-button": any;
            "bim-text-input": any;
            "bim-table": any;
        }
    }
}


console.warn("Starting...")
BUI.Manager.init()
console.warn("Creating ProjectsManager...")
const projectsManager = new ProjectsManager()

const rootElement = document.getElementById("app") as HTMLDivElement
const appRoot = ReactDOM.createRoot(rootElement)
appRoot.render(
    <>
        <Router.BrowserRouter>
            <Sidebar />
            <Router.Routes>
                <Router.Route path="/" element={<ProjectsPage projectsManager={projectsManager}/>} />
                <Router.Route path="/project/:id" element={<ProjectDetailsPage2 projectsManager={projectsManager}/>} />
                <Router.Route path="/users" element={<UsersPage/>} />
            </Router.Routes>
        </Router.BrowserRouter>
    </>
)

const projectDetails = document.getElementById("project-details")

// Nav Projects Btn -----------------------------------------------------------------------------
const projectsBtn = document.getElementById("nav-projects-btn")
const projectsPage = document.getElementById("projects-page")
if (projectsBtn && projectsPage) {
    projectsBtn.addEventListener("click", () => {
        projectsPage.style.display = "flex"
    })
}

// Nav Users Btn --------------------------------------------------------------------------------
const usersBtn = document.getElementById("nav-users-btn")
const usersPage = document.getElementById("users-page")
if (usersBtn && usersPage) {
    usersBtn.addEventListener("click", () => {
        usersPage.style.display = "flex"
    })
}

