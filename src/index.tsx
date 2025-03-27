import * as React from "react"
import * as ReactDOM from "react-dom/client"
import * as Router from "react-router-dom"
import { Sidebar } from "./react-components/Sidebar"
import { ProjectsPage } from "./react-components/ProjectsPage"
import { ProjectDetailsPage } from "./react-components/ProjectDetailsPage" 

import { ProjectsManager } from "./classes/ProjectsManager"

console.warn("Starting...")
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
                <Router.Route path="/project/:id" element={<ProjectDetailsPage projectsManager={projectsManager}/>} />
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

