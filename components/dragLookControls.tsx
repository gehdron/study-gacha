"use client"

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export default function DragLookControls() {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const yaw = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;

    function handlePointerDown(e: PointerEvent) {
      isDragging.current = true;
      lastX.current = e.clientX;
    }

    function handlePointerUp() {
      isDragging.current = false;
    }

    function handlePointerMove(e: PointerEvent) {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastX.current;
      lastX.current = e.clientX;

      const sensitivity = 0.0025;
      yaw.current += deltaX * sensitivity;
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl]);

  useFrame(() => {
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
  });

  return null;
}