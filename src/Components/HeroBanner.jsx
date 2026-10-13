// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import { Suspense, useRef } from "react";
// import Buttons from "./Buttons";
// import "../styles/hero.css";
// import { useStackedSlides } from "../hooks/gasp";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// function Model() {
//   const { scene } = useGLTF("/earth.glb");
//   const modelRef = useRef();
//   const { viewport } = useThree();

//   // Responsive scale based on canvas viewport width rather than window.innerWidth
//   // const scale = viewport.width < 5 ? 1.2 : 1.8;

//   useFrame((state, delta) => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += delta * 0.15;
//       const isMobile = window.innerWidth <= 768;

//       const currentScale = isMobile ? 1.3 : 1.5;

//       modelRef.current.scale.setScalar(currentScale);
//     }
//   });

//   return <primitive ref={modelRef} object={scene} />;
// }

// export default function App() {
//   const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

//   const root = useRef(null);

//   // Animate the children inside .animate-text (h1, p, buttons)
//   // useGSAP(
//   //   () => {
//   //     gsap.from(".animate-text > *", {
//   //       autoAlpha: 0,
//   //       x:-400,
//   //       duration: 1.8,
//   //       // stagger: 0.8,
//   //       ease: "power3.out",
//   //     });
//   //   },
//   //   { scope: root },
//   // );

//   // useGSAP(
//   //   () => {
//   //     // 1. Slow Entrance
//   //     gsap.from(".animate-text > *", {
//   //       autoAlpha: 0,
//   //       y: 500,
//   //       duration: 2.2,
//   //       // ease: "power2.out",
//   //       ease: "expo.out", // High initial velocity that glides smoothly to a stop
//   //       force3D: true,
//   //     });
//   //   },
//   //   { scope: root },
//   // );

//   useGSAP(
//     () => {
//       gsap.fromTo(
//         ".animate-text > *",
//         {
//           autoAlpha: 0,
//           y: 50, // Reduced from 500 to 50 for controlled elegance
//           filter: "blur(12px)", // Lens focus transition
//           skewY: 2, // Subtle kinetic weight
//         },
//         {
//           autoAlpha: 1,
//           y: 0,
//           filter: "blur(-5px)",
//           skewY: 0,
//           duration: 1.8,
//           stagger: 0.12, // Fluid sequence (Header -> Paragraph -> Buttons)
//           ease: "power4.out", // Smooth deceleration curve
//           force3D: true,
//           clearProps: "filter,transform", // Cleans inline CSS after animation finishes
//         },
//       );
//     },
//     { scope: root },
//   );

//   return (
//     <section
//       ref={root}
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         flexWrap: "wrap",
//         alignItems: "center",
//         justifyContent: "space-center",
//         // height: "100vh",
//         width: "100%",
//         padding: "2rem 6vw",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* Text Container */}
//       <div
//         style={{
//           flex: "1 1 300px",
//           fontFamily: "monospace",
//           zIndex: 2,
//           padding: "1rem 0",
//         }}
//         className=" text-luxury-muted animate-text"
//       >
//         <h1 className="text-7xl font-bold">H<span className="text-luxury-gold font-bold">I</span>,</h1>
//         <h1
//           style={{
//             fontSize: "clamp(2.5rem, 6vw, 5rem)",
//             margin: "0 0 1rem 0",
//             lineHeight: 1.1,
//           }}
//         >
//           <span>I'm</span>{"  "}
//           <span className="text-8xl font-extrabold text-luxury-gold">
//             Gibin
//           </span>
//         </h1>
//         <p
//           style={{
//             maxWidth: 500,
//             fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
//             lineHeight: 1.5,
//           }}
//           className="text-luxury-muted"
//         >
//           I am a Web developer from Kerala. I strive to push my work to new
//           horizons.
//         </p>
//         <div className="btncomp">
//           <Buttons />
//         </div>
//       </div>

//       {/* 3D Canvas Container */}
//       <div
//         style={{
//           flex: "1 1 300px",
//           height: isMobile ? "45vh" : "80vh",
//           minHeight: "280px",
//           width: "100%",
//           position: "relative",
//         }}
//       >
//         <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
//           <ambientLight intensity={1} />
//           <directionalLight position={[5, 5, 5]} intensity={2} />
//           <Suspense fallback={null}>
//             <Model />
//             <Environment preset="city" />
//           </Suspense>
//           <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
//         </Canvas>
//       </div>
//     </section>
//   );
// }

// useGLTF.preload("/earth.glb");

// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Html } from "@react-three/drei";
// import { Suspense, useRef, useMemo, useEffect } from "react";
// import Buttons from "./Buttons";
// import "../styles/hero.css";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import * as THREE from "three";

