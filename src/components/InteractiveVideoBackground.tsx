'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface InteractiveVideoBackgroundProps {
  videoSrc: string;
  hoveredSection?: string | null;
}

export function InteractiveVideoBackground({ videoSrc, hoveredSection }: InteractiveVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  const autoMouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, speed: 0.02 });
  const videoEffectsRef = useRef({ hue: 0, saturation: 1, brightness: 0.4, contrast: 1.1 });

  // Custom shader for video manipulation
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 mouse;
    uniform float glitchIntensity;
    uniform float colorShift;
    uniform float distortion;
    uniform vec3 sectionColor;
    varying vec2 vUv;

    // Random function for glitch effects
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Noise function
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;
      
      // Mouse-based distortion
      vec2 mouseInfluence = (mouse - 0.5) * 2.0;
      float mouseDist = length(mouseInfluence);
      
      // Distortion based on mouse position
      uv += sin(uv * 10.0 + time * 2.0) * distortion * mouseDist * 0.02;
      
      // Glitch effect - horizontal lines
      float glitchLine = step(0.98, sin(uv.y * 800.0 + time * 10.0));
      uv.x += glitchLine * glitchIntensity * 0.1 * sin(time * 20.0);
      
      // RGB shift based on mouse position
      float shift = colorShift * mouseDist * 0.01;
      vec4 r = texture2D(tDiffuse, uv + vec2(shift, 0.0));
      vec4 g = texture2D(tDiffuse, uv);
      vec4 b = texture2D(tDiffuse, uv - vec2(shift, 0.0));
      
      vec4 color = vec4(r.r, g.g, b.b, 1.0);
      
      // Add noise
      float n = noise(uv * 100.0 + time) * 0.1;
      color.rgb += n * glitchIntensity;
      
      // Section color influence
      color.rgb = mix(color.rgb, sectionColor, 0.1 * glitchIntensity);
      
      // VHS-style scanlines
      float scanline = sin(uv.y * 800.0) * 0.04;
      color.rgb -= scanline;
      
      // Brightness and contrast adjustments
      color.rgb = color.rgb * 1.2 - 0.1;
      
      gl_FragColor = color;
    }
  `;

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Create video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    videoRef.current = video;

    // Debug video loading
    video.addEventListener('loadstart', () => console.log('Video loading started'));
    video.addEventListener('canplay', () => console.log('Video can play'));
    video.addEventListener('error', (e) => console.error('Video error:', e));

    // Try to play the video
    video.play().catch(e => console.error('Video play error:', e));

    // Create Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    containerRef.current.appendChild(renderer.domElement);

    // Create video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;

    console.log('Video texture created:', videoTexture);

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: videoTexture },
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        glitchIntensity: { value: 0.0 },
        colorShift: { value: 0.0 },
        distortion: { value: 0.0 },
        sectionColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) }
      },
      vertexShader,
      fragmentShader
    });
    materialRef.current = material;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - (event.clientY / window.innerHeight);

      // Update video effects based on mouse position
      const effects = videoEffectsRef.current;
      effects.hue = mouseRef.current.x * 360; // 0-360 degrees
      effects.saturation = 0.5 + mouseRef.current.y * 2.5; // 0.5-3.0
      effects.brightness = 0.2 + mouseRef.current.x * 0.6; // 0.2-0.8
      effects.contrast = 0.8 + mouseRef.current.y * 1.5; // 0.8-2.3

      if (materialRef.current) {
        materialRef.current.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);

        // Increase effects based on mouse movement
        const mouseSpeed = Math.abs(event.movementX) + Math.abs(event.movementY);
        materialRef.current.uniforms.glitchIntensity.value = Math.min(mouseSpeed * 0.02, 2.0);
        materialRef.current.uniforms.colorShift.value = mouseSpeed * 0.15;
        materialRef.current.uniforms.distortion.value = mouseSpeed * 0.08;
      }
    };

    // Resize handler
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value += 0.01;

        // Automatic random mouse movement
        const autoMouse = autoMouseRef.current;

        // Generate new random target every few seconds
        if (Math.random() < 0.005) { // ~0.5% chance per frame = new target every ~3-4 seconds
          autoMouse.targetX = Math.random();
          autoMouse.targetY = Math.random();
          autoMouse.speed = 0.01 + Math.random() * 0.03; // Random speed between 0.01-0.04
        }

        // Smoothly move towards target
        autoMouse.x += (autoMouse.targetX - autoMouse.x) * autoMouse.speed;
        autoMouse.y += (autoMouse.targetY - autoMouse.y) * autoMouse.speed;

        // Apply automatic mouse effects
        const intensity = Math.sin(materialRef.current.uniforms.time.value * 0.5) * 0.5 + 0.5;
        const mouseDistance = Math.sqrt(
          Math.pow(autoMouse.x - 0.5, 2) + Math.pow(autoMouse.y - 0.5, 2)
        );

        // Create random video effects based on auto mouse position
        materialRef.current.uniforms.glitchIntensity.value = mouseDistance * intensity * 2.0;
        materialRef.current.uniforms.colorShift.value = Math.sin(autoMouse.x * Math.PI) * intensity;
        materialRef.current.uniforms.distortion.value = Math.cos(autoMouse.y * Math.PI) * intensity * 0.5;

        // Random color shifts
        if (Math.random() < 0.01) { // 1% chance per frame for color burst
          materialRef.current.uniforms.colorShift.value += Math.random() * 2.0 - 1.0;
        }

        // Random glitch bursts
        if (Math.random() < 0.008) { // 0.8% chance per frame for glitch burst
          materialRef.current.uniforms.glitchIntensity.value += Math.random() * 3.0;
        }

        // Apply continuous video effects based on mouse + auto effects
        const effects = videoEffectsRef.current;
        const autoHue = Math.sin(materialRef.current.uniforms.time.value * 0.3) * 180; // -180 to 180
        const autoSat = 1 + Math.cos(materialRef.current.uniforms.time.value * 0.4) * 0.8; // 0.2 to 1.8

        const finalHue = effects.hue + autoHue;
        const finalSat = Math.max(0.1, effects.saturation * autoSat);
        const finalBrightness = effects.brightness + Math.sin(materialRef.current.uniforms.time.value * 0.2) * 0.2;
        const finalContrast = effects.contrast + Math.cos(materialRef.current.uniforms.time.value * 0.25) * 0.3;

        if (videoRef.current) {
          videoRef.current.style.filter = `
            hue-rotate(${finalHue}deg)
            saturate(${finalSat})
            brightness(${Math.max(0.1, finalBrightness)})
            contrast(${Math.max(0.5, finalContrast)})
          `;
        }

        // Random extreme effects bursts
        if (Math.random() < 0.003) { // 0.3% chance per frame for extreme burst
          const extremeHue = Math.random() * 360;
          const extremeSat = 2 + Math.random() * 3; // 2-5
          const extremeBrightness = 0.5 + Math.random() * 0.8;
          const extremeContrast = 1.5 + Math.random() * 1.5;

          if (videoRef.current) {
            videoRef.current.style.filter = `
              hue-rotate(${extremeHue}deg)
              saturate(${extremeSat})
              brightness(${extremeBrightness})
              contrast(${extremeContrast})
            `;
          }
        }
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start video and animation when video loads
    video.addEventListener('loadeddata', () => {
      animate();
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
    } catch (error) {
      console.error('Three.js video background failed:', error);
      setFallbackMode(true);
    }
  }, [videoSrc]);

  // Update section color when hoveredSection changes
  useEffect(() => {
    if (materialRef.current && hoveredSection) {
      const sectionColors: { [key: string]: THREE.Vector3 } = {
        glitchmouth: new THREE.Vector3(1.0, 0.0, 0.5), // Pink
        outloud: new THREE.Vector3(0.0, 1.0, 0.25),    // Green
        blurredmap: new THREE.Vector3(1.0, 1.0, 0.0),  // Yellow
        looprot: new THREE.Vector3(1.0, 0.4, 0.0),     // Orange
        scrapfile: new THREE.Vector3(0.0, 1.0, 1.0),   // Cyan
        textwreck: new THREE.Vector3(1.0, 0.2, 0.2),   // Red
      };
      
      const color = sectionColors[hoveredSection] || new THREE.Vector3(1.0, 1.0, 1.0);
      materialRef.current.uniforms.sectionColor.value = color;
      materialRef.current.uniforms.glitchIntensity.value = 0.5;
    } else if (materialRef.current) {
      materialRef.current.uniforms.sectionColor.value = new THREE.Vector3(1.0, 1.0, 1.0);
    }
  }, [hoveredSection]);

  // Fallback to regular video if Three.js fails
  if (fallbackMode) {
    return (
      <>
        <video
          className="fixed inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            zIndex: -10,
            filter: 'hue-rotate(0deg) saturate(1.5) brightness(0.4) contrast(1.2)',
          }}
        />
        {/* Black overlay */}
        <div
          className="fixed inset-0 w-full h-full bg-black"
          style={{ zIndex: -9, opacity: 0.6 }}
        />
      </>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: -10 }}
      />
      {/* Black overlay */}
      <div
        className="fixed inset-0 w-full h-full bg-black"
        style={{ zIndex: -9, opacity: 0.6 }}
      />
    </>
  );
}
