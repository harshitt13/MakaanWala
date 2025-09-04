import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDViewer.css';

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    React.createElement(Html, { center: true },
      React.createElement('div', { className: 'loader' },
        React.createElement('div', { className: 'loader-text' }, `Loading 3D Model... ${progress.toFixed(0)}%`),
        React.createElement('div', { className: 'loader-bar' },
          React.createElement('div', { 
            className: 'loader-progress', 
            style: { width: `${progress}%` } 
          })
        )
      )
    )
  );
}

// Modern House Model Component using Three.js primitives
function ModernHouse({ property }) {
  const groupRef = useRef();
  
  // Create a modern house based on property data
  const createModernHouse = () => {
    const group = new THREE.Group();
    
    // Main structure
    const mainGeometry = new THREE.BoxGeometry(6, 3, 4);
    const mainMaterial = new THREE.MeshStandardMaterial({ 
      color: '#ffffff',
      roughness: 0.7,
      metalness: 0.1
    });
    const mainStructure = new THREE.Mesh(mainGeometry, mainMaterial);
    mainStructure.position.y = 1.5;
    mainStructure.castShadow = true;
    mainStructure.receiveShadow = true;
    group.add(mainStructure);
    
    // Roof based on property type
    const roofHeight = property?.type === 'Apartment' ? 0.8 : 2;
    const roofGeometry = new THREE.ConeGeometry(4.5, roofHeight, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: property?.type === 'Villa' ? '#8B4513' : '#696969',
      roughness: 0.8
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 3 + roofHeight/2;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    group.add(roof);
    
    // Windows based on property size
    const windowCount = property?.bedrooms || 3;
    const windowGeometry = new THREE.PlaneGeometry(0.8, 1.2);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
      color: '#87CEEB',
      transparent: true,
      opacity: 0.7,
      emissive: '#404040',
      emissiveIntensity: 0.1
    });
    
    // Front windows
    for (let i = 0; i < Math.min(windowCount, 4); i++) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(-2 + i * 1.3, 2, 2.01);
      group.add(window);
    }
    
    // Door
    const doorGeometry = new THREE.PlaneGeometry(1, 2.2);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
      color: '#8B4513',
      roughness: 0.6
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(2.5, 1.1, 2.01);
    group.add(door);
    
    // Door handle
    const handleGeometry = new THREE.SphereGeometry(0.08);
    const handleMaterial = new THREE.MeshStandardMaterial({ 
      color: '#FFD700',
      metalness: 0.8,
      roughness: 0.2
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(2.8, 1.1, 2.02);
    group.add(handle);
    
    // Add amenities if property has them
    if (property?.amenities?.includes('Parking') || property?.amenities?.includes('Garage')) {
      const garageGeometry = new THREE.BoxGeometry(3, 2.5, 3);
      const garageMaterial = new THREE.MeshStandardMaterial({ 
        color: '#f0f0f0',
        roughness: 0.7
      });
      const garage = new THREE.Mesh(garageGeometry, garageMaterial);
      garage.position.set(-5, 1.25, 0);
      garage.castShadow = true;
      garage.receiveShadow = true;
      group.add(garage);
      
      // Garage door
      const garageDoorGeometry = new THREE.PlaneGeometry(2.5, 2);
      const garageDoorMaterial = new THREE.MeshStandardMaterial({ 
        color: '#696969',
        roughness: 0.5
      });
      const garageDoor = new THREE.Mesh(garageDoorGeometry, garageDoorMaterial);
      garageDoor.position.set(-5, 1, 1.51);
      group.add(garageDoor);
    }
    
    // Swimming pool for luxury properties
    if (property?.amenities?.includes('Swimming Pool')) {
      const poolGeometry = new THREE.CylinderGeometry(3, 3, 0.3, 16);
      const poolMaterial = new THREE.MeshStandardMaterial({ 
        color: '#0077BE',
        transparent: true,
        opacity: 0.8,
        roughness: 0.1,
        metalness: 0.1
      });
      const pool = new THREE.Mesh(poolGeometry, poolMaterial);
      pool.position.set(8, 0.15, -2);
      pool.receiveShadow = true;
      group.add(pool);
    }
    
    // Garden/Trees
    if (property?.amenities?.includes('Garden')) {
      for (let i = 0; i < 3; i++) {
        const treeGroup = new THREE.Group();
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2.5);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1.25;
        trunk.castShadow = true;
        treeGroup.add(trunk);
        
        // Leaves
        const leavesGeometry = new THREE.SphereGeometry(1.2);
        const leavesMaterial = new THREE.MeshStandardMaterial({ color: '#228B22' });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 3;
        leaves.castShadow = true;
        treeGroup.add(leaves);
        
        treeGroup.position.set(-8 + i * 4, 0, -8 + i * 2);
        group.add(treeGroup);
      }
    }
    
    return group;
  };

  const [house] = useState(() => createModernHouse());

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return React.createElement('group', { ref: groupRef },
    React.createElement('primitive', { object: house })
  );
}

