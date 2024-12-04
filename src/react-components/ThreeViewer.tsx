import * as React from "react"
import * as THREE from "three"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js"
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"


export function ThreeViewer() {

    let scene: THREE.Scene | null
    let mesh: THREE.Object3D | null
    let renderer: THREE.WebGLRenderer | null
    let cameraControls: OrbitControls | null
    let camera: THREE.PerspectiveCamera | null
    let axes: THREE.AxesHelper | null
    let grid: THREE.GridHelper | null
    let directionalLight: THREE.DirectionalLight | null
    let directionalLight2: THREE.DirectionalLight | null
    let spotLight: THREE.SpotLight | null
    let ambientLight: THREE.AmbientLight | null
    let mtlLoader: MTLLoader | null
    let objLoader: OBJLoader | null

    const setViewer = () => {
        scene = new THREE.Scene
        const viewerContainer = document.getElementById("viewer-container") as HTMLElement
        console.log(viewerContainer)
        const containerDimensions = viewerContainer.getBoundingClientRect()
        const aspectRatio = containerDimensions.width / containerDimensions.height
        camera = new THREE.PerspectiveCamera(75, aspectRatio)
        camera.position.z = 5
        
        renderer = new THREE.WebGLRenderer
        viewerContainer.append(renderer.domElement)
        renderer.setSize(containerDimensions.width, containerDimensions.height)
        
        window.addEventListener("resize", () => {
            const containerDimensions = viewerContainer.getBoundingClientRect()
            if(!renderer) return
            renderer.setSize(containerDimensions.width, containerDimensions.height)
            const aspectRatio = containerDimensions.width / containerDimensions.height

            if(!camera) return
            camera.aspect = aspectRatio
            camera.updateProjectionMatrix()
        })
        
        directionalLight = new THREE.DirectionalLight()
        directionalLight2 = new THREE.DirectionalLight()
        spotLight = new THREE.SpotLight()
        ambientLight = new THREE.AmbientLight()
        ambientLight.intensity = 40
        
        scene.add(directionalLight, directionalLight2, ambientLight, spotLight)
        
        cameraControls = new OrbitControls(camera, viewerContainer)
        
        
        function renderScene() {
            if (!renderer || !scene || !camera) return
            renderer.render(scene, camera)
            requestAnimationFrame(renderScene)
        }
        
        renderScene()
        
        axes = new THREE.AxesHelper()
        grid = new THREE.GridHelper()
        const dirLight = new THREE.DirectionalLightHelper(directionalLight)
        const dirLight2 = new THREE.DirectionalLightHelper(directionalLight2)
        const spotLightHelper = new THREE.SpotLightHelper(spotLight)
        
        grid.material.transparent = true
        grid.material.opacity = 0.4
        grid.material.color = new THREE.Color("#808080")
        scene.add(axes, grid, dirLight, dirLight2, spotLightHelper)
        
        objLoader = new OBJLoader()
        mtlLoader = new MTLLoader()
        
        
        
        mtlLoader.load("../Assets/Gear/Gear1.mtl", (materials) => {
            materials.preload()
            if (!objLoader) return
            objLoader.setMaterials(materials)
            objLoader.load("../Assets/Gear/Gear1.obj", (object) => {
                if (!scene) return
                scene.add(object)
                mesh = object
            })
        })
        
        const gltfLoader = new GLTFLoader()
        
        // gltfLoader.load(
        //     "../Assets/glTF/bismarckturm-jena-3d-model/scene.gltf",
        //     function (gltf) {
        //         scene.add(gltf.scene);
        //         gltf.animations;
        //         gltf.scene;
        //         gltf.scenes;
        //         gltf.cameras;
        //         gltf.asset;
        //     },
        //     function (xhr) {
        //         console.log((xhr.loaded / xhr.total * 100) + "% loaded");
        //     },
        //     function (error) {
        //         console.log( 'An error happened' );
        //     }
        // )

    }

    React.useEffect (() => {
        setViewer()
        return () => {
            mesh?.removeFromParent()
            mesh?.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()
                    child.material.dispose()
                }
            })
            mesh = null
        }
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