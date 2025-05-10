
import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, useTexture, Environment } from "@react-three/drei";

interface ShapeParticleProps {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  color: string;
}

const ShapeParticle = ({ position, rotation, size, color }: ShapeParticleProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = rotation[0] + state.clock.getElapsedTime() * 0.05;
    mesh.current.rotation.y = rotation[1] + state.clock.getElapsedTime() * 0.08;
    
    // Subtle floating effect
    mesh.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.001;
  });
  
  return (
    <mesh ref={mesh} position={position}>
      {Math.random() > 0.5 ? (
        <Sphere args={[size, 16, 16]}>
          <meshStandardMaterial color={color} opacity={0.6} transparent metalness={0.2} roughness={0.3} />
        </Sphere>
      ) : (
        <Box args={[size, size, size]}>
          <meshStandardMaterial color={color} opacity={0.6} transparent metalness={0.5} roughness={0.2} />
        </Box>
      )}
    </mesh>
  );
};

interface ParticlesProps {
  count?: number;
}

const Particles = ({ count = 15 }: ParticlesProps) => {
  const particles = Array.from({ length: count }).map((_, i) => {
    const posRange = 12;
    return {
      position: [
        (Math.random() - 0.5) * posRange,
        (Math.random() - 0.5) * posRange, 
        (Math.random() - 0.5) * posRange - 5
      ] as [number, number, number],
      rotation: [Math.random(), Math.random(), Math.random()] as [number, number, number],
      size: Math.random() * 0.5 + 0.1,
      color: ['#9b87f5', '#D6BCFA', '#E5DEFF', '#7E69AB'][Math.floor(Math.random() * 4)]
    };
  });
  
  return (
    <>
      {particles.map((props, i) => (
        <ShapeParticle key={i} {...props} />
      ))}
    </>
  );
};

const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />
        <Particles />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