// /* ------------------------------------------------------------------ */
// /* Shared helpers                                                      */
// /* ------------------------------------------------------------------ */
// const prefersReducedMotion = () =>
//   typeof window !== "undefined" &&
//   window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// function useWindowPointer() {
//   const pointer = useRef({ x: 0, y: 0 });
//   useEffect(() => {
//     const onMove = (e) => {
//       pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
//       pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
//     };
//     window.addEventListener("pointermove", onMove, { passive: true });
//     return () => window.removeEventListener("pointermove", onMove);
//   }, []);
//   return pointer;
// }

// /* ------------------------------------------------------------------ */
// /* Particle field                                                      */
// /* ------------------------------------------------------------------ */
// const particleVertex = /* glsl */ `
//   attribute float aSize;
//   attribute float aPhase;
//   attribute vec3 aColor;
//   uniform float uTime;
//   uniform float uPixelRatio;
//   varying vec3 vColor;
//   varying float vAlpha;

//   void main() {
//     vec3 p = position;
//     p.y += sin(uTime * 0.25 + aPhase * 6.2831) * 10.0;
//     p.x += cos(uTime * 0.18 + aPhase * 6.2831) * 6.0;

//     vec4 mv = modelViewMatrix * vec4(p, 1.0);
//     gl_Position = projectionMatrix * mv;
//     gl_PointSize = aSize * uPixelRatio * (320.0 / -mv.z);

//     vColor = aColor;
//     vAlpha = 0.45 + 0.55 * sin(uTime * 1.1 + aPhase * 12.566);
//   }
// `;

// const particleFragment = /* glsl */ `
//   varying vec3 vColor;
//   varying float vAlpha;

//   void main() {
//     float d = length(gl_PointCoord - 0.5);
//     float core = smoothstep(0.5, 0.0, d);
//     float glow = pow(core, 2.2);
//     gl_FragColor = vec4(vColor, glow * vAlpha);
//   }
// `;

// function ParticleField({ count = 1800 }) {
//   const groupRef = useRef();
//   const matRef = useRef();
//   const pointer = useWindowPointer();
//   const reduceMotion = useMemo(prefersReducedMotion, []);

//   const { positions, sizes, phases, colors } = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const sizes = new Float32Array(count);
//     const phases = new Float32Array(count);
//     const colors = new Float32Array(count * 3);

//     const palette = [
//       new THREE.Color("#7dd3fc"),
//       new THREE.Color("#22d3ee"),
//       new THREE.Color("#a78bfa"),
//       new THREE.Color("#e0f2fe"),
//     ];

//     for (let i = 0; i < count; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 2200;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
//       positions[i * 3 + 2] = -900 + Math.random() * 1300;

//       sizes[i] =
//         Math.random() > 0.94
//           ? 6 + Math.random() * 6
//           : 1.5 + Math.random() * 2.5;
//       phases[i] = Math.random();

//       const c = palette[Math.floor(Math.random() * palette.length)];
//       colors[i * 3] = c.r;
//       colors[i * 3 + 1] = c.g;
//       colors[i * 3 + 2] = c.b;
//     }
//     return { positions, sizes, phases, colors };
//   }, [count]);

//   const uniforms = useMemo(
//     () => ({
//       uTime: { value: 0 },
//       uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
//     }),
//     [],
//   );

//   useFrame(({ clock }) => {
//     const t = reduceMotion ? 0 : clock.getElapsedTime();
//     if (matRef.current) matRef.current.uniforms.uTime.value = t;

//     if (groupRef.current) {
//       const targetY = t * 0.012 + pointer.current.x * 0.08;
//       const targetX = -pointer.current.y * 0.05;
//       groupRef.current.rotation.y = THREE.MathUtils.lerp(
//         groupRef.current.rotation.y,
//         targetY,
//         0.04,
//       );
//       groupRef.current.rotation.x = THREE.MathUtils.lerp(
//         groupRef.current.rotation.x,
//         targetX,
//         0.04,
//       );
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <points frustumCulled={false}>
//         <bufferGeometry>
//           <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//           <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
//           <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
//           <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
//         </bufferGeometry>
//         <shaderMaterial
//           ref={matRef}
//           uniforms={uniforms}
//           vertexShader={particleVertex}
//           fragmentShader={particleFragment}
//           transparent
//           depthWrite={false}
//           blending={THREE.AdditiveBlending}
//         />
//       </points>
//     </group>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* CSS backdrop                                                        */
// /* ------------------------------------------------------------------ */
// const NOISE_SVG =
//   "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// const heroBgCss = `
//   @keyframes hero-aurora-a {
//     0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
//     50%      { transform: translate3d(6vw, 4vh, 0) scale(1.15); }
//   }
//   @keyframes hero-aurora-b {
//     0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
//     50%      { transform: translate3d(-5vw, -5vh, 0) scale(1.1); }
//   }
//   @keyframes hero-aurora-c {
//     0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .55; }
//     50%      { transform: translate3d(-3vw, 3vh, 0) scale(1.2); opacity: .8; }
//   }
//   .hero-aurora { will-change: transform; }
//   .hero-aurora-a { animation: hero-aurora-a 22s ease-in-out infinite; }
//   .hero-aurora-b { animation: hero-aurora-b 28s ease-in-out infinite; }
//   .hero-aurora-c { animation: hero-aurora-c 34s ease-in-out infinite; }
//   @media (prefers-reduced-motion: reduce) {
//   }
// `;

