import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { Sidebar } from "./react-components/Sidebar"
import { ProjectsPage } from "./react-components/ProjectsPage"
import { ProjectDetailsPage } from "./react-components/ProjectDetailsPage"

import * as THREE from "three"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js"
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"


import { IProject, ProjectStatus, UserRole} from "./classes/Project"
import { ProjectsManager } from "./classes/ProjectsManager"
import { ToDo, IToDo, ToDoStatus } from "./classes/ToDo"

 
const rootElement = document.getElementById("app") as HTMLDivElement
const appRoot = ReactDOM.createRoot(rootElement)
appRoot.render(
    <>
    <Sidebar />
    <ProjectsPage />
    <ProjectDetailsPage />
    </>
)




// -----------------------------------------------------------------------------
function toggleModal(id: string, showclose: "show" | "close") {
    console.warn("I - toggleModal invoked")
    var modal = document.getElementById(id)
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
const projectsManager = new ProjectsManager()

// -----------------------------------------------------------------------------
console.log(projectsManager.list)
console.log("default project is created")

// New Project Btn -----------------------------------------------------------------------------
// const newProjectBtn = document.getElementById("new-project-btn")
// if (newProjectBtn) {
//     newProjectBtn.addEventListener("click", () => {
//         toggleModal("new-project-modal", "show")
//     })
//     const projectForm = document.getElementById("new-project-form")
//     if (projectForm && projectForm instanceof HTMLFormElement) {
//         projectForm.reset()
//     }
//     console.warn("toggle on newProjectButton is working !!")
// } else {
//     console.warn("New Projects Button was not found")
// }
// New Project Form Submit -----------------------------------------------------------------------------
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
                status: formData.get("status") as ProjectStatus,
                userRole: formData.get("userRole") as UserRole,
                finishDate: new Date (formData.get("finishDate") as string),
                cost: new Number(formData.get("cost")) as number,
                progress: new Number(formData.get("progress")) as number,
                todoList: [],
                id: formData.get("id") as string,
                initials: "" as string
            }
            console.warn(projectData)
            console.warn("PM - NewProjectSubmit projectData.finishDate - projectData.progress: ", projectData.finishDate, projectData.progress)

            try {
                new Date(projectData.finishDate)
                if (isNaN(projectData.finishDate.valueOf())) {
                    console.warn("PM - NewProjectSubmit projectData.finishDate: isNan")
                    console.warn("XXXXXXXXX:  finishDate valueOf is not a number")
                    const defDate = new Date(1979, 7, 3, 12)
                    projectData.finishDate = defDate
                    console.warn("PM - NewProjectSubmit finishDate after function: ", projectData.finishDate)
                } else {
                    console.warn("XXXXXXXXX:  finishDate valueOf is a number")
                } 
            } catch (err) {
                alert(err)
            }

            console.log("index.ts when form submit: ", projectData.finishDate, typeof projectData.finishDate)
            console.log(projectData.finishDate.valueOf())
            console.log(projectData.finishDate.valueOf.length)

            if (projectsManager && projectsManager.idInUse(projectData.id)) {
                console.warn("id provided is already in use, existing Project will be updated")
                projectsManager.updateProject(projectData)
                projectForm.reset()
                toggleModal("new-project-modal", "close")

                console.warn("submit is fired!")
                console.log(projectData)
                console.log(projectsManager.list)

                projectsManager.totalCost()
            } else {
                try {
                    projectsManager.newProject(projectData)
                    projectsManager.deleteDefaultProjectUI()
                    projectForm.reset()
                    toggleModal("new-project-modal", "close")
                    projectsManager.totalCost()

                    console.warn("submit is fired!")
                    console.log(projectData)
                    console.log(projectsManager.list)

                } catch (err) {
                    alert(err)
                }
            }
        } if (handler == "new-project-form-cancel-btn") {
            e.preventDefault()
            projectForm.reset()
            toggleModal("new-project-modal", "close")

            console.warn("cancel is fired!")
            console.log(projectsManager.list)
        }
    })
} else {
    console.warn("The projectForm wasn't found. Check the ID!")
}
// Edit Project Form Submit -----------------------------------------------------------------------------
const editProjectForm = document.getElementById("edit-project-form")
if (editProjectForm && editProjectForm instanceof HTMLFormElement) {
    editProjectForm.addEventListener("submit", (e) => {
        let submitter = e.submitter as HTMLElement
        let handler = submitter.id

        if (handler == "edit-project-form-submit-btn") {
            e.preventDefault()
            const formData = new FormData(editProjectForm)
            console.warn(formData)
            const projectData: IProject = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                cost: new Number(formData.get("cost")) as number,
                status: formData.get("status") as ProjectStatus,
                userRole: formData.get("userRole") as UserRole,
                finishDate: new Date (formData.get("finishDate") as string),
                id: formData.get("id") as string,
                initials: "" as string,
                progress: new Number (formData.get("progress")) as number,
                todoList: []

            }

            console.warn("projectData: ", projectData)
            console.warn("projectData.id: ", projectData.id)
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
            console.log("index.ts when edit form submit: ", projectData.finishDate, typeof projectData.finishDate )
            console.log(projectData.finishDate.valueOf())
            console.log(projectData.finishDate.valueOf.length)

            if (projectsManager && projectsManager.idInUse(projectData.id)) {
                console.warn("id provided is already in use, existing Project will be updated")
                projectsManager.updateProject(projectData)
                editProjectForm.reset()
                toggleModal("edit-project-modal", "close")
                projectsManager.totalCost()

                console.warn("submit is fired!")
                console.log(projectData)
                console.log(projectsManager.list)
            } else {
                try {
                    const project = projectsManager.newProject(projectData)
                    projectsManager.deleteDefaultProjectUI()
                    editProjectForm.reset()
                    toggleModal("edit-project-modal", "close")
                    projectsManager.totalCost()

                    console.warn("submit is fired!")
                    console.log(projectData)
                    console.log(projectsManager.list)
                } catch (err) {
                    alert(err)
                }
            }
        } if (handler == "edit-project-form-cancel-btn") {
            e.preventDefault()
            editProjectForm.reset()
            console.warn("cancel is fired!")
            toggleModal("edit-project-modal", "close")
            console.log(projectsManager.list)
        }
    })
} else {
    console.warn("The editProjectForm wasn't found. Check the ID!")
}
// New ToDo Btn -----------------------------------------------------------------------------
const newToDoBtn = document.getElementById("new-todo-btn")
if (newToDoBtn) {
    newToDoBtn.addEventListener("click", () => {toggleModal("new-todo-modal", "show")})
    console.warn("toggle on newToDoButton is working !!")
} else {
    console.warn("New Projects Button was not found")
}
// New ToDo Submit-----------------------------------------------------------------------------
const todoForm = document.getElementById("new-todo-form")
const projectDetails = document.getElementById("project-details")
if (projectDetails) {
const projectIdElement = projectDetails.querySelector("[data-project-info='id']")
    if (projectIdElement) {
    const projectId = projectIdElement.innerHTML as string
    }
    if (todoForm && todoForm instanceof HTMLFormElement) {
        todoForm.addEventListener("submit", (e) => {
            let submitter = e.submitter as HTMLElement
            let handler = submitter.id
            if(handler == "new-todo-form-submit-btn") {
                e.preventDefault()
                const formData = new FormData(todoForm)
                console.warn(formData)
                let todoData: IToDo = {
                    name: formData.get("name") as string,
                    description: formData.get("description") as string,
                    status: formData.get("status") as ToDoStatus,
                    deadline: new Date (formData.get("deadline") as string),
                    id: formData.get("id") as string,
                    relatedProject: formData.get("relatedProject") as string,
                }
                const projectDetails = document.getElementById("project-details")
                if (projectDetails) {
                    const projectIdElement = projectDetails.querySelector("[data-project-info='id']")
                    if (projectIdElement) {
                        const projectId = projectIdElement.innerHTML as string
                        if (projectId) {
                            todoData.relatedProject = projectId
                        }
                    }
                }
                console.warn("relatedProjectId: ",todoData.relatedProject)
                console.warn("todoData: ", todoData)
                console.warn("todoData.id: ", todoData.id)
                console.warn(todoData.deadline)
                try {
                    new Date(todoData.deadline)
                    if (isNaN(todoData.deadline.valueOf())) {
                        console.warn("XXXXXXXXX:  deadline valueOf is not a number")
                        const defDate = new Date(1979, 7, 3, 12)
                        todoData.deadline = defDate
                        console.warn(todoData.deadline)
                    } else {
                        console.warn("XXXXXXXXX:  deadline valueOf is a number")
                    } 
                } catch (err) {
                    alert(err)
                }
                try {
                    const project = projectsManager.getProject(todoData.relatedProject)
                    if (project) {
                        project.todoList.push(new ToDo(todoData))
                        todoForm.reset()
                        toggleModal("new-todo-modal", "close")
                        projectsManager.setDetailsPage(project)
                        console.log(project.todoList)
                    }
                } catch {
                    console.log("cannot execute push and toggle")
                }
                console.log("index.ts - when form submit: ", todoData.deadline, typeof todoData.deadline )
                console.log(todoData.deadline.valueOf())
                console.log(todoData.deadline.valueOf.length)
            }
            if (handler == "new-todo-form-cancel-btn") {
                e.preventDefault()
                todoForm.reset()
                console.warn("cancel is fired!")
                toggleModal("new-todo-modal", "close")
            }
        })
    } else {
    console.warn("The todoForm wasn't found. Check the ID!")
    }
}
// Edit ToDo Submit-----------------------------------------------------------------------------
const editTodoForm = document.getElementById("edit-todo-form")
if (projectDetails) {
    const todoIdElement = projectDetails.querySelector("[data-todo-info='id']")
    if (todoIdElement) {
        const projectId = todoIdElement.innerHTML as string
    }
}
if (editTodoForm && editTodoForm instanceof HTMLFormElement) {
    editTodoForm.addEventListener("submit", (e) => {
        let submitter = e.submitter as HTMLElement
        let handler = submitter.id
        if (handler == "edit-todo-form-submit-btn") {
            e.preventDefault()
            const formData = new FormData(editTodoForm)
            console.warn(formData)
            let todoData: IToDo = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                status: formData.get("status") as ToDoStatus,
                deadline: new Date (formData.get("deadline") as string),
                id: formData.get("id") as string,
                relatedProject: formData.get("relatedProject") as string,
            }
            console.warn("relatedProjectId: ",todoData.relatedProject)
            console.warn("todoData: ", todoData)
            console.warn("todoData.id: ", todoData.id)
            console.warn(todoData.deadline)
            try {
                new Date(todoData.deadline)
                if (isNaN(todoData.deadline.valueOf())) {
                    console.warn("XXXXXXXXX:  deadline valueOf is not a number")
                    const defDate = new Date(1979, 7, 3, 12)
                    todoData.deadline = defDate
                    console.warn(todoData.deadline)
                } else {
                    console.warn("XXXXXXXXX:  deadline valueOf is a number")
                } 
            } catch (err) {
                alert(err)
            }
            console.warn("I - Update todoData:", todoData)
            const newToDo = new ToDo (todoData)
            projectsManager.updateToDo(newToDo)
            toggleModal("edit-todo-modal", "close")
            let newToDoProject = projectsManager.getProject(newToDo.relatedProject)
            projectsManager.setDetailsPage(newToDoProject)

            console.log("index.ts - when form submit: ", todoData.deadline, typeof todoData.deadline )
            console.log(todoData.deadline.valueOf())
            console.log(todoData.deadline.valueOf.length)
        }
        if (handler == "edit-todo-form-cancel-btn") {
            e.preventDefault()
            editTodoForm.reset()

            console.warn("cancel is fired!")
            toggleModal("edit-todo-modal", "close")
            projectsManager.setDetailsPage
        }
    })
} else {
    console.warn("The todoForm wasn't found. Check the ID!")
}
// Export projects btn -----------------------------------------------------------------------------
// const exportProjectsBtn = document.getElementById("export-projects-btn")
// if (exportProjectsBtn) {
//     exportProjectsBtn.addEventListener("click", () => {
//         projectsManager.exportToJSON()
//     })
// }
// Import projects btn -----------------------------------------------------------------------------
// const importProjectsBtn = document.getElementById("import-projects-btn")
// if (importProjectsBtn) {
//     importProjectsBtn.addEventListener("click", () => {
//         projectsManager.importFromJSON()
//     })
//     console.log(projectsManager.list)
// }
// CleanPages -----------------------------------------------------------------------------
function cleanPages() {
    console.warn("I - cleanPages invoked")
    const projectsPage = document.getElementById("projects-page")
    const usersPage = document.getElementById("users-page")
    const projectDetailsPage = document.getElementById("project-details")
    if (projectsPage && usersPage && projectDetailsPage) {
        projectsPage.style.display = "none"
        usersPage.style.display = "none"
        projectDetailsPage.style.display = "none"
    }
}
// Nav Projects Btn -----------------------------------------------------------------------------
const projectsBtn = document.getElementById("nav-projects-btn")
const projectsPage = document.getElementById("projects-page")
if (projectsBtn && projectsPage) {
    projectsBtn.addEventListener("click", () => {
        cleanPages()
        projectsPage.style.display = "flex"
    })
}
// Nav Users Btn -----------------------------------------------------------------------------
const usersBtn = document.getElementById("nav-users-btn")
const usersPage = document.getElementById("users-page")
if (usersBtn && usersPage) {
    usersBtn.addEventListener("click", () => {
        cleanPages()
        usersPage.style.display = "flex"
    })
}
// Edit Project Btn -----------------------------------------------------------------------------
const editBtn = document.getElementById("edit-project-btn")
const projectDetailsPage = document.getElementById("project-details")
if (editBtn) {
    editBtn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("I've listened the edit button")
        const detailsPage = document.getElementById("project-details")
        if (!detailsPage) {return}
        const name = detailsPage.querySelector("[data-project-info='name']")
        const description = detailsPage.querySelector("[data-project-info='description']")
        const cost = detailsPage.querySelector("[data-project-info='cost']")
        const userRole = detailsPage.querySelector("[data-project-info='userRole']")
        const status = detailsPage.querySelector("[data-project-info='status']")
        const finishDate = detailsPage.querySelector("[data-project-info='finishDate']")
        const id = detailsPage.querySelector("[data-project-info='id']")
        const initials = detailsPage.querySelector("[data-project-info='initials']")
        const progress = detailsPage.querySelector("[data-project-info='progress']")
        let progressNumber: number = 0
        if (progress && progress.innerHTML) {
            console.log("I - editProjectBtn - progress.innerHTML: ", progress.innerHTML)
            progressNumber = Number.parseInt(progress.innerHTML)
        }
        console.warn("finishDate: ",finishDate)
        console.warn("finishDate.innerHTML: ", finishDate?.innerHTML)

        const todoList = []

        const setDetailsPageData: IProject = {
            name: name?.innerHTML as string,
            description: description?.innerHTML as string,
            cost: Number(cost?.innerHTML) as number,
            status: status?.innerHTML as ProjectStatus,
            userRole: userRole?.innerHTML as UserRole,
            finishDate: new Date (finishDate?.innerHTML as string),
            id: id?.innerHTML as string,
            initials: initials?.innerHTML as string,
            progress: progressNumber as number,
            todoList: todoList as ToDo []
        }
        console.log("setDetailsPageData: ",setDetailsPageData)
        if (name && projectDetailsPage && projectsPage && editProjectForm) { 
            console.log(name)
            projectDetailsPage.style.display = "none"
            projectsPage.style.display = "flex"
            toggleModal("edit-project-modal", "show")
            let formId = editProjectForm.querySelector("[data-project-info='id']")
            if (id && formId instanceof HTMLInputElement) {
                let idValue = id.innerHTML
                if (formId) { formId.value = idValue }
            }
            let formName = editProjectForm.querySelector("[data-project-info='name']")
            if (name && formName instanceof HTMLInputElement) {
                let nameValue = name.innerHTML
                if (formName) { formName.value = nameValue }
            }
            let formDescription = editProjectForm.querySelector("[data-project-info='description']")
            if (description && formDescription instanceof HTMLTextAreaElement) {
                let descriptionValue = description.innerHTML
                if (formDescription) { formDescription.textContent = descriptionValue }
            }
            let formCost = editProjectForm.querySelector("[data-project-info='cost']")
            if (cost && formCost instanceof HTMLInputElement) {
                let costValue = cost.innerHTML
                if (formCost) { formCost.value = costValue }
            }
            let formProgress = editProjectForm.querySelector("[data-project-info='progress']")
            if (progress && formProgress instanceof HTMLInputElement) {
                let progressValue = progress.innerHTML
                if (formProgress) { formProgress.value = progressValue }
            }
            let formUserRole = editProjectForm.querySelector("[data-project-info='userRole']")
            if (userRole && formUserRole instanceof HTMLSelectElement) {
                let userRoleValue = userRole.innerHTML
                if (formUserRole) { formUserRole.value = userRoleValue }
            }
            let formStatus = editProjectForm.querySelector("[data-project-info='status']")
            if (status && formStatus instanceof HTMLSelectElement) {
                let statusValue = status.innerHTML
                if (formStatus) { formStatus.value = statusValue }
            }
            let formFinishDate = editProjectForm.querySelector("[data-project-info='finishDate']")
            if (finishDate && formFinishDate instanceof HTMLInputElement) {
                let finishDate2 = new Date(finishDate.innerHTML)
                const finishDate3 = finishDate2.toISOString().split('T')[0];
                console.warn("finishDate3: ", finishDate3)
                console.warn("finishDate2: ",finishDate2)
                console.warn("finishDate2.toLocaleDateString: ",finishDate2.toLocaleDateString("es-ES"))
                formFinishDate.value = finishDate3
            }
        }
    })
    console.log("I'm not listening nothing")
}
// Delete Project Btn -----------------------------------------------------------------------------
const deleteProjectBtn = document.getElementById("delete-project-btn")
if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener("click", () => {
        console.log("I've listened the delete project button")
        const detailsPage = document.getElementById("project-details")
        if (!detailsPage) {return}
        const id = detailsPage.querySelector("[data-project-info='id']")?.innerHTML as string
        console.log(id)
        console.log(projectsManager.list)
        projectsManager.deleteProjectFromList(id)
        projectsManager.deleteProjectUI(id)
        toggleModal("new-project-modal", "close")
        if (projectDetailsPage && projectsPage) {
            projectDetailsPage.style.display = "none"
            projectsPage.style.display = "flex"
        }
    })
} else {
    console.log("I reach de deleteProject")
}

// ThreeJS viewer
const scene = new THREE.Scene
const viewerContainer = document.getElementById("viewer-container") as HTMLElement
const containerDimensions = viewerContainer.getBoundingClientRect()
const aspectRatio = containerDimensions.width / containerDimensions.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer
viewerContainer.append(renderer.domElement)
renderer.setSize(containerDimensions.width, containerDimensions.height)

window.addEventListener("resize", () => {
    const containerDimensions = viewerContainer.getBoundingClientRect()
    renderer.setSize(containerDimensions.width, containerDimensions.height)
    const aspectRatio = containerDimensions.width / containerDimensions.height
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
})


const boxGeometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial()
const cube = new THREE.Mesh(boxGeometry, material)

const directionalLight = new THREE.DirectionalLight()
const directionalLight2 = new THREE.DirectionalLight()
const spotLight = new THREE.SpotLight()
const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 40

scene.add(directionalLight, directionalLight2, ambientLight, spotLight)

const cameraControls = new OrbitControls(camera, viewerContainer)


function renderScene() {
    renderer.render(scene, camera)
    requestAnimationFrame(renderScene)
}

renderScene()

const axes = new THREE.AxesHelper()
const grid = new THREE.GridHelper()
const dirLight = new THREE.DirectionalLightHelper(directionalLight)
const dirLight2 = new THREE.DirectionalLightHelper(directionalLight2)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)