const ThreeDViewer = ({ property, modelPath = null, modelType = null }) => {
  return React.createElement('div', { className: 'threed-viewer' },
    React.createElement('div', { className: 'threed-header' },
      React.createElement('h3', null, '🏡 3D Property View'),
      property && React.createElement('div', { className: 'property-info' },
        React.createElement('span', { className: 'property-type' }, 
          `${property.type} • ${property.bedrooms} bed • ${property.bathrooms} bath`
        )
      )
    ),
    
    React.createElement(Canvas, {
      shadows: true,
      dpr: [1, 2],
      camera: { position: [12, 8, 12], fov: 50 },
      style: { 
        background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #F0F8FF 100%)',
        borderRadius: '15px'
      }
    },
      React.createElement(Suspense, { fallback: React.createElement(Loader) },
        // Enhanced Lighting
        React.createElement('ambientLight', { intensity: 0.5 }),
        React.createElement('directionalLight', {
          castShadow: true,
          position: [15, 15, 8],
          intensity: 1.2,
          'shadow-mapSize-width': 2048,
          'shadow-mapSize-height': 2048,
          'shadow-camera-far': 50,
          'shadow-camera-left': -20,
          'shadow-camera-right': 20,
          'shadow-camera-top': 20,
          'shadow-camera-bottom': -20
        }),
        React.createElement('pointLight', { 
          position: [-15, 5, -15], 
          intensity: 0.4, 
          color: "#ffeaa7" 
        }),
        
        // Model
        React.createElement(ModernHouse, { property: property }),
        
        // Ground
        React.createElement('mesh', {
          rotation: [-Math.PI / 2, 0, 0],
          position: [0, -0.1, 0],
          receiveShadow: true
        },
          React.createElement('planeGeometry', { args: [50, 50] }),
          React.createElement('meshStandardMaterial', { color: "#90EE90" })
        ),
        
        // Environment and shadows
        React.createElement(ContactShadows, { 
          opacity: 0.3, 
          scale: 30, 
          blur: 2, 
          far: 4.5, 
          resolution: 512, 
          color: "#000000" 
        }),
        React.createElement(Environment, { preset: "sunset" }),
        
        // Enhanced Controls
        React.createElement(OrbitControls, {
          enablePan: true,
          enableZoom: true,
          enableRotate: true,
          minDistance: 5,
          maxDistance: 30,
          minPolarAngle: 0,
          maxPolarAngle: Math.PI / 2.2,
          autoRotate: false,
          autoRotateSpeed: 0.5
        })
      )
    ),
    
    // Instructions
    React.createElement('div', { className: 'viewer-instructions' },
      React.createElement('div', { className: 'instruction-row' },
        React.createElement('span', null, '🖱️ Drag to rotate'),
        React.createElement('span', null, '🔄 Scroll to zoom'),
        React.createElement('span', null, '📱 Touch & drag on mobile')
      ),
      !modelPath && React.createElement('div', { className: 'fallback-note' },
        React.createElement('span', null, '📦 Using procedural model based on property data'),
        React.createElement('small', null, '• Add .fbx or .gltf files to public/models/ for custom 3D models')
      )
    )
  );
};

export default ThreeDViewer;
