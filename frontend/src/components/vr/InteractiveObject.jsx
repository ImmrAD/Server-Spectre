import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { Html } from '@react-three/drei';

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

export default InteractiveObject;