import { IProject, ProjectStatus, UserRole} from "./classes/Project"
import { ProjectsManager } from "./classes/ProjectsManager"
// -----------------------------------------------------------------------------
function toggleModal(id: string, showclose: "show" | "close") {
    const modal = document.getElementById(id)
    if (modal && modal instanceof HTMLDialogElement) {
        if (showclose == "show") {
            modal.showModal()
        } else if (showclose == "close") {
            modal.close()
        }
    } else {
    console.warn("The provided modal wasn't found. ID: ", id)
    }
}
// -----------------------------------------------------------------------------
const projectListUI = document.getElementById("projects-list") as HTMLElement
const projectsManager = new ProjectsManager(projectListUI)
// -----------------------------------------------------------------------------
console.log(projectsManager.list)
console.log("default project is created")
// -----------------------------------------------------------------------------
const newProjectBtn = document.getElementById("new-project-btn")
if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => {toggleModal("new-project-modal", "show")})
    console.warn("toggle on newProjectButton is working !!")
} else {
    console.warn("New Projects Button was not found")
}
// -----------------------------------------------------------------------------
const projectForm = document.getElementById("new-project-form")
if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (e) => {
        let submitter = e.submitter as HTMLElement
        let handler = submitter.id

        if(handler == "new-project-form-submit-btn") {
            e.preventDefault()
            const formData = new FormData(projectForm)
            console.warn(formData)
            const projectData: IProject = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                cost: formData.get("cost") as number,
                status: formData.get("status") as ProjectStatus,
                userRole: formData.get("userRole") as UserRole,
                finishDate: new Date (formData.get("finishDate") as string),
                initials: "" as string,
                progress: 0 as number
            }
            console.warn(projectData.finishDate)
            try {
                new Date(projectData.finishDate)
                if(isNaN(projectData.finishDate.valueOf())) {
                    console.warn("XXXXXXXXX:  finishDate valueOf is not a number")
                    const defDate = new Date(1979, 7, 3, 12)
                    projectData.finishDate = defDate
                    console.warn(projectData.finishDate)

                } else {
                    console.warn("XXXXXXXXX:  finishDate valueOf is a number")
                } 
            }
            catch (err) {
                alert(err)
                // const defDate = new Date(1979, 7, 3, 12)
                // projectData.finishDate = defDate
                // console.log(projectData.finishDate)
            }
            console.log("index.ts when form submit: ", projectData.finishDate, typeof projectData.finishDate )
            console.log(projectData.finishDate.valueOf())
            console.log(projectData.finishDate.valueOf.length)
            
            // if (typeof projectData.finishDate !== "object") {
            //     const defDate = new Date(1979, 7, 3, 12)
            //     projectData.finishDate = defDate
            //     console.warn("solved!: ",projectData.finishDate)
            // }
    // }
            console.log("index.ts when form submit: ", projectData.finishDate, typeof projectData.finishDate )
            console.log(projectData.finishDate.valueOf())
            console.log(projectData.finishDate.valueOf.length)

            // if (typeof projectData.finishDate.valueOf = "NaN") {
            //     console.log("Value of date greter than 0")
            //     }

            try {
                const project = projectsManager.newProject(projectData)
                projectsManager.deleteDefaultProjectUI()
    
                projectForm.reset()
                toggleModal("new-project-modal", "close")
    
                console.warn("submit is fired!")
                console.log(projectData)
                console.log(projectsManager.list)
                projectsManager.totalCost()
                
            } catch (err) {
                alert(err)
            }
            
        } else if(handler == "new-project-form-cancel-btn") {
            e.preventDefault()
            projectForm.reset()
            console.warn("cancel is fired!")
            toggleModal("new-project-modal", "close")
            console.log(projectsManager.list)
        }
    })

} else {
    console.warn("The projectForm wasn't found. Check the ID!")
}
// -----------------------------------------------------------------------------
const exportProjectsBtn = document.getElementById("export-projects-btn")
if (exportProjectsBtn) {
    exportProjectsBtn.addEventListener("click", () => {
        projectsManager.exportToJSON()
    })
}
// -----------------------------------------------------------------------------
const importProjectsBtn = document.getElementById("import-projects-btn")
if (importProjectsBtn) {
    importProjectsBtn.addEventListener("click", () => {
        projectsManager.importFromJSON()
        // console.log(projectsManager.list)
    })
    console.log(projectsManager.list)
}
// -----------------------------------------------------------------------------
function cleanPages() {
    const projectsPage = document.getElementById("projects-page")
    const usersPage = document.getElementById("users-page")
    const projectDetailsPage = document.getElementById("project-details")
    if (projectsPage && usersPage && projectDetailsPage) {
        projectsPage.style.display = "none"
        usersPage.style.display = "none"
        projectDetailsPage.style.display = "none"
    }
}
// -----------------------------------------------------------------------------
const projectsBtn = document.getElementById("nav-projects-btn")
const projectsPage = document.getElementById("projects-page")
    if (projectsBtn && projectsPage) {
        projectsBtn.addEventListener("click", () => {
            cleanPages()
            projectsPage.style.display = "flex"
        })
    }
// -----------------------------------------------------------------------------
const usersBtn = document.getElementById("nav-users-btn")
const usersPage = document.getElementById("users-page")
    if (usersBtn && usersPage) {
        usersBtn.addEventListener("click", () => {
            cleanPages()
            usersPage.style.display = "flex"
        })
}
// -----------------------------------------------------------------------------
// const editBtn = document.getElementById("edit-project-btn")
// // const projectForm = document.getElementById("users-page")
//     if (editBtn) {
//         editBtn.addEventListener("click", () => {
//             // cleanPages()
//             toggleModal(projectModal, show)
//             usersPage.style.display = "flex"
//         })
// }