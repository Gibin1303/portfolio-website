import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Buttons from "./Buttons";
import "../styles/hero.css";
import { useStackedSlides } from "../hooks/gasp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Model() {
  const { scene } = useGLTF("/earth.glb");
  const modelRef = useRef();
  const { viewport } = useThree();

  // Responsive scale based on canvas viewport width rather than window.innerWidth
  // const scale = viewport.width < 5 ? 1.2 : 1.8;

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
      const isMobile = window.innerWidth <= 768;

      const currentScale = isMobile ? 1.3 : 1.5;

      modelRef.current.scale.setScalar(currentScale);
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

export default function App() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const root = useRef(null);

  // Animate the children inside .animate-text (h1, p, buttons)
  // useGSAP(
  //   () => {
  //     gsap.from(".animate-text > *", {
  //       autoAlpha: 0,
  //       x:-400,
  //       duration: 1.8,
  //       // stagger: 0.8,
  //       ease: "power3.out",
  //     });
  //   },
  //   { scope: root },
  // );

  // useGSAP(
  //   () => {
  //     // 1. Slow Entrance
  //     gsap.from(".animate-text > *", {
  //       autoAlpha: 0,
  //       y: 500,
  //       duration: 2.2,
  //       // ease: "power2.out",
  //       ease: "expo.out", // High initial velocity that glides smoothly to a stop
  //       force3D: true,
  //     });
  //   },
  //   { scope: root },
  // );

  useGSAP(
    () => {
      gsap.fromTo(
        ".animate-text > *",
        {
          autoAlpha: 0,
          y: 50, // Reduced from 500 to 50 for controlled elegance
          filter: "blur(12px)", // Lens focus transition
          skewY: 2, // Subtle kinetic weight
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(-5px)",
          skewY: 0,
          duration: 1.8,
          stagger: 0.12, // Fluid sequence (Header -> Paragraph -> Buttons)
          ease: "power4.out", // Smooth deceleration curve
          force3D: true,
          clearProps: "filter,transform", // Cleans inline CSS after animation finishes
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-center",
        // height: "100vh",
        width: "100%",
        padding: "2rem 6vw",
        boxSizing: "border-box",
      }}
    >
      {/* Text Container */}
      <div
        style={{
          flex: "1 1 300px",
          fontFamily: "monospace",
          zIndex: 2,
          padding: "1rem 0",
        }}
        className=" text-luxury-muted animate-text"
      >
        <h1 className="text-7xl font-bold">H<span className="text-luxury-gold font-bold">I</span>,</h1>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            margin: "0 0 1rem 0",
            lineHeight: 1.1,
          }}
        >
          <span>I'm</span>{"  "}
          <span className="text-8xl font-extrabold text-luxury-gold">
            Gibin
          </span>
        </h1>
        <p
          style={{
            maxWidth: 500,
            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
            lineHeight: 1.5,
          }}
          className="text-luxury-muted"
        >
          I am a Web developer from Kerala. I strive to push my work to new
          horizons.
        </p>
        <div className="btncomp">
          <Buttons />
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        style={{
          flex: "1 1 300px",
          height: isMobile ? "45vh" : "80vh",
          minHeight: "280px",
          width: "100%",
          position: "relative",
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </section>
  );
}

useGLTF.preload("/earth.glb");
