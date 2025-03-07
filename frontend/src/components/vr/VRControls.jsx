import React from 'react';
import { useXR, useXREvent, Interactive } from '@react-three/xr';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const VRControls = ({ onMove, onTeleport, onGrab }) => {
  const { isPresenting, player } = useXR();
  const leftController = useRef();
  const rightController = useRef();

  useXREvent('squeezestart', (e) => {
    const hand = e.target.inputSource.handedness;
    onGrab(hand);
  });

  useXREvent('selectstart', (e) => {
    const hand = e.target.inputSource.handedness;
    if (hand === 'right') {
      const position = e.target.controller.position;
      onTeleport([position.x, position.y, position.z]);
    }
  });

  useFrame(() => {
    if (!isPresenting) return;

    // Handle movement using gamepad axes
    const leftGamepad = player.controllers[0]?.inputSource?.gamepad;
    if (leftGamepad?.axes) {
      const [, , axisX, axisZ] = leftGamepad.axes;
      if (axisX !== 0 || axisZ !== 0) {
        onMove({
          x: axisX,
          z: axisZ
        });
      }
    }
  });

  return (
    <group>
      <Interactive ref={leftController}>
        <mesh visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </Interactive>
      <Interactive ref={rightController}>
        <mesh visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </Interactive>
    </group>
  );
};

export default VRControls;