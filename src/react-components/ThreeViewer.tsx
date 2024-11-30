import * as React from "react"
import * as THREE from "three"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js"
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"


export function ThreeViewer() {

    React.useEffect (() => {
        const scene = new THREE.Scene
        const viewerContainer = document.getElementById("viewer-container") as HTMLElement
        console.log(viewerContainer)
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
    }, [])

// ThreeJS viewer



    return (
        <div id="viewer-container" style={{
            minWidth: 0,
            flexDirection: "column",
            height: "100%",
            width: "100%",
            display: "flex"
         }}
            // display="flex"
        />

    )
}