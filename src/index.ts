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
            }
            console.log("index.ts when form submit: ", projectData.finishDate, typeof projectData.finishDate )
            console.log(projectData.finishDate.valueOf())
            console.log(projectData.finishDate.valueOf.length)
            

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

const editBtn = document.getElementById("edit-project-btn")
const projectDetailsPage = document.getElementById("project-details")

    if (editBtn) {
        editBtn.addEventListener("click", () => {
            console.log("I've listened the edit button")
            const detailsPage = document.getElementById("project-details")
            if (!detailsPage) {return}
            const name = detailsPage.querySelector("[data-project-info='name']")
            const description = detailsPage.querySelector("[data-project-info='description']")
            const cost = detailsPage.querySelector("[data-project-info='cost']")
            const userRole = detailsPage.querySelector("[data-project-info='userRole']")
            const status = detailsPage.querySelector("[data-project-info='status']")
            const finishDate = detailsPage.querySelector("[data-project-info='finishDate']")
            console.warn("finishDate: ",finishDate)
            console.warn("finishDate.innerHTML: ", finishDate?.innerHTML)

            if (name && projectDetailsPage && projectsPage && projectForm) { 
                console.log(name)
                projectDetailsPage.style.display = "none"
                projectsPage.style.display = "flex"
                toggleModal("new-project-modal", "show")

                let formName = projectForm.querySelector("[data-project-info='name']")
                if (name && formName instanceof HTMLInputElement) {
                    let nameValue = name.innerHTML
                    if (formName) { formName.value = nameValue }
                }
                let formDescription = projectForm.querySelector("[data-project-info='description']")
                if (description && formDescription instanceof HTMLTextAreaElement) {
                    let descriptionValue = description.innerHTML
                    if (formDescription) { formDescription.textContent = descriptionValue }
                }
                let formCost = projectForm.querySelector("[data-project-info='cost']")
                if (cost && formCost instanceof HTMLInputElement) {
                    let costValue = cost.innerHTML
                    if (formCost) { formCost.value = costValue }
                }
                let formUserRole = projectForm.querySelector("[data-project-info='userRole']")
                if (userRole && formUserRole instanceof HTMLSelectElement) {
                    let userRoleValue = userRole.innerHTML
                    if (formUserRole) { formUserRole.value = userRoleValue }
                }
                let formStatus = projectForm.querySelector("[data-project-info='status']")
                if (status && formStatus instanceof HTMLSelectElement) {
                    let statusValue = status.innerHTML
                    if (formStatus) { formStatus.value = statusValue }
                }
                let formFinishDate = projectForm.querySelector("[data-project-info='finishDate']")
                if (finishDate && formFinishDate instanceof HTMLInputElement) {
                    let finishDate2 = new Date(finishDate.innerHTML)
                    const finishDate3 = finishDate2.toISOString().split('T')[0];
                    console.warn("finishDate3: ", finishDate3)
                    console.warn("finishDate2: ",finishDate2)
                    console.warn("finishDate2.toLocaleDateString: ",finishDate2.toLocaleDateString)
                    formFinishDate.value = finishDate3
                }


            }
        })
        console.log("I'm not listening nothing")
    }