// function HeroBackdrop() {
//   return (
//     <>
//       <style>{heroBgCss}</style>

//       {/* Base depth gradient */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(120% 90% at 50% 0%, #0b1224 0%, #070b18 45%, #04060d 100%)",
//         }}
//       />

//       {/* Aurora glows */}
//       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//         <div
//           className="hero-aurora hero-aurora-a absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[820px] max-h-[820px] rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 65%)",
//             filter: "blur(40px)",
//           }}
//         />
//         <div
//           className="hero-aurora hero-aurora-b absolute top-[10%] -right-[12%] w-[50vw] h-[50vw] max-w-[760px] max-h-[760px] rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(139,92,246,0.30) 0%, rgba(139,92,246,0) 65%)",
//             filter: "blur(50px)",
//           }}
//         />
//         <div
//           className="hero-aurora hero-aurora-c absolute -bottom-[25%] left-[25%] w-[60vw] h-[40vw] max-w-[900px] max-h-[600px] rounded-full"
//           style={{
//             background:
//               "radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)",
//             filter: "blur(60px)",
//           }}
//         />
//       </div>

//       {/* Fine grid, faded toward the edges */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
//           backgroundSize: "64px 64px",
//           WebkitMaskImage:
//             "radial-gradient(ellipse 75% 70% at 50% 45%, #000 20%, transparent 100%)",
//           maskImage:
//             "radial-gradient(ellipse 75% 70% at 50% 45%, #000 20%, transparent 100%)",
//         }}
//       />

//       {/* Particle field */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <Canvas
//           camera={{ position: [0, 0, 500], fov: 60, near: 1, far: 3000 }}
//           dpr={[1, 2]}
//           gl={{
//             antialias: false,
//             alpha: true,
//             powerPreference: "high-performance",
//           }}
//         >
//           <ParticleField />
//         </Canvas>
//       </div>

//       {/* Film grain */}
//       <div
//         className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
//         style={{ backgroundImage: NOISE_SVG, backgroundSize: "160px 160px" }}
//       />

//       <div
//         className="absolute inset-0 z-0 pointer-events-none"
//         style={{
//           background:
//             "radial-gradient(ellipse at center, transparent 55%, rgba(2,4,10,0.65) 100%), linear-gradient(to bottom, transparent 75%, #04060d 100%)",
//         }}
//       />
//     </>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Portfolio geometry: a three-layer full-stack system with live data  */
// /* pulses travelling from the UI down to the database                  */
// /* ------------------------------------------------------------------ */
// const SIZE = 3.4;
// const TOP_Y = 1.1;
// const BOTTOM_Y = -1.1;

// const LAYERS = [
//   { key: "ui", y: TOP_Y, color: "#22d3ee", label: "Frontend" },
//   { key: "api", y: 0, color: "#a78bfa", label: "Backend / API" },
//   { key: "db", y: BOTTOM_Y, color: "#60a5fa", label: "Database" },
// ];

// const PULSES = [
//   { x: -1.2, z: -1.2, speed: 0.22, phase: 0.0 },
//   { x: 1.2, z: -1.2, speed: 0.18, phase: 0.35 },
//   { x: 1.2, z: 1.2, speed: 0.25, phase: 0.6 },
//   { x: -1.2, z: 1.2, speed: 0.2, phase: 0.85 },
//   { x: 0, z: 0, speed: 0.3, phase: 0.15 },
//   { x: 0, z: 0, speed: 0.3, phase: 0.65 },
// ];

// // a flat block with a faint fill and crisp edges
// function Block({ position, size, color, fill = 0.22 }) {
//   const geo = useMemo(() => new THREE.BoxGeometry(...size), [size]);
//   return (
//     <group position={position}>
//       <mesh geometry={geo}>
//         <meshBasicMaterial
//           color={color}
//           transparent
//           opacity={fill}
//           depthWrite={false}
//         />
//       </mesh>
//       <lineSegments>
//         <edgesGeometry args={[geo]} />
//         <lineBasicMaterial color={color} transparent opacity={0.95} />
//       </lineSegments>
//     </group>
//   );
// }

// function Disk({ position, radius, color }) {
//   const geo = useMemo(
//     () => new THREE.CylinderGeometry(radius, radius, 0.1, 36),
//     [radius],
//   );
//   return (
//     <group position={position}>
//       <mesh geometry={geo}>
//         <meshBasicMaterial
//           color={color}
//           transparent
//           opacity={0.25}
//           depthWrite={false}
//         />
//       </mesh>
//       <lineSegments>
//         <edgesGeometry args={[geo, 30]} />
//         <lineBasicMaterial color={color} transparent opacity={0.95} />
//       </lineSegments>
//     </group>
//   );
// }

// function LayerLabel({ color, children }) {
//   return (
//     <Html position={[-SIZE / 2, 0, SIZE / 2]} style={{ pointerEvents: "none" }}>
//       <div
//         style={{
//           transform: "translate(-100%, -50%)",
//           marginLeft: -10,
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           padding: "5px 10px",
//           fontFamily: "monospace",
//           fontSize: 12,
//           letterSpacing: "0.02em",
//           color: "#e2e8f0",
//           whiteSpace: "nowrap",
//           background: "rgba(5,8,16,0.65)",
//           border: `1px solid ${color}66`,
//           borderRadius: 6,
//           backdropFilter: "blur(6px)",
//         }}
//       >
//         <span
//           style={{
//             width: 7,
//             height: 7,
//             borderRadius: 999,
//             background: color,
//             boxShadow: `0 0 8px ${color}`,
//           }}
//         />
//         {children}
//       </div>
//     </Html>
//   );
// }

// function Layer({ y, color, label, children }) {
//   const slab = useMemo(() => new THREE.BoxGeometry(SIZE, 0.08, SIZE), []);

//   // fine grid drawn on the slab's top face
//   const gridGeo = useMemo(() => {
//     const pts = [];
//     const h = SIZE / 2;
//     const step = SIZE / 8;
//     for (let i = -4; i <= 4; i++) {
//       const v = i * step;
//       pts.push(new THREE.Vector3(-h, 0.045, v), new THREE.Vector3(h, 0.045, v));
//       pts.push(new THREE.Vector3(v, 0.045, -h), new THREE.Vector3(v, 0.045, h));
//     }
//     return new THREE.BufferGeometry().setFromPoints(pts);
//   }, []);

//   return (
//     <group position={[0, y, 0]}>
//       <mesh geometry={slab}>
//         <meshBasicMaterial
//           color={color}
//           transparent
//           opacity={0.07}
//           depthWrite={false}
//         />
//       </mesh>
//       <lineSegments>
//         <edgesGeometry args={[slab]} />
//         <lineBasicMaterial color={color} transparent opacity={0.9} />
//       </lineSegments>
//       <lineSegments geometry={gridGeo}>
//         <lineBasicMaterial color={color} transparent opacity={0.16} />
//       </lineSegments>
//       {children}
//       <LayerLabel color={color}>{label}</LayerLabel>
//     </group>
//   );
// }

// function ApiNodes({ color }) {
//   const ring = useMemo(
//     () =>
//       Array.from({ length: 6 }, (_, i) => {
//         const a = (i / 6) * Math.PI * 2;
//         return [Math.cos(a) * 1.05, 0.12, Math.sin(a) * 1.05];
//       }),
//     [],
//   );

//   const linesGeo = useMemo(() => {
//     const pts = [];
//     const c = new THREE.Vector3(0, 0.12, 0);
//     ring.forEach((p, i) => {
//       const v = new THREE.Vector3(...p);
//       const next = new THREE.Vector3(...ring[(i + 1) % ring.length]);
//       pts.push(c, v, v, next);
//     });
//     return new THREE.BufferGeometry().setFromPoints(pts);
//   }, [ring]);

//   return (
//     <>
//       <lineSegments geometry={linesGeo}>
//         <lineBasicMaterial color={color} transparent opacity={0.55} />
//       </lineSegments>
//       <mesh position={[0, 0.12, 0]}>
//         <sphereGeometry args={[0.17, 24, 24]} />
//         <meshBasicMaterial color="#ede9fe" />
//       </mesh>
//       {ring.map((p, i) => (
//         <mesh key={i} position={p}>
//           <sphereGeometry args={[0.09, 16, 16]} />
//           <meshBasicMaterial color={color} />
//         </mesh>
//       ))}
//     </>
//   );
// }

// function GeometryShape() {
//   const group = useRef();
//   const pulseRefs = useRef([]);
//   const pointer = useWindowPointer();
//   const reduceMotion = useMemo(prefersReducedMotion, []);

//   // vertical connectors between the three layers
//   const connectors = useMemo(() => {
//     const pts = [];
//     PULSES.slice(0, 5).forEach(({ x, z }) => {
//       pts.push(
//         new THREE.Vector3(x, TOP_Y, z),
//         new THREE.Vector3(x, BOTTOM_Y, z),
//       );
//     });
//     return new THREE.BufferGeometry().setFromPoints(pts);
//   }, []);

