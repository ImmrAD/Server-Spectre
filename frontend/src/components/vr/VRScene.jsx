// src/components/vr/VRScene.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { VRButton, XR, useXR } from '@react-three/xr';
import VRControls from './VRControls';
import { Environment, Sky, OrbitControls } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { BoxGeometry } from 'three';

// Import scenario data from Firebase
import { useScenarioData } from '../../hooks/useFirebase';

const InteractiveObject = ({ position, color, shape, onInteract, label, difficulty }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ref, api] = useBox(() => ({ 
    mass: 1, 
    position,
    args: shape === 'sphere' ? [1, 1, 1] : [1, 1, 1]
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    setClicked(!clicked);
    onInteract(label);
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={clicked ? 1.2 : 1}
    >
      {shape === 'sphere' ? (
        <sphereGeometry args={[1, 32, 32]} />
      ) : (
        <boxGeometry args={[1, 1, 1]} />
      )}
      <meshStandardMaterial 
        color={hovered ? '#2563eb' : color} 
        metalness={0.1}
        roughness={0.5}
      />
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-white px-2 py-1 rounded-md shadow-md text-sm">
          {label}
        </div>
      </Html>
    </mesh>
  );
};

const Floor = () => {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0]
  }));
  
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
};

const ScenarioEnvironment = ({ scenarioType }) => {
  // Different environments based on scenario type
  switch(scenarioType) {
    case 'classroom':
      return <Environment preset="classroom" />;
    case 'playground':
      return <Environment preset="park" />;
    case 'store':
      return <Environment preset="city" />;
    default:
      return <Sky />;
  }
};

// Custom hook for progress tracking
const useProgressTracker = (userId, scenarioId) => {
  const [progress, setProgress] = useState(0);
  const [interactions, setInteractions] = useState([]);
  
  // Track interaction with objects
  const trackInteraction = (objectLabel) => {
    const newInteractions = [...interactions, {
      objectLabel,
      timestamp: Date.now()
    }];
    setInteractions(newInteractions);
    
    // Update progress in Firebase
    updateUserProgress(userId, scenarioId, newInteractions);
  };
  
  return { progress, interactions, trackInteraction };
};

const VRScene = ({ scenarioId, difficulty = 'medium', userId }) => {
  const { scenario, loading, error } = useScenarioData(scenarioId);
  const { progress, trackInteraction } = useProgressTracker(userId, scenarioId);
  
  if (loading) return <div className="flex items-center justify-center h-64">Loading scenario...</div>;
  if (error) return <div className="text-red-500">Error loading scenario: {error.message}</div>;
  
  return (
    <div className="w-full h-screen">
      <VRButton className="absolute top-4 right-4 z-10" />
      
      <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded-md shadow-md">
        <h3 className="font-bold">{scenario?.title}</h3>
        <p>Difficulty: {difficulty}</p>
        <p>Progress: {progress}%</p>
      </div>
      
      <Canvas shadows>
        <XR>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
          
          <Physics>
            <Floor />
            
            {scenario?.objects?.map((obj, index) => (
              <InteractiveObject
                key={index}
                position={obj.position}
                color={obj.color}
                shape={obj.shape}
                label={obj.label}
                difficulty={difficulty}
                onInteract={trackInteraction}
              />
            ))}
          </Physics>
          
          <ScenarioEnvironment scenarioType={scenario?.environment} />
          <VRControls
            onMove={(movement) => {
              // Handle movement
            }}
            onTeleport={(position) => {
              // Handle teleport
            }}
            onGrab={(hand) => {
              // Handle grab
            }}
          />
        </XR>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default VRScene;