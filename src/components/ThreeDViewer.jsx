import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './ThreeDViewer.css';

const ThreeDViewer = ({ property }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Create house based on property type
    createHouse(scene, property);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls (basic mouse interaction)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };

    const onWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY * 0.01;
      camera.position.multiplyScalar(1 + delta * 0.1);
      camera.position.clampLength(5, 50);
    };

    currentMount.addEventListener('mousemove', onMouseMove);
    currentMount.addEventListener('wheel', onWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth camera rotation
      camera.position.x += (Math.sin(targetRotationY) * 10 - camera.position.x) * 0.05;
      camera.position.z += (Math.cos(targetRotationY) * 10 - camera.position.z) * 0.05;
      camera.position.y += (5 + targetRotationX * 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Cleanup
    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      if (currentMount) {
        currentMount.removeEventListener('mousemove', onMouseMove);
        currentMount.removeEventListener('wheel', onWheel);
      }
      renderer.dispose();
    };
  }, [property]);

  const createHouse = (scene, property) => {
    // Main house structure
    const houseGroup = new THREE.Group();

    // Scale based on property size
    const areaValue = parseInt(property?.area?.replace(/[^\d]/g, '') || '1000');
    const scale = Math.min(Math.max(areaValue / 1000, 0.8), 2); // Scale between 0.8 and 2

    // Base/Foundation
    const baseGeometry = new THREE.BoxGeometry(8 * scale, 0.5, 6 * scale);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.25;
    base.castShadow = true;
    houseGroup.add(base);

    // Main walls - height based on bedrooms
    const wallHeight = 3 + (property?.bedrooms || 1) * 0.5;
    const wallGeometry = new THREE.BoxGeometry(8 * scale, wallHeight, 6 * scale);
    
    // Wall color based on property type
    let wallColor = 0xF5DEB3; // Default beige
    if (property?.type === 'luxury') wallColor = 0xF0F8FF; // Alice blue for luxury
    if (property?.type === 'commercial') wallColor = 0xC0C0C0; // Silver for commercial
    
    const wallMaterial = new THREE.MeshLambertMaterial({ color: wallColor });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = wallHeight / 2 + 0.5;
    walls.castShadow = true;
    houseGroup.add(walls);

    // Roof - style based on property type
    let roofGeometry, roofMaterial;
    if (property?.type === 'commercial') {
      // Flat roof for commercial
      roofGeometry = new THREE.BoxGeometry(8.5 * scale, 0.3, 6.5 * scale);
      roofMaterial = new THREE.MeshLambertMaterial({ color: 0x696969 });
    } else {
      // Pitched roof for residential
      roofGeometry = new THREE.ConeGeometry(5 * scale, 2, 4);
      roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8B0000 });
    }
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = wallHeight + 1.5;
    if (property?.type !== 'commercial') {
      roof.rotation.y = Math.PI / 4;
    }
    roof.castShadow = true;
    houseGroup.add(roof);

    // Door
    const doorGeometry = new THREE.BoxGeometry(1.2, 2.5, 0.1);
    const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.75, 3.05);
    houseGroup.add(door);

    // Windows
    const windowGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.1);
    const windowMaterial = new THREE.MeshLambertMaterial({ color: 0x87CEEB });
    
    // Front windows
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(-2.5, 2.5, 3.05);
    houseGroup.add(window1);
    
    const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
    window2.position.set(2.5, 2.5, 3.05);
    houseGroup.add(window2);

    // Side windows
    const window3 = new THREE.Mesh(windowGeometry, windowMaterial);
    window3.position.set(4.05, 2.5, 0);
    houseGroup.add(window3);

    // Add property-specific features
    if (property?.amenities?.includes('Swimming Pool')) {
      // Pool
      const poolGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 16);
      const poolMaterial = new THREE.MeshLambertMaterial({ color: 0x0077BE });
      const pool = new THREE.Mesh(poolGeometry, poolMaterial);
      pool.position.set(6, 0.25, -4);
      scene.add(pool);
    }

    if (property?.amenities?.includes('Garden')) {
      // Trees/Garden
      for (let i = 0; i < 3; i++) {
        const treeGroup = new THREE.Group();
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1;
        treeGroup.add(trunk);
        
        // Leaves
        const leavesGeometry = new THREE.SphereGeometry(1);
        const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 2.5;
        treeGroup.add(leaves);
        
        treeGroup.position.set(-8 + i * 3, 0, -6 + i * 2);
        scene.add(treeGroup);
      }
    }

    if (property?.amenities?.includes('Parking')) {
      // Garage/Parking
      const garageGeometry = new THREE.BoxGeometry(4, 3, 4);
      const garageMaterial = new THREE.MeshLambertMaterial({ color: 0xC0C0C0 });
      const garage = new THREE.Mesh(garageGeometry, garageMaterial);
      garage.position.set(-6, 1.5, 0);
      garage.castShadow = true;
      scene.add(garage);
    }

    scene.add(houseGroup);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="threed-viewer">
      <div className="threed-header">
        <h3>3D Property View</h3>
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
      <div className="threed-container" ref={mountRef}>
        {isLoading && (
          <div className="threed-loading">
            <div className="loading-spinner"></div>
            <p>Loading 3D Model...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeDViewer;