//   useFrame(({ clock }) => {
//     const t = reduceMotion ? 0 : clock.getElapsedTime();

//     pulseRefs.current.forEach((m, i) => {
//       if (!m) return;
//       const { speed, phase } = PULSES[i];
//       const u = reduceMotion ? phase : (t * speed + phase) % 1;
//       m.position.y = TOP_Y - u * (TOP_Y - BOTTOM_Y);
//       m.scale.setScalar(0.25 + Math.sin(u * Math.PI) * 0.75);
//     });

//     if (group.current) {
//       const targetY =
//         -0.65 + Math.sin(t * 0.25) * 0.3 + pointer.current.x * 0.3;
//       const targetX = 0.42 - pointer.current.y * 0.15;
//       group.current.rotation.y = THREE.MathUtils.lerp(
//         group.current.rotation.y,
//         targetY,
//         0.05,
//       );
//       group.current.rotation.x = THREE.MathUtils.lerp(
//         group.current.rotation.x,
//         targetX,
//         0.05,
//       );
//       group.current.position.y = Math.sin(t * 0.7) * 0.08;
//     }
//   });

//   return (
//     <group ref={group}>
//       {/* connectors */}
//       <lineSegments geometry={connectors}>
//         <lineBasicMaterial color="#cbd5e1" transparent opacity={0.28} />
//       </lineSegments>

//       {/* Frontend: UI blocks */}
//       <Layer y={LAYERS[0].y} color={LAYERS[0].color} label={LAYERS[0].label}>
//         <Block
//           position={[-0.85, 0.1, -0.75]}
//           size={[1.2, 0.12, 0.75]}
//           color={LAYERS[0].color}
//         />
//         <Block
//           position={[0.75, 0.1, -0.75]}
//           size={[0.95, 0.12, 0.75]}
//           color={LAYERS[0].color}
//         />
//         <Block
//           position={[0, 0.1, 0.6]}
//           size={[2.5, 0.12, 0.65]}
//           color={LAYERS[0].color}
//         />
//       </Layer>

//       {/* Backend: service graph */}
//       <Layer y={LAYERS[1].y} color={LAYERS[1].color} label={LAYERS[1].label}>
//         <ApiNodes color={LAYERS[1].color} />
//       </Layer>

//       {/* Database: stacked disks */}
//       <Layer y={LAYERS[2].y} color={LAYERS[2].color} label={LAYERS[2].label}>
//         {[0.1, 0.23, 0.36].map((h) => (
//           <Disk
//             key={h}
//             position={[-0.55, h, 0]}
//             radius={0.62}
//             color={LAYERS[2].color}
//           />
//         ))}
//         {[0.1, 0.23].map((h) => (
//           <Disk
//             key={h}
//             position={[0.85, h, 0.5]}
//             radius={0.42}
//             color={LAYERS[2].color}
//           />
//         ))}
//       </Layer>

//       {/* data pulses */}
//       {PULSES.map((p, i) => (
//         <group
//           key={i}
//           position={[p.x, TOP_Y, p.z]}
//           ref={(el) => (pulseRefs.current[i] = el)}
//         >
//           <mesh>
//             <sphereGeometry args={[0.07, 16, 16]} />
//             <meshBasicMaterial color="#ffffff" />
//           </mesh>
//           <mesh>
//             <sphereGeometry args={[0.2, 16, 16]} />
//             <meshBasicMaterial
//               color="#22d3ee"
//               transparent
//               opacity={0.3}
//               depthWrite={false}
//               blending={THREE.AdditiveBlending}
//             />
//           </mesh>
//         </group>
//       ))}
//     </group>
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Hero Banner                                                         */
// /* ------------------------------------------------------------------ */
// export default function HeroBanner() {
//   const root = useRef(null);
//   const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

//   useGSAP(
//     () => {
//       gsap.fromTo(
//         ".animate-text > *",
//         { autoAlpha: 0, y: 50, filter: "blur(12px)", skewY: 2 },
//         {
//           autoAlpha: 1,
//           y: 0,
//           filter: "blur(0px)",
//           skewY: 0,
//           duration: 1.8,
//           stagger: 0.12,
//           ease: "power4.out",
//           force3D: true,
//           clearProps: "filter,transform",
//         },
//       );
//     },
//     { scope: root },
//   );

//   return (
//     <section
//       ref={root}
//       className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-[90vh] overflow-hidden bg-[#04060d]"
//       style={{ padding: "2rem 6vw", boxSizing: "border-box" }}
//     >
//       <HeroBackdrop />

//       {/* Text */}
//       {/* Text Container */}
//       <div
//         style={{
//           flex: "1 1 300px",
//           zIndex: 2,
//           padding: "1rem 0",
//         }}
//         className="text-luxury-muted animate-text hero-font-main"
//       >
//         {/* Small status tag */}
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 hero-font-mono text-xs text-cyan-400">
//           <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
//           Available for New Projects
//         </div>

