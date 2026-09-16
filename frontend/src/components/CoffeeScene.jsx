import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo, useRef } from "react";

function CoffeeCup() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.92, 0.76, 0.78, 64]} />
        <meshPhysicalMaterial color="#d5b89b" roughness={0.2} metalness={0.04} clearcoat={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.035, 64]} />
        <meshStandardMaterial color="#211711" roughness={0.28} />
      </mesh>
      <mesh castShadow position={[0.92, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.35, 0.095, 20, 48, Math.PI * 1.65]} />
        <meshPhysicalMaterial color="#d5b89b" roughness={0.2} clearcoat={0.7} />
      </mesh>
      <mesh receiveShadow position={[0, -0.56, 0]}>
        <cylinderGeometry args={[1.3, 1.15, 0.12, 64]} />
        <meshPhysicalMaterial color="#b99576" roughness={0.24} clearcoat={0.55} />
      </mesh>
      <mesh position={[0, 0.302, 0]}>
        <torusGeometry args={[0.73, 0.025, 16, 64]} />
        <meshStandardMaterial color="#e9d3b9" roughness={0.2} />
      </mesh>
    </group>
  );
}

function CoffeeSteam({ count = 48, size = 0.07, speed = 1 }) {
  const points = useRef();
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positions[offset] = (Math.random() - 0.5) * 0.42;
      positions[offset + 1] = Math.random() * 1.42;
      positions[offset + 2] = (Math.random() - 0.5) * 0.3;
      colors[offset] = 0.82;
      colors[offset + 1] = 0.72;
      colors[offset + 2] = 0.61;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    const positionArray = points.current.geometry.attributes.position.array;
    const colorArray = points.current.geometry.attributes.color.array;
    const time = state.clock.elapsedTime;

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      positionArray[offset + 1] += delta * 0.27 * speed;
      positionArray[offset] += Math.sin(time * 1.2 + index) * delta * 0.035;
      positionArray[offset + 2] += Math.cos(time * 0.9 + index) * delta * 0.022;

      if (positionArray[offset + 1] > 1.5) {
        positionArray[offset] = (Math.random() - 0.5) * 0.42;
        positionArray[offset + 1] = 0;
        positionArray[offset + 2] = (Math.random() - 0.5) * 0.3;
      }

      const opacity = Math.max(0.04, 1 - positionArray[offset + 1] / 1.5);
      colorArray[offset] = 0.82 * opacity;
      colorArray[offset + 1] = 0.72 * opacity;
      colorArray[offset + 2] = 0.61 * opacity;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={points} position={[0, 0.34, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingBeans() {
  const beans = [
    [-1.65, 0.68, 0.1, 0.18],
    [1.5, 1.08, -0.2, -0.3],
    [1.7, -0.2, 0.15, 0.45],
    [-1.4, -0.85, -0.1, -0.5],
    [0.25, 1.55, -0.3, 0.2],
  ];

  return (
    <group>
      {beans.map(([x, y, z, rotation], index) => (
        <mesh key={index} position={[x, y, z]} rotation={[0.4, rotation, 0.7]} scale={[0.18, 0.1, 0.1]} castShadow>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color={index % 2 ? "#7b4b30" : "#4d2d20"} roughness={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function ParallaxGroup() {
  const group = useRef();
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.y += (pointer.x * 0.18 - group.current.rotation.y) * 0.025;
    group.current.rotation.x += (-pointer.y * 0.08 - group.current.rotation.x) * 0.025;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.045;
  });

  return (
    <group ref={group} rotation={[0, -0.16, 0]}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
        <CoffeeCup />
      </Float>
      <CoffeeSteam count={52} size={0.075} speed={1} />
      <CoffeeSteam count={28} size={0.12} speed={0.65} />
      <FloatingBeans />
      <Sparkles count={28} scale={[3.4, 2.6, 1.6]} size={2.4} speed={0.28} color="#d9b998" noise={0.8} />
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0.2, 4.6], fov: 38 }} dpr={[1, 1.7]} shadows>
      <Suspense fallback={null}>
        <color attach="background" args={["#171512"]} />
        <ambientLight intensity={0.55} />
        <spotLight position={[3, 4, 4]} angle={0.45} penumbra={1} intensity={3.2} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3, 1, 2]} intensity={1.4} color="#c9946e" />
        <ParallaxGroup />
        <ContactShadows position={[0, -0.66, 0]} opacity={0.55} scale={4} blur={2.4} far={2.5} />
      </Suspense>
    </Canvas>
  );
}

export default function CoffeeScene() {
  return <div className="coffee-scene" aria-label="A steaming cup of coffee in a cinematic 3D scene" role="img"><Scene /></div>;
}