grid.material.transparent = true
grid.material.opacity = 0.4
grid.material.color = new THREE.Color("#808080")
scene.add(axes, grid, dirLight, dirLight2, spotLightHelper)

const gui = new GUI()
const cubeControls = gui.addFolder("cube")
cubeControls.add(cube.position, "x", -10, 10, 1) 
cubeControls.add(cube.position, "y", -10, 10, 1)
cubeControls.add(cube.position, "z", -10, 10, 1)
cubeControls.add(cube, "visible")
cubeControls.addColor(cube.material, "color")

const lightControls = gui.addFolder("directionalLight",)
lightControls.add(directionalLight.position, "x", -1000, 1000, 1)
lightControls.add(directionalLight.position, "y", -1000, 1000, 1)
lightControls.add(directionalLight.position, "z", -1000, 1000, 1)
lightControls.add(directionalLight, "intensity", 0, 100 , 0.01)
lightControls.addColor(directionalLight, "color")

const lightControls2 = gui.addFolder("directionalLight2",)
lightControls2.add(directionalLight2.position, "x", -1000, 1000, 1)
lightControls2.add(directionalLight2.position, "y", -1000, 1000, 1)
lightControls2.add(directionalLight2.position, "z", -1000, 1000, 1)
lightControls2.add(directionalLight2, "intensity", 0, 100, 0.01)
lightControls2.addColor(directionalLight2, "color")

const spotLightControls = gui.addFolder("spotLight",)
lightControls2.add(spotLight.position, "x", -1000, 1000, 1)
lightControls2.add(spotLight.position, "y", -1000, 1000, 1)
lightControls2.add(spotLight.position, "z", -1000, 1000, 1)
lightControls2.add(spotLight, "intensity", 0, 100, 0.01)
lightControls2.addColor(spotLight, "color")


const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()



// mtlLoader.load("../Assets/Gear/Gear1.mtl", (materials) => {
//     materials.preload()
//     objLoader.setMaterials(materials)
//     objLoader.load("../Assets/Gear/Gear1.obj", (mesh) => {
//         scene.add(mesh)
//     })
// })

const gltfLoader = new GLTFLoader()

gltfLoader.load(
    "../Assets/glTF/bismarckturm-jena-3d-model/scene.gltf",
    function (gltf) {
        scene.add(gltf.scene);
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    function (error) {
        console.log( 'An error happened' );
    }
)