//         <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2">
//           HI<span className="text-luxury-gold">.</span>
//         </h1>

//         <h1
//           style={{
//             fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
//             lineHeight: 1.1,
//           }}
//           className="font-extrabold tracking-tight text-white mb-6"
//         >
//           <span>I'm</span>{" "}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-600">
//             Gibin Sunny
//           </span>
//         </h1>

//         <p
//           style={{
//             maxWidth: 520,
//             fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
//             lineHeight: 1.6,
//           }}
//           className="text-slate-300 font-normal mb-8"
//         >
//           Full-Stack Developer engineering{" "}
//           <span className="text-white font-medium">
//             high-performance web apps
//           </span>
//           , immersive interactive experiences, and robust backend architectures.
//         </p>

//         <div className="btncomp mt-2">
//           <Buttons />
//         </div>
//       </div>
//       {/* Geometry */}
//       <div
//         style={{
//           flex: "1 1 300px",
//           height: isMobile ? "45vh" : "80vh",
//           minHeight: "280px",
//           width: "100%",
//           position: "relative",
//           zIndex: 2,
//           cursor: "grab",
//         }}
//         className="active:cursor-grabbing"
//       >
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18) 0%, rgba(99,102,241,0.10) 35%, transparent 65%)",
//             filter: "blur(30px)",
//           }}
//         />
//         <Canvas
//           camera={{ position: [0, 0, 9.5], fov: 40 }}
//           dpr={[1, 2]}
//           gl={{ alpha: true }}
//         >
//           <Suspense fallback={null}>
//             <GeometryShape />
//           </Suspense>
//           <OrbitControls
//             enableZoom={false}
//             enablePan={false}
//             rotateSpeed={0.5}
//             minPolarAngle={Math.PI / 3}
//             maxPolarAngle={Math.PI / 1.8}
//           />
//         </Canvas>
//       </div>
//     </section>
//   );
// }









import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import Buttons from "./Buttons";
import "../styles/hero.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                     */
/* ------------------------------------------------------------------ */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

/* ------------------------------------------------------------------ */
/* Particle field                                                     */
/* ------------------------------------------------------------------ */
const particleVertex = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.25 + aPhase * 6.2831) * 10.0;
    p.x += cos(uTime * 0.18 + aPhase * 6.2831) * 6.0;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (320.0 / -mv.z);

    vColor = aColor;
    vAlpha = 0.45 + 0.55 * sin(uTime * 1.1 + aPhase * 12.566);
  }
`;

const particleFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.2);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

function ParticleField({ count = 1800 }) {
  const groupRef = useRef();
  const matRef = useRef();
  const pointer = useWindowPointer();
  const reduceMotion = useMemo(prefersReducedMotion, []);

  const { positions, sizes, phases, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#7dd3fc"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#e0f2fe"),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = -900 + Math.random() * 1300;

      sizes[i] =
        Math.random() > 0.94
          ? 6 + Math.random() * 6
          : 1.5 + Math.random() * 2.5;
      phases[i] = Math.random();

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, sizes, phases, colors };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = reduceMotion ? 0 : clock.getElapsedTime();
    if (matRef.current) matRef.current.uniforms.uTime.value = t;

    if (groupRef.current) {
      const targetY = t * 0.012 + pointer.current.x * 0.08;
      const targetX = -pointer.current.y * 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.04,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.04,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={particleVertex}
          fragmentShader={particleFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* CSS backdrop                                                       */
/* ------------------------------------------------------------------ */
const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const heroBgCss = `
  @keyframes hero-aurora-a {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(6vw, 4vh, 0) scale(1.15); }
  }
  @keyframes hero-aurora-b {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(-5vw, -5vh, 0) scale(1.1); }
  }
  @keyframes hero-aurora-c {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .55; }
    50%      { transform: translate3d(-3vw, 3vh, 0) scale(1.2); opacity: .8; }
  }
  .hero-aurora { will-change: transform; }
  .hero-aurora-a { animation: hero-aurora-a 22s ease-in-out infinite; }
  .hero-aurora-b { animation: hero-aurora-b 28s ease-in-out infinite; }
  .hero-aurora-c { animation: hero-aurora-c 34s ease-in-out infinite; }
