import { IProject, ProjectStatus, UserRole} from "./classes/Project"
import { ProjectsManager } from "./classes/ProjectsManager"


// function showModal(id: string) {
//     const modal = document.getElementById(id)
//     if(modal && modal instanceof HTMLDialogElement) {
//     modal.showModal()
//     } else {
//     console.warn("The provided modal wasn't found. ID: ", id)
//     }
// }

// function closeModal(id: string) {
//     const modal = document.getElementById(id)
//     if(modal && modal instanceof HTMLDialogElement) {
//     modal.close()
//     } else {
//     console.warn("The provided modal wasn't found. ID: ", id)
//     }
// }

// ---------------------------------------------------------------------------------
// 1. Toggle ok without comments - to be shared
// ---------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------
// Toggle ok with comments
// ---------------------------------------------------------------------------------


// function toggleModal(id: string, showclose: "show" | "close") {
//     const modal = document.getElementById(id)
//     if (modal && modal instanceof HTMLDialogElement) {
//         if (showclose == "show") {
//             modal.showModal()
//             console.warn("Toggle shows")
//         } else if (showclose == "close") {
//             modal.close()
//             console.warn("Toggle closes")
//         } else {
//             console.warn("Not finding nor show or close argument")
//         }
//     } else {
//     console.warn("The provided modal wasn't found. ID: ", id)
//     }
// }

// ------------------------------------------------------------------------------------

const projectListUI = document.getElementById("projects-list") as HTMLElement
const projectsManager = new ProjectsManager(projectListUI)


console.log(projectsManager.list)
console.log("default project is created")
    // const defaultProject: IProject = projectsManager.defaultProject()



// Al clickar el botón New Project lanza el toggle, si no error

const newProjectBtn = document.getElementById("new-project-btn")
if (newProjectBtn) {
    // newProjectBtn.addEventListener("click", () => {toggleModal("new-project-modal", "show")})
    newProjectBtn.addEventListener("click", () => {toggleModal("new-project-modal", "show")})
    console.warn("toggle on newProjectButton is working !!")
} else {
    console.warn("New Projects Button was not found")
}

// -----------------------------------------------------------------------------
// PROJECT FORM BUTTONS w/Submitter & Handler constants

// const projectForm = document.getElementById("new-project-form")
// if (projectForm && projectForm instanceof HTMLFormElement) {
//     projectForm.addEventListener("submit", (e) => {
//         let submitter = e.submitter as HTMLElement
//         let handler = submitter.id

//         if(submitter && handler == "new-project-form-submit-btn") {
//             e.preventDefault()
//             const formData = new FormData(projectForm)
//             const projectData: IProject = {
//                 name: formData.get("name") as string,
//                 description: formData.get("description") as string,
//                 status: formData.get("status") as ProjectStatus,
//                 userRole: formData.get("userRole") as UserRole,
//                 finishDate: new Date (formData.get("finishDate") as string)
//             }
//             const project = projectsManager.newProject(projectData)
//             projectsManager.deleteDefaultProjectUI()

//             projectForm.reset()
//             toggleModal("new-project-modal", "close")

//             console.warn("submit is fired!")
//             console.log(projectData)
//             console.log(projectsManager.list)

//         } else if(submitter && handler == "new-project-form-cancel-btn") {
//             e.preventDefault()
//             projectForm.reset()
//             console.warn("cancel is fired!")
//             // toggleModal("new-project-modal", "close")
//             toggleModal("new-project-modal", "close")
//             console.log(projectsManager.list)

//         }
//     })

// } else {
//     console.warn("The projectForm wasn't found. Check the ID!")
// }


// -----------------------------------------------------------------------------
// 2. PROJECT FORM BUTTONS w/Submitter & Handler constants
// 3.2. Invoking deleteDefaultProjectUI when New Project is submitted.
// -----------------------------------------------------------------------------

const projectForm = document.getElementById("new-project-form")
if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (e) => {
        let submitter = e.submitter as HTMLElement
        let handler = submitter.id

        if(handler == "new-project-form-submit-btn") {
            e.preventDefault()
            const formData = new FormData(projectForm)
            const projectData: IProject = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                cost: formData.get("cost") as number,
                status: formData.get("status") as ProjectStatus,
                userRole: formData.get("userRole") as UserRole,
                finishDate: new Date (formData.get("finishDate") as string),
            }
        
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

const exportProjectsBtn = document.getElementById("export-projects-btn")
if (exportProjectsBtn) {
    exportProjectsBtn.addEventListener("click", () => {
        projectsManager.exportToJSON()
    })
}



/* is the same thing to write, in the if/else statement:
We can write if (newProjectBtn !== null) that means if newProjectBtn is not null.
Or we can write the same thing by: if (newProjectBtn) it means the same thing, if newProjectBtn exists.
*/
