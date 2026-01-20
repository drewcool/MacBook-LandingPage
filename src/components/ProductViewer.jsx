import React, { useEffect, useRef, useState } from "react";
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas, useThree } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import MacbookModel14 from "./models/Macbook-14";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

// FPS Limiter - 30fps when idle, 60fps when interacting
function FPSLimiter({ targetFPS, isActive }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (!isActive) {
      // Use default 60fps when interacting
      gl.setAnimationLoop(null);
      return;
    }

    // Manual 30fps loop when idle
    let lastTime = 0;
    const interval = 1000 / targetFPS;

    const animate = (time) => {
      if (time - lastTime >= interval) {
        gl.render(scene, camera);
        lastTime = time - ((time - lastTime) % interval);
      }
    };

    gl.setAnimationLoop(animate);

    return () => {
      gl.setAnimationLoop(null);
    };
  }, [gl, scene, camera, targetFPS, isActive]);

  return null;
}

const ProductViewer = () => {
  const { color, setColor, scale, setScale } = useMacbookStore();
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const handleInteractionStart = () => {
    setIsInteracting(true);

    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }

    // Return to 30fps after 2 seconds of no interaction
    interactionTimeout.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
    };
  }, []);

  return (
    <section id="product-viewer">
      <h2 className="text-center">Take a closer look.</h2>

      <div className="controls">
        <p className="info">
          MacbookPro | Available in 14" and 16" in Space Gray & Dark
        </p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor("#adb5bd")}
              className={clsx(
                "bg-neutral-300",
                color === "#adb5bd" && "active",
              )}
            />
            <div
              onClick={() => setColor("#2e2c2e")}
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active",
              )}
            />
          </div>

          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>14"</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>
      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 1000 }}
        frameloop={isInteracting ? "always" : "never"}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onPointerMove={handleInteractionStart}
        onPointerDown={handleInteractionStart}
        onWheel={handleInteractionStart}
      >
        <FPSLimiter targetFPS={30} isActive={!isInteracting} />
        <StudioLights />
        <ModelSwitcher
          scale={isMobile ? scale - 0.03 : scale}
          isMobile={isMobile}
        />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
