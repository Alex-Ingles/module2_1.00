import { Project, IProject, UserRole, ProjectStatus } from "./Project"

export class ProjectsManager {
    list: Project[] = []
    ui: HTMLElement
// -----------------------------------------------------------------------------
constructor(container: HTMLElement) {
        this.ui = container
        this.setDefaultProjectUI()
    }
    setDefaultProjectUI() {
        const defaultData: IProject = {
            name: "default-project" as string,
            description: "Default description" as string,
            cost: 0 as number,
            status: "Default status" as ProjectStatus,
            userRole: "Default userRole" as UserRole,
            finishDate: new Date ("finishDate" as string),
            progress: 50 as number,
            initials: "DP" as string,
            id: "defaultId" as string,

        }
        const defaultProject = new Project(defaultData)
        this.ui.append(defaultProject.ui)
        this.list.push(defaultProject)
        console.warn("Default Project is created")
        return defaultProject
    }
// -----------------------------------------------------------------------------
deleteDefaultProjectUI() {
    console.log("I reach deleteDefault function")
    const child = document.getElementById("default-project")
    const parent = document.getElementById("projects-list")
    if (child && parent) {
        console.log("parent & child exists")
        parent.removeChild(child)
        this.list.shift()
        console.log("child removed", child)
        return(document)
    }
}
// -----------------------------------------------------------------------------
newProject(data: IProject) {
    const projectNames = this.list.map((project) => {
        return project.name
    })
    console.log("ProjectsManager.newProject -> Project names list before newProject:")
    console.log(projectNames)
    const nameInUse = projectNames.includes(data.name)
    if (data.name.length < 6){
        throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    }
    if (nameInUse) {
        throw new Error(`A project with the name "${data.name}" already exists`)
    }
    const child = document.getElementById("default-project")
    console.log(child)

    const project = new Project(data)
    project.ui.addEventListener("click", () => {
        const projectsPage = document.getElementById("projects-page")
        const detailsPage = document.getElementById("project-details")
        if (!projectsPage || !detailsPage) {return}
        console.log("pages exists")
        projectsPage.style.display = "none"
        detailsPage.style.display = "flex"
        this.setDetailsPage(project)
    })
    this.ui.append(project.ui)
    this.list.push(project)
    console.warn("New Project is created")
    this.deleteDefaultProjectUI()
}
// -----------------------------------------------------------------------------
private setDetailsPage(project: Project) {
    const detailsPage = document.getElementById("project-details")
    if (!detailsPage) {return}
    const id = detailsPage.querySelector("[data-project-info='id']")
    if (id) {id.textContent = project.id}
    const name = detailsPage.querySelector("[data-project-info='name']")
    if (name) { name.textContent = project.name}
    const name2 = detailsPage.querySelector("[data-project-info='name2']")
    if (name2) { name2.textContent = project.name}
    const initials = detailsPage.querySelector("[data-project-info='initials']")
    if (initials) { initials.textContent = project.initials}

    const description = detailsPage.querySelector("[data-project-info='description']")
    if (description) { description.textContent = project.description}
    const description2 = detailsPage.querySelector("[data-project-info='description2']")
    if (description2) { description2.textContent = project.description}

    const status = detailsPage.querySelector("[data-project-info='status']")
    if (status) { status.textContent = project.status}
    const cost = detailsPage.querySelector("[data-project-info='cost']")
    const costAsString = project.cost.toString()
    if (cost && costAsString) { cost.textContent = costAsString}
    const userRole = detailsPage.querySelector("[data-project-info='userRole']")
    if (userRole) { userRole.textContent = project.userRole}
    const finishDate = detailsPage.querySelector("[data-project-info='finishDate']")
    const finishDateAsString = project.finishDate.toString()
    if (finishDate) { finishDate.textContent = finishDateAsString}

    const progress = detailsPage.querySelector("[data-project-info='progress']")
    const progressAsString = project.progress.toString()
    if (progress && progressAsString) {
        progress.textContent = progressAsString + "%"
        const bar = document.getElementById("project-progress-bar")
        const progressPercent = project.progress + "%"
        if (bar) {
        bar.style.width = `"${progressPercent}"`
        // bar.style = `"${progressPercent}"`

        console.warn("progress percent: ",progressPercent)
        }
    }
}
// -----------------------------------------------------------------------------
editProject(id: string) {
    this.getProject(id)
    console.log(this.getProject)
}
// -----------------------------------------------------------------------------
getProject(id: string) {
    const project = this.list.find((project) => {
        return project.id === id
    })
    return project
}
// -----------------------------------------------------------------------------
getProjectbyName(name: string) {
    const project = this.list.find((project) => {
        return project.name === name
    })
    return project
}
// -----------------------------------------------------------------------------
deleteProject(id: string) {
    const project = this.getProject(id)
    if (!project) { 
        console.log("Id provided does'nt match with any id of projectsList")
        return }
    project.ui.remove()
    const remaining = this.list.filter((project) => {
        return project.id !== id
    })
    this.list = remaining
}
// -----------------------------------------------------------------------------
totalCost() {
    const total = this.list.reduce((total, project) => total + project.cost, 0)
    console.log(total)
    return total
}
// -----------------------------------------------------------------------------
exportToJSON(fileName: string = "projects") {
    const json = JSON.stringify(this.list, null, 2)
    const blob = new Blob([json], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
}
// -----------------------------------------------------------------------------
importFromJSON() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const json = reader.result
        if (!json) { return }
        const projects: IProject[] = JSON.parse(json as string)
        for (const project of projects) {
            try {
                this.newProject(project)
            }
            catch (error) {
                alert(error)
            }
        }

    })
    input.addEventListener('change', () => {
        const filesList = input.files
        if (!filesList) { return }
        reader.readAsText(filesList[0])
    })
    input.click()
}
}
