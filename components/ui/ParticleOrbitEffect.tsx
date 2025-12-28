import React, { useEffect, useRef, useCallback } from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface ParticleOrbitEffectProps {
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  radius?: number;
  particleSpeed?: number;
  radiusScale?: number;
  intensity?: number;
  fadeOpacity?: number;
  colorRange?: [number, number]; // HSL hue range
  disabled?: boolean;
  followMouse?: boolean;
  followSpeed?: number; // New prop for mouse follow responsiveness
  autoColors?: boolean;
  particleSize?: number;
}

interface Particle {
  size: number;
  position: { x: number; y: number };
  offset: { x: number; y: number };
  shift: { x: number; y: number };
  speed: number;
  targetSize: number;
  fillColor: string;
  orbit: number;
  hue: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

const ParticleOrbitEffect: React.FC<ParticleOrbitEffectProps> = ({
  className,
  style,
  particleCount = 25,
  radius = 70,
  particleSpeed = 0.025,
  radiusScale = 1.5,
  intensity = 1,
  fadeOpacity = 0.05,
  colorRange = [0, 360],
  disabled = false,
  followMouse = true,
  followSpeed = 0.1, // Default to much faster than particleSpeed
  autoColors = true,
  particleSize = 2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fix: Provide an initial value to useRef to avoid the "Expected 1 arguments, but got 0" error.
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    isDown: false,
    radiusScale: 1,
  });
  const colorTimerRef = useRef(0);
  
  // Destructure colorRange to avoid referential equality issues with array props
  const [minHue, maxHue] = colorRange;

  // Helper to generate HSL color
  const generateColor = useCallback((hue?: number) => {
    const h = hue ?? (minHue + Math.random() * (maxHue - minHue));
    // High saturation and lightness for visibility
    return `hsl(${h}, 100%, 70%)`;
  }, [minHue, maxHue]);

  // Create particles
  const createParticles = useCallback((initialX: number, initialY: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const hue = minHue + Math.random() * (maxHue - minHue);
      particles.push({
        size: particleSize,
        position: { x: initialX, y: initialY },
        offset: { x: 0, y: 0 },
        shift: { x: initialX, y: initialY },
        speed: particleSpeed + Math.random() * particleSpeed,
        targetSize: particleSize,
        fillColor: generateColor(hue),
        orbit: radius * 0.5 + radius * 0.5 * Math.random(),
        hue,
        trail: []
      });
    }
    return particles;
  }, [particleCount, particleSpeed, particleSize, radius, generateColor, minHue, maxHue]);

  // Update canvas dimensions
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use canvas parent dimensions or window as fallback
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    
    // Initialize mouse position to center
    if (!mouseRef.current.isDown && !followMouse) {
      mouseRef.current.x = width / 2;
      mouseRef.current.y = height / 2;
    } else if (!mouseRef.current.x && !mouseRef.current.y) {
       // Initial center if not set
       mouseRef.current.x = width / 2;
       mouseRef.current.y = height / 2;
    }
    
    // We don't recreate particles here to preserve state during resize, 
    // but we might want to if resolution changes drastically. 
    // For now, let's keep them and just ensure they exist.
    if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(mouseRef.current.x, mouseRef.current.y);
    }
  }, [createParticles, followMouse]);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Event handlers
    const handleMouseMove = (event: MouseEvent) => {
      if (!followMouse) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!followMouse || event.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.touches[0].clientX - rect.left;
      mouseRef.current.y = event.touches[0].clientY - rect.top;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      mouseRef.current.isDown = true;
      if (followMouse) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = event.touches[0].clientX - rect.left;
        mouseRef.current.y = event.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.isDown = false;
    };

    // Animation loop
    const draw = () => {
      if (!context || !canvas) return;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Update color timer for auto colors
      if (autoColors) {
        colorTimerRef.current += 0.016; // ~60fps
        if (colorTimerRef.current >= 2) { // Change colors every 2 seconds
          colorTimerRef.current = 0;
          particlesRef.current.forEach(particle => {
            particle.hue = minHue + Math.random() * (maxHue - minHue);
            particle.fillColor = generateColor(particle.hue);
          });
        }
      }

      // Animate radius scale
      const targetScale = mouseRef.current.isDown ? radiusScale : 1;
      mouseRef.current.radiusScale += (targetScale - mouseRef.current.radiusScale) * 0.02;

      // Clear canvas
      context.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];

        // Update particle orbital position (this is the rotation speed)
        particle.offset.x += particle.speed * intensity;
        particle.offset.y += particle.speed * intensity;
        
        // Smoothly follow mouse (this is the movement speed)
        // Decoupled from particle.speed to remove lag
        particle.shift.x += (mouseRef.current.x - particle.shift.x) * followSpeed;
        particle.shift.y += (mouseRef.current.y - particle.shift.y) * followSpeed;
        
        const orbitRadius = particle.orbit * mouseRef.current.radiusScale * intensity;
        particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * orbitRadius;
        particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * orbitRadius;

        // Update trail
        particle.trail.push({
          x: particle.position.x,
          y: particle.position.y,
          alpha: 1
        });

        // Limit trail length - Reduced for shorter orbit
        const maxTrailLength = Math.max(10, Math.floor(35 * intensity));
        if (particle.trail.length > maxTrailLength) {
          particle.trail.shift();
        }

        // Fade trail points
        particle.trail.forEach((point, index) => {
          // Reduced multiplier so tails fade naturally
          point.alpha = (index + 1) / particle.trail.length * fadeOpacity * 20;
        });

        // Draw trail
        if (particle.trail.length > 1) {
          context.beginPath();
          context.strokeStyle = particle.fillColor;
          // Draw trails with varying alpha
          for (let j = 1; j < particle.trail.length; j++) {
             const prev = particle.trail[j - 1];
             const curr = particle.trail[j];
             context.beginPath();
             context.lineWidth = particle.size * 0.6 * curr.alpha;
             context.globalAlpha = curr.alpha;
             context.moveTo(prev.x, prev.y);
             context.lineTo(curr.x, curr.y);
             context.stroke();
          }
        }

        // Animate particle size
        particle.size += (particle.targetSize - particle.size) * 0.05;
        if (Math.abs(particle.size - particle.targetSize) < 0.1) {
          particle.targetSize = particleSize + Math.random() * particleSize * 2;
        }

        // Draw main particle
        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.globalAlpha = 0.9;
        context.arc(
          particle.position.x,
          particle.position.y,
          particle.size * 0.5,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    // Initialize
    updateCanvasDimensions();

    // Add event listeners
    window.addEventListener("resize", updateCanvasDimensions);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    // Start animation
    animationRef.current = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", updateCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    disabled,
    followMouse,
    followSpeed,
    particleCount,
    radius,
    particleSpeed,
    radiusScale,
    intensity,
    fadeOpacity,
    minHue, 
    maxHue,
    autoColors,
    particleSize,
    updateCanvasDimensions,
    createParticles,
    generateColor
  ]);

  if (disabled) {
    return null;
  }

  return (
    <div className={cn("absolute top-0 left-0 w-full h-full pointer-events-none", className)}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={style}
        aria-hidden="true"
      />
    </div>
  );
};

export default ParticleOrbitEffect;