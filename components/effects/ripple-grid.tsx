"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type RippleGridProps = {
  enableRainbow?: boolean;
  gridColor?: string;
  rippleIntensity?: number;
  gridSize?: number;
  gridThickness?: number;
  fadeDistance?: number;
  vignetteStrength?: number;
  glowIntensity?: number;
  opacity?: number;
  gridRotation?: number;
  mouseInteraction?: boolean;
  mouseInteractionRadius?: number;
};

const defaultProps: Required<RippleGridProps> = {
  enableRainbow: false,
  gridColor: "#f97316",
  rippleIntensity: 0.05,
  gridSize: 10,
  gridThickness: 15,
  fadeDistance: 1.5,
  vignetteStrength: 2,
  glowIntensity: 0.2,
  opacity: 0.85,
  gridRotation: 0,
  mouseInteraction: true,
  mouseInteractionRadius: 1,
};

export function RippleGrid(props: RippleGridProps) {
  const options = { ...defaultProps, ...props };
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);
  const uniformsRef = useRef<any>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
          ]
        : [1, 1, 1];
    };

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      premultipliedAlpha: true,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const vert = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
    `;

    const frag = `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform bool enableRainbow;
    uniform vec3 gridColor;
    uniform float rippleIntensity;
    uniform float gridSize;
    uniform float gridThickness;
    uniform float fadeDistance;
    uniform float vignetteStrength;
    uniform float glowIntensity;
    uniform float opacity;
    uniform float gridRotation;
    uniform bool mouseInteraction;
    uniform vec2 mousePosition;
    uniform float mouseInfluence;
    uniform float mouseInteractionRadius;
    varying vec2 vUv;

    const float PI = 3.14159265;

    mat2 rotate(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= iResolution.x / iResolution.y;

      if (gridRotation != 0.0) {
        uv = rotate(gridRotation * PI / 180.0) * uv;
      }

      float dist = length(uv);
      float wave = sin(PI * (iTime - dist));
      vec2 rippleUv = uv + uv * wave * rippleIntensity;

      if (mouseInteraction && mouseInfluence > 0.0) {
        vec2 mUv = (mousePosition * 2.0 - 1.0);
        mUv.x *= iResolution.x / iResolution.y;
        float mouseDist = length(uv - mUv);
        float influence = mouseInfluence *
          exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
        float mouseWave = sin(PI * (iTime * 2.0 - mouseDist * 3.0)) * influence;
        rippleUv += normalize(uv - mUv) * mouseWave * rippleIntensity * 0.3;
      }

      vec2 a = sin(gridSize * 0.5 * PI * rippleUv - PI / 2.0);
      vec2 b = abs(a);
      float aaWidth = 0.5;
      vec2 smoothB = vec2(
        smoothstep(0.0, aaWidth, b.x),
        smoothstep(0.0, aaWidth, b.y)
      );

      vec3 color = vec3(0.0);
      color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(PI * iTime)));
      color += exp(-gridThickness * smoothB.y);
      color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
      color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

      if (glowIntensity > 0.0) {
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
        color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
      }

      float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
      vec2 vignetteCoords = vUv - 0.5;
      float vignetteDistance = length(vignetteCoords);
      float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
      vignette = clamp(vignette, 0.0, 1.0);

      vec3 tint = enableRainbow
        ? vec3(
            uv.x * 0.5 + 0.5 * sin(iTime),
            uv.y * 0.5 + 0.5 * cos(iTime),
            pow(cos(iTime), 4.0)
          ) + 0.5
        : gridColor;

      float finalFade = ddd * vignette;
      float alpha = length(color) * finalFade * opacity;
      gl_FragColor = vec4(color * tint * finalFade * opacity, alpha);
    }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      enableRainbow: { value: options.enableRainbow },
      gridColor: { value: hexToRgb(options.gridColor) },
      rippleIntensity: { value: options.rippleIntensity },
      gridSize: { value: options.gridSize },
      gridThickness: { value: options.gridThickness },
      fadeDistance: { value: options.fadeDistance },
      vignetteStrength: { value: options.vignetteStrength },
      glowIntensity: { value: options.glowIntensity },
      opacity: { value: options.opacity },
      gridRotation: { value: options.gridRotation },
      mouseInteraction: { value: options.mouseInteraction },
      mousePosition: { value: [0.5, 0.5] },
      mouseInfluence: { value: 0 },
      mouseInteractionRadius: { value: options.mouseInteractionRadius },
    };

    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      renderer.setSize(width, height);
      uniforms.iResolution.value = [width, height];
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!options.mouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      targetMouseRef.current = { x, y };
    };

    const handleMouseEnter = () => {
      if (!options.mouseInteraction) return;
      mouseInfluenceRef.current = 1;
    };

    const handleMouseLeave = () => {
      if (!options.mouseInteraction) return;
      mouseInfluenceRef.current = 0;
    };

    window.addEventListener("resize", resize);
    if (options.mouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    resize();

    const render = (time: number) => {
      uniforms.iTime.value = time * 0.001;
      const lerp = 0.1;
      mousePositionRef.current.x += (targetMouseRef.current.x - mousePositionRef.current.x) * lerp;
      mousePositionRef.current.y += (targetMouseRef.current.y - mousePositionRef.current.y) * lerp;

      uniforms.mousePosition.value = [mousePositionRef.current.x, mousePositionRef.current.y];
      uniforms.mouseInfluence.value +=
        (mouseInfluenceRef.current - uniforms.mouseInfluence.value) * 0.05;

      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (options.mouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeChild(canvas);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [options.enableRainbow, options.mouseInteraction, options.mouseInteractionRadius, options.gridRotation, options.glowIntensity, options.gridThickness, options.fadeDistance, options.gridColor, options.gridSize, options.opacity, options.rippleIntensity, options.vignetteStrength]);

  useEffect(() => {
    if (!uniformsRef.current) return;

    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
          ]
        : [1, 1, 1];
    };

    uniformsRef.current.enableRainbow.value = options.enableRainbow;
    uniformsRef.current.gridColor.value = hexToRgb(options.gridColor);
    uniformsRef.current.rippleIntensity.value = options.rippleIntensity;
    uniformsRef.current.gridSize.value = options.gridSize;
    uniformsRef.current.gridThickness.value = options.gridThickness;
    uniformsRef.current.fadeDistance.value = options.fadeDistance;
    uniformsRef.current.vignetteStrength.value = options.vignetteStrength;
    uniformsRef.current.glowIntensity.value = options.glowIntensity;
    uniformsRef.current.opacity.value = options.opacity;
    uniformsRef.current.gridRotation.value = options.gridRotation;
    uniformsRef.current.mouseInteraction.value = options.mouseInteraction;
    uniformsRef.current.mouseInteractionRadius.value = options.mouseInteractionRadius;
  }, [options]);

  return <div ref={containerRef} className="relative h-full w-full" />;
}