`;

function HeroBackdrop() {
  return (
    <>
      <style>{heroBgCss}</style>

      {/* Base depth gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #0b1224 0%, #070b18 45%, #04060d 100%)",
        }}
      />

      {/* Aurora glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="hero-aurora hero-aurora-a absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[820px] max-h-[820px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="hero-aurora hero-aurora-b absolute top-[10%] -right-[12%] w-[50vw] h-[50vw] max-w-[760px] max-h-[760px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.30) 0%, rgba(139,92,246,0) 65%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="hero-aurora hero-aurora-c absolute -bottom-[25%] left-[25%] w-[60vw] h-[40vw] max-w-[900px] max-h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Fine grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, #000 20%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, #000 20%, transparent 100%)",
        }}
      />

      {/* Particle field */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 500], fov: 60, near: 1, far: 3000 }}
          dpr={[1, 2]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ParticleField />
        </Canvas>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG, backgroundSize: "160px 160px" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio geometry: full-stack architecture 3D model               */
/* ------------------------------------------------------------------ */
const SIZE = 3.4;
const TOP_Y = 1.1;
const BOTTOM_Y = -1.1;

const LAYERS = [
  { key: "ui", y: TOP_Y, color: "#22d3ee", label: "Frontend" },
  { key: "api", y: 0, color: "#a78bfa", label: "Backend / API" },
  { key: "db", y: BOTTOM_Y, color: "#60a5fa", label: "Database" },
];

const PULSES = [
  { x: -1.2, z: -1.2, speed: 0.22, phase: 0.0 },
  { x: 1.2, z: -1.2, speed: 0.18, phase: 0.35 },
  { x: 1.2, z: 1.2, speed: 0.25, phase: 0.6 },
  { x: -1.2, z: 1.2, speed: 0.2, phase: 0.85 },
  { x: 0, z: 0, speed: 0.3, phase: 0.15 },
  { x: 0, z: 0, speed: 0.3, phase: 0.65 },
];

function Block({ position, size, color, fill = 0.22 }) {
  const geo = useMemo(() => new THREE.BoxGeometry(...size), [size]);
  return (
    <group position={position}>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={fill}
          depthWrite={false}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[geo]} />
        <lineBasicMaterial color={color} transparent opacity={0.95} />
      </lineSegments>
    </group>
  );
}

function Disk({ position, radius, color }) {
  const geo = useMemo(
    () => new THREE.CylinderGeometry(radius, radius, 0.1, 36),
    [radius],
  );
  return (
    <group position={position}>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[geo, 30]} />
        <lineBasicMaterial color={color} transparent opacity={0.95} />
      </lineSegments>
    </group>
  );
}

function LayerLabel({ color, children }) {
  return (
    <Html position={[-SIZE / 2, 0, SIZE / 2]} center>
      <div
        style={{
          transform: "translate(-110%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          fontFamily: "monospace",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.03em",
          color: "#e2e8f0",
          whiteSpace: "nowrap",
          background: "rgba(7,11,24,0.85)",
          border: `1px solid ${color}88`,
          borderRadius: 8,
          backdropFilter: "blur(8px)",
          boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 12px ${color}33`,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
        {children}
      </div>
    </Html>
  );
}

function Layer({ y, color, label, children }) {
  const slab = useMemo(() => new THREE.BoxGeometry(SIZE, 0.08, SIZE), []);

  const gridGeo = useMemo(() => {
    const pts = [];
    const h = SIZE / 2;
    const step = SIZE / 8;
    for (let i = -4; i <= 4; i++) {
      const v = i * step;
      pts.push(new THREE.Vector3(-h, 0.045, v), new THREE.Vector3(h, 0.045, v));
      pts.push(new THREE.Vector3(v, 0.045, -h), new THREE.Vector3(v, 0.045, h));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <group position={[0, y, 0]}>
      <mesh geometry={slab}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[slab]} />
        <lineBasicMaterial color={color} transparent opacity={0.9} />
      </lineSegments>
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.16} />
      </lineSegments>
      {children}
      <LayerLabel color={color}>{label}</LayerLabel>
    </group>
  );
}

function ApiNodes({ color }) {
  const ring = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return [Math.cos(a) * 1.05, 0.12, Math.sin(a) * 1.05];
      }),
    [],
  );

  const linesGeo = useMemo(() => {
    const pts = [];
    const c = new THREE.Vector3(0, 0.12, 0);
    ring.forEach((p, i) => {
      const v = new THREE.Vector3(...p);
      const next = new THREE.Vector3(...ring[(i + 1) % ring.length]);
      pts.push(c, v, v, next);
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [ring]);

  return (
    <>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </lineSegments>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <meshBasicMaterial color="#ede9fe" />
      </mesh>
      {ring.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </>
  );
}

function GeometryShape() {
  const group = useRef();
  const pulseRefs = useRef([]);
  const pointer = useWindowPointer();
  const reduceMotion = useMemo(prefersReducedMotion, []);

  const connectors = useMemo(() => {
    const pts = [];
    PULSES.slice(0, 5).forEach(({ x, z }) => {
      pts.push(
        new THREE.Vector3(x, TOP_Y, z),
        new THREE.Vector3(x, BOTTOM_Y, z),
      );
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(({ clock }) => {
    const t = reduceMotion ? 0 : clock.getElapsedTime();

    pulseRefs.current.forEach((m, i) => {
      if (!m) return;
      const { speed, phase } = PULSES[i];
      const u = reduceMotion ? phase : (t * speed + phase) % 1;
      m.position.y = TOP_Y - u * (TOP_Y - BOTTOM_Y);
      m.scale.setScalar(0.25 + Math.sin(u * Math.PI) * 0.75);
    });

    if (group.current) {
      const targetY =
        -0.65 + Math.sin(t * 0.25) * 0.3 + pointer.current.x * 0.3;
      const targetX = 0.42 - pointer.current.y * 0.15;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetY,
        0.05,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetX,
        0.05,
      );
      group.current.position.y = Math.sin(t * 0.7) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={connectors}>
        <lineBasicMaterial color="#cbd5e1" transparent opacity={0.28} />
      </lineSegments>

      {/* Frontend */}
      <Layer y={LAYERS[0].y} color={LAYERS[0].color} label={LAYERS[0].label}>
        <Block
          position={[-0.85, 0.1, -0.75]}
          size={[1.2, 0.12, 0.75]}
          color={LAYERS[0].color}
        />
        <Block
          position={[0.75, 0.1, -0.75]}
          size={[0.95, 0.12, 0.75]}
          color={LAYERS[0].color}
        />
        <Block
          position={[0, 0.1, 0.6]}
          size={[2.5, 0.12, 0.65]}
          color={LAYERS[0].color}
        />
      </Layer>

      {/* Backend */}
      <Layer y={LAYERS[1].y} color={LAYERS[1].color} label={LAYERS[1].label}>
        <ApiNodes color={LAYERS[1].color} />
      </Layer>

      {/* Database */}
      <Layer y={LAYERS[2].y} color={LAYERS[2].color} label={LAYERS[2].label}>
        {[0.1, 0.23, 0.36].map((h) => (
          <Disk
            key={h}
            position={[-0.55, h, 0]}
            radius={0.62}
            color={LAYERS[2].color}
          />
        ))}
        {[0.1, 0.23].map((h) => (
          <Disk
            key={h}
            position={[0.85, h, 0.5]}
            radius={0.42}
            color={LAYERS[2].color}
          />
        ))}
      </Layer>

      {/* Pulses */}
      {PULSES.map((p, i) => (
        <group
          key={i}
          position={[p.x, TOP_Y, p.z]}
          ref={(el) => (pulseRefs.current[i] = el)}
        >
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial
              color="#22d3ee"
              transparent
              opacity={0.3}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Hero Banner                                                        */
/* ------------------------------------------------------------------ */
export default function HeroBanner() {
  const root = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useGSAP(
    () => {
      gsap.fromTo(
        ".animate-text > *",
        { autoAlpha: 0, y: 50, filter: "blur(12px)", skewY: 2 },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          skewY: 0,
          duration: 1.8,
          stagger: 0.12,
          ease: "power4.out",
          force3D: true,
          clearProps: "filter,transform",
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-[90vh] overflow-hidden bg-[#04060d]"
      style={{ padding: "2rem 6vw", boxSizing: "border-box" }}
    >
      <HeroBackdrop />

      {/* Text Container */}
      <div
        style={{
          flex: "1 1 300px",
          zIndex: 2,
          padding: "1rem 0",
        }}
        className="text-luxury-muted animate-text hero-font-main"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 hero-font-mono text-xs text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Available for New Projects
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2">
          HI<span className="text-luxury-gold">.</span>
        </h1>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            lineHeight: 1.1,
          }}
          className="font-extrabold tracking-tight text-white mb-6"
        >
          <span>I'm</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-600">
            Gibin Sunny
          </span>
        </h1>

        <p
          style={{
            maxWidth: 520,
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            lineHeight: 1.6,
          }}
          className="text-slate-300 font-normal mb-8"
        >
          Full-Stack Developer engineering{" "}
          <span className="text-white font-medium">
            high-performance web apps
          </span>
          , immersive interactive experiences, and robust backend architectures.
        </p>

        <div className="btncomp mt-2">
          <Buttons />
        </div>
      </div>

      {/* 3D Geometry Container */}
      <div
        style={{
          flex: "1 1 300px",
          height: isMobile ? "45vh" : "80vh",
          minHeight: "280px",
          width: "100%",
          position: "relative",
          zIndex: 2,
          cursor: "grab",
        }}
        className="active:cursor-grabbing"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18) 0%, rgba(99,102,241,0.10) 35%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />
        <Canvas
          camera={{ position: [0, 0, 9.5], fov: 40 }}
          dpr={[1, 2]}
          gl={{ alpha: true }}
        >
          <Suspense fallback={null}>
            <GeometryShape />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>
    </section>
  );
}