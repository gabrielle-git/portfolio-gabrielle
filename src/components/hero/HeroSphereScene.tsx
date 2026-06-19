"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.rotation.z += 0.001;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.65, 5]} />
      <meshBasicMaterial
        color="#a78bfa"
        wireframe
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

function InnerSphere() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.035;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y -= 0.002;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.45, 32, 32]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 280;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.3 + Math.random() * 1.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.055;
    ref.current.rotation.x = state.clock.elapsedTime * 0.025;
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#c4b5fd"
        size={0.022}
        sizeAttenuation
        opacity={0.75}
        depthWrite={false}
      />
    </Points>
  );
}

function OuterRing() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.12;
    ref.current.rotation.x = Math.PI * 0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.006, 8, 120]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
    </mesh>
  );
}

export function HeroSphereScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.0], fov: 62 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <WireframeSphere />
      <InnerSphere />
      <Particles />
      <OuterRing />
    </Canvas>
  );
}
