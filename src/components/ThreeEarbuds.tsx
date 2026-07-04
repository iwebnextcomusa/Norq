import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeEarbuds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2f80ed, 1.5); // Electric Blue Accent Light
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x2f80ed, 1, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // --- EARBUD 3D GEOMETRY ---
    // We construct a high-fidelity stylized wireless earbud
    const earbudGroup = new THREE.Group();

    // 1. Earbud Main Body (Ergonomic shell) - Matte Metallic Black
    const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    bodyGeometry.scale(1.2, 0.9, 0.9);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.25,
      metalness: 0.85,
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    earbudGroup.add(bodyMesh);

    // 2. Ear Tip (Silicone insert) - Translucent Dark Gray
    const tipGeometry = new THREE.CylinderGeometry(0.5, 0.8, 0.7, 32);
    const tipMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e2e2e,
      roughness: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const tipMesh = new THREE.Mesh(tipGeometry, tipMaterial);
    tipMesh.position.set(1.2, 0, 0.3);
    tipMesh.rotation.z = -Math.PI / 3;
    earbudGroup.add(tipMesh);

    // 3. Earbud Stem - Matte Black Cylindrical/Sleek Panel
    const stemGeometry = new THREE.CylinderGeometry(0.25, 0.2, 2.2, 32);
    const stemMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      roughness: 0.15,
      metalness: 0.95,
    });
    const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
    stemMesh.position.set(-0.6, -1.1, -0.2);
    stemMesh.rotation.z = Math.PI / 12;
    earbudGroup.add(stemMesh);

    // 4. Glowing Neon Electric Blue Ring (Accent element)
    const ringGeometry = new THREE.TorusGeometry(0.7, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x2f80ed,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(0, 0.1, 0.85); // Put on the outer face
    ringMesh.rotation.y = Math.PI / 12;
    earbudGroup.add(ringMesh);

    // 5. Metallic charging pins at the base of the stem
    const pinGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16);
    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold contacts
      roughness: 0.1,
      metalness: 1.0,
    });
    const pin1 = new THREE.Mesh(pinGeometry, pinMaterial);
    pin1.position.set(-0.8, -2.15, -0.25);
    pin1.rotation.z = Math.PI / 12;
    const pin2 = pin1.clone();
    pin2.position.x += 0.15;
    earbudGroup.add(pin1);
    earbudGroup.add(pin2);

    // Scale the whole group
    earbudGroup.scale.set(1.3, 1.3, 1.3);
    scene.add(earbudGroup);

    setLoading(false);

    // Mouse movement state
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalized coordinates (-1 to 1)
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    // Scroll trigger interaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Base rotation
      earbudGroup.rotation.y = elapsedTime * 0.4;
      
      // Scroll-triggered 3D movement/rotation
      const scrollRotation = scrollY * 0.0015;
      earbudGroup.rotation.x = scrollRotation;
      
      // Mouse lag/smooth follow (interpolation)
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;
      
      earbudGroup.rotation.y += targetX * 0.8;
      earbudGroup.rotation.z = targetY * 0.5;

      // Pulse the glow ring
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      ringMesh.scale.set(pulse, pulse, 1);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Clean up
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      tipGeometry.dispose();
      tipMaterial.dispose();
      stemGeometry.dispose();
      stemMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      pinGeometry.dispose();
      pinMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-visualizer-container"
      className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && (
        <div id="three-loading" className="absolute inset-0 flex items-center justify-center text-sm font-mono text-gray-400">
          Initializing 3D Visualizer...
        </div>
      )}
      
      <canvas ref={canvasRef} id="three-earbud-canvas" className="w-full h-full" />

      {/* Futuristic telemetry display (very elegant & minimal, not cluttered) */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-gray-500 bg-[#161616]/40 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/5 pointer-events-none">
        <div className="flex items-center gap-1.5 text-brand-accent">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
          </span>
          <span>NORQ-3D RENDERING ACTIVE</span>
        </div>
        <div className="mt-1 text-gray-400 font-sans">Move cursor inside grid to rotate</div>
      </div>
    </div>
  );
}
