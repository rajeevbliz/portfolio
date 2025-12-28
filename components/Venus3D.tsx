
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Venus3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  // Robust and SILENT check for WebGL support.
  // This avoids triggering the THREE.WebGLRenderer internal logs if we find it's likely to fail.
  const checkWebGLSupport = () => {
    if (typeof window === 'undefined' || !window.WebGLRenderingContext) return false;
    
    const canvas = document.createElement('canvas');
    const options = { 
      failIfMajorPerformanceCaveat: true,
      // Some old Intel GPUs fail on WebGL2 but might handle WebGL1
    };
    
    try {
      // Try WebGL 2 first
      let gl = canvas.getContext('webgl2', options) || 
               canvas.getContext('webgl', options) || 
               canvas.getContext('experimental-webgl', options);
      
      const supported = !!gl;
      
      // Clean up the context immediately to free resources
      if (gl) {
        const loseContext = (gl as any).getExtension('WEBGL_lose_context');
        if (loseContext) loseContext.loseContext();
      }
      
      return supported;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const isSupported = checkWebGLSupport();
    if (!isSupported) {
      setWebGLSupported(false);
      return;
    }

    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let frameId: number;

    try {
      // Instantiate renderer with conservative settings for broader compatibility
      renderer = new THREE.WebGLRenderer({ 
        antialias: false, // Safer for older integrated GPUs
        alpha: true, 
        failIfMajorPerformanceCaveat: true,
        precision: 'mediump', // Lower precision is often more stable on old hardware
        powerPreference: 'low-power' 
      });
      
      setWebGLSupported(true);
    } catch (e) {
      // Catch any unexpected initialization errors that slipped past the check
      console.warn("Venus3D: WebGL secondary initialization failed:", e);
      setWebGLSupported(false);
      return;
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 25;

    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Force 1:1 pixel ratio for maximum stability on low-end hardware
    containerRef.current.appendChild(renderer.domElement);

    // Create morphing line structure (optimized count)
    const segments = 60; 
    const rings = 30; 
    const initialPositions = new Float32Array(segments * rings * 3);
    
    for (let r = 0; r < rings; r++) {
      const y = (r / rings - 0.5) * 20;
      for (let s = 0; s < segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        const radius = 6 + Math.sin(r * 0.2) * 2;
        const idx = (r * segments + s) * 3;
        initialPositions[idx] = Math.cos(angle) * radius;
        initialPositions[idx + 1] = y;
        initialPositions[idx + 2] = Math.sin(angle) * radius;
      }
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.3,
    });

    const lineGroups: THREE.LineLoop[] = [];
    for (let r = 0; r < rings; r++) {
      const ringGeom = new THREE.BufferGeometry();
      const ringPositions = new Float32Array(segments * 3);
      for (let s = 0; s < segments; s++) {
        const idx = (r * segments + s) * 3;
        ringPositions[s * 3] = initialPositions[idx];
        ringPositions[s * 3 + 1] = initialPositions[idx + 1];
        ringPositions[s * 3 + 2] = initialPositions[idx + 2];
      }
      ringGeom.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
      const line = new THREE.LineLoop(ringGeom, lineMaterial.clone());
      lineGroups.push(line);
      scene.add(line);
    }

    let time = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.008;

      lineGroups.forEach((line, r) => {
        const pos = line.geometry.attributes.position.array as Float32Array;
        const opacity = (Math.sin(time + r * 0.1) + 1) / 2 * 0.3 + 0.1;
        (line.material as THREE.LineBasicMaterial).opacity = opacity;

        for (let s = 0; s < segments; s++) {
          const angle = (s / segments) * Math.PI * 2 + time * 0.15;
          const noise = Math.sin(time + r * 0.4) * 0.3;
          const radius = 7 + Math.sin(r * 0.15 + time) * 2.5 + Math.cos(angle * 2 + time) * 1.2;
          
          pos[s * 3] = Math.cos(angle) * radius;
          pos[s * 3 + 1] = (r / rings - 0.5) * 22 + noise;
          pos[s * 3 + 2] = Math.sin(angle) * radius;
        }
        line.geometry.attributes.position.needsUpdate = true;
        line.rotation.y += 0.0005;
      });

      if (renderer) renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        try {
          renderer.forceContextLoss();
        } catch(e) {}
      }
      lineMaterial.dispose();
      lineGroups.forEach(l => {
        l.geometry.dispose();
        (l.material as THREE.LineBasicMaterial).dispose();
      });
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  if (webGLSupported === false) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-3xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
        <div className="text-center p-8">
          <div className="w-12 h-12 border-2 border-zinc-300 dark:border-zinc-700 rounded-full mx-auto mb-6 flex items-center justify-center opacity-50">
            <span className="text-xs font-bold text-zinc-400">3D</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs font-serif italic max-w-[220px] mx-auto">
            Interactive 3D visualization is unavailable. Your hardware or browser may not support WebGL acceleration.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
};

export default Venus3D;
