import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import logoImg from "../../assets/images/branding/simba-logo.jpg";
import { SEQUENCE_SERVICES } from "../../config/sequences.config";
import sequencePreloader from "../../utils/sequencePreloader";
import Studio3DEnvironment from "./Studio3DEnvironment";

gsap.registerPlugin(ScrollTrigger);

// Service scroll ranges across the master 0.0 -> 1.0 pinned timeline
const SERVICE_RANGES = [
  { id: "led", start: 0.04, end: 0.19, index: 0 },
  { id: "van", start: 0.19, end: 0.34, index: 1 },
  { id: "teacup", start: 0.34, end: 0.49, index: 2 },
  { id: "digital", start: 0.49, end: 0.64, index: 3 },
  { id: "website", start: 0.64, end: 0.79, index: 4 },
  { id: "film", start: 0.79, end: 0.94, index: 5 },
];

/**
 * CinematicHeroScrollytelling — Real-World 3D Cinematic Web Experience.
 *
 * Implements:
 * - Real-time Three.js WebGL Studio Environment with reflective floor, orbital rings, and volumetric lights
 * - Sub-pixel HTML5 Canvas sequence renderer with border-feathering (zero visible rectangular image boundary)
 * - Ground contact shadows and floor reflections beneath physical product objects
 * - Non-overlapping editorial typography HUD with unobstructed product focus
 * - Continuous 6-Service camera and sequence choreography controlled by GSAP ScrollTrigger
 * - Seamless Opening Hero Reveal & Final Brand Climax
 */
const CinematicHeroScrollytelling = ({ onOpenQuote, onExploreServices }) => {
  const pinSectionRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mobileCanvasRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const dockScrollRef = useRef(null);
  const dockButtonRefs = useRef([]);
  const offscreenCanvasRef = useRef(null);
  const rafRef = useRef(null);

  // Scroll and stage states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [serviceLocalProgress, setServiceLocalProgress] = useState(0);
  const [isOpeningVisible, setIsOpeningVisible] = useState(true);
  const [isClimaxVisible, setIsClimaxVisible] = useState(false);

  // Keep refs for drawFrameToTarget so it reads fresh values without recreating the function
  const isOpeningRef = useRef(true);
  const scrollPRef = useRef(0);
  useEffect(() => {
    isOpeningRef.current = isOpeningVisible;
    scrollPRef.current = scrollProgress;
  }, [isOpeningVisible, scrollProgress]);

  // Set body attribute while scrollytelling services are active so floating elements (e.g. WhatsApp button on mobile) can yield
  useEffect(() => {
    const isServiceActive = !isOpeningVisible && !isClimaxVisible;
    if (typeof document !== "undefined") {
      if (isServiceActive) {
        document.body.setAttribute("data-scrollytelling-services", "true");
      } else {
        document.body.removeAttribute("data-scrollytelling-services");
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.removeAttribute("data-scrollytelling-services");
      }
    };
  }, [isOpeningVisible, isClimaxVisible]);

  // Initialize offscreen canvas once
  useEffect(() => {
    if (!offscreenCanvasRef.current && typeof document !== "undefined") {
      offscreenCanvasRef.current = document.createElement("canvas");
    }
  }, []);

  // Initialize and prioritize preloading
  useEffect(() => {
    // 1. Initialize all 6 sequences so frame 1 is ready
    SEQUENCE_SERVICES.forEach((srv) => {
      sequencePreloader.initSequence(srv);
    });

    // 2. High priority for Service 01 (LED Billboard)
    sequencePreloader.preloadSequencePriority(SEQUENCE_SERVICES[0], "high");

    // 3. Staggered background preloading for subsequent services
    const timer = setTimeout(() => {
      sequencePreloader.preloadSequencePriority(SEQUENCE_SERVICES[1], "medium");
      sequencePreloader.preloadSequencePriority(SEQUENCE_SERVICES[2], "low");
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Cache container dimensions to prevent layout thrashing (getBoundingClientRect) during fast scrolling
  const containerSizeRef = useRef({ w: 0, h: 0 });
  const mobileContainerSizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        containerSizeRef.current = { w: r.width, h: r.height };
      }
      if (mobileContainerRef.current) {
        const mr = mobileContainerRef.current.getBoundingClientRect();
        mobileContainerSizeRef.current = { w: mr.width, h: mr.height };
      }
    };
    updateSizes();
    window.addEventListener("resize", updateSizes, { passive: true });
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  // Main frame rendering function to draw feathered product, shadow, reflection, and seamless 3D transitions
  const drawFrameToTarget = useCallback((canvas, container, srvIndex, localP, isDesktop) => {
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Use cached dimensions to prevent forced reflow / layout thrashing during fast scrolling
    const cachedSize = isDesktop ? containerSizeRef.current : mobileContainerSizeRef.current;
    let cw = cachedSize.w;
    let ch = cachedSize.h;
    if (cw === 0 || ch === 0) {
      const rect = container.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      if (isDesktop) containerSizeRef.current = { w: cw, h: ch };
      else mobileContainerSizeRef.current = { w: cw, h: ch };
    }
    if (cw === 0 || ch === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cw * dpr);
    const targetH = Math.round(ch * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth boundary fade and drift (strictly renders only one service product at any time)
    const enterFade = localP < 0.06 ? localP / 0.06 : 1;
    const exitFade = localP > 0.94 && srvIndex < 5 ? (1.0 - localP) / 0.06 : 1;
    const opacity = Math.max(0, Math.min(1, enterFade * exitFade));
    const driftX = localP < 0.06
      ? (1.0 - enterFade) * (isDesktop ? 30 : 18)
      : localP > 0.94 && srvIndex < 5
      ? -(1.0 - exitFade) * (isDesktop ? 30 : 18)
      : 0;

    // Helper: Render an individual product instance into the shared studio
    const drawProductInstance = (idx, prog, opacity, scaleMult = 1, driftX = 0) => {
      if (opacity <= 0.005) return;
      const service = SEQUENCE_SERVICES[idx];
      if (!service) return;

      const { id, frameCount } = service;
      const clampedP = Math.max(0, Math.min(1, prog));
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(clampedP * (frameCount - 1))
      );

      const img = sequencePreloader.getFrame(id, frameIndex);
      if (!img) return;

      const nw = img.naturalWidth || 640;
      const nh = img.naturalHeight || 360;

      // 1. Offscreen Canvas Feathering: Multi-stop smooth falloff blends dark border into navy space
      // Eliminates rectangular image borders while keeping the central product 100% crisp and opaque
      const offscreen = offscreenCanvasRef.current || document.createElement("canvas");
      if (offscreen.width !== nw || offscreen.height !== nh) {
        offscreen.width = nw;
        offscreen.height = nh;
      }
      const offCtx = offscreen.getContext("2d", { alpha: true });
      offCtx.clearRect(0, 0, nw, nh);
      offCtx.drawImage(img, 0, 0, nw, nh);

      // Smooth Edge Feathering with multi-stop cubic falloff
      offCtx.globalCompositeOperation = "destination-in";

      // Horizontal mask (smooth 10% falloff at left and right borders)
      const maskX = offCtx.createLinearGradient(0, 0, nw, 0);
      maskX.addColorStop(0, "rgba(0, 0, 0, 0)");
      maskX.addColorStop(0.02, "rgba(0, 0, 0, 0.15)");
      maskX.addColorStop(0.06, "rgba(0, 0, 0, 0.65)");
      maskX.addColorStop(0.10, "rgba(0, 0, 0, 1)");
      maskX.addColorStop(0.90, "rgba(0, 0, 0, 1)");
      maskX.addColorStop(0.94, "rgba(0, 0, 0, 0.65)");
      maskX.addColorStop(0.98, "rgba(0, 0, 0, 0.15)");
      maskX.addColorStop(1, "rgba(0, 0, 0, 0)");
      offCtx.fillStyle = maskX;
      offCtx.fillRect(0, 0, nw, nh);

      // Vertical mask (smooth 12% falloff at top and bottom borders)
      const maskY = offCtx.createLinearGradient(0, 0, 0, nh);
      maskY.addColorStop(0, "rgba(0, 0, 0, 0)");
      maskY.addColorStop(0.03, "rgba(0, 0, 0, 0.2)");
      maskY.addColorStop(0.07, "rgba(0, 0, 0, 0.7)");
      maskY.addColorStop(0.12, "rgba(0, 0, 0, 1)");
      maskY.addColorStop(0.88, "rgba(0, 0, 0, 1)");
      maskY.addColorStop(0.93, "rgba(0, 0, 0, 0.7)");
      maskY.addColorStop(0.97, "rgba(0, 0, 0, 0.2)");
      maskY.addColorStop(1, "rgba(0, 0, 0, 0)");
      offCtx.fillStyle = maskY;
      offCtx.fillRect(0, 0, nw, nh);

      offCtx.globalCompositeOperation = "source-over";

      // 2. Spatial placement on canvas with contain-scaling
      let drawW, drawH, drawX, drawY;

      // Per-service mobile layout and reflection tuning:
      // Calibrates scale, contact baseline, reflection depth and reflection opacity individually per product
      const mobileTuning = [
        { scaleBoost: 1.05, baseRatio: 0.94, refDepth: 0.38, refAlpha: 0.25 }, // 01 LED Billboard (Wide frame)
        { scaleBoost: 1.03, baseRatio: 0.93, refDepth: 0.36, refAlpha: 0.23 }, // 02 Van (Grounded tires)
        { scaleBoost: 1.12, baseRatio: 0.92, refDepth: 0.38, refAlpha: 0.26 }, // 03 Tea Cup (Portrait cup)
        { scaleBoost: 1.08, baseRatio: 0.92, refDepth: 0.36, refAlpha: 0.25 }, // 04 Digital (Phone screen)
        { scaleBoost: 1.04, baseRatio: 0.93, refDepth: 0.36, refAlpha: 0.24 }, // 05 Laptop (Base chassis)
        { scaleBoost: 1.06, baseRatio: 0.94, refDepth: 0.40, refAlpha: 0.26 }, // 06 Film Camera (Benchmark)
      ];
      const tuning = mobileTuning[idx] || { scaleBoost: 1.04, baseRatio: 0.93, refDepth: 0.36, refAlpha: 0.24 };

      if (isDesktop) {
        // Desktop balanced composition: product occupies the right 58% stage
        // leaving intentional, comfortable negative space for left-side typography
        const maxStageW = canvas.width * 0.58;
        const maxStageH = canvas.height * 0.76;
        const scale = Math.min(maxStageW / nw, maxStageH / nh) * scaleMult;
        drawW = nw * scale;
        drawH = nh * scale;
        drawX = canvas.width * 0.96 - drawW + driftX;
        drawY = (canvas.height - drawH) / 2 - canvas.height * 0.01;
      } else {
        // Mobile portrait composition: upper 60-66% for main product, lower 34-40% for downward reflection
        const maxW = canvas.width * 0.96 * scaleMult * tuning.scaleBoost;
        const maxH = canvas.height * 0.64;
        const scale = Math.min(maxW / nw, maxH / nh);
        drawW = nw * scale;
        drawH = nh * scale;
        drawX = (canvas.width - drawW) / 2 + driftX;
        drawY = Math.max(2, (canvas.height * 0.64 - drawH) / 2);
      }

      ctx.save();
      ctx.globalAlpha = opacity;

      // 3. Physically Grounded Contact Shadows per Service
      const shadowCenterY = drawY + drawH * (isDesktop ? 0.94 : tuning.baseRatio);
      const centerX = drawX + drawW * 0.5;

      // Subtle localized floor bounce light matching the active service accent
      ctx.save();
      const floorBounce = ctx.createRadialGradient(
        centerX,
        shadowCenterY,
        drawW * 0.04,
        centerX,
        shadowCenterY,
        drawW * 0.38
      );
      const serviceGlowColors = [
        "rgba(255, 201, 40, 0.12)", // LED gold
        "rgba(232, 184, 63, 0.10)", // Van amber
        "rgba(245, 158, 11, 0.10)", // Tea Cup amber
        "rgba(56, 189, 248, 0.10)", // Digital cyan
        "rgba(96, 165, 250, 0.10)", // Website blue
        "rgba(255, 238, 219, 0.09)", // Film warm white
      ];
      floorBounce.addColorStop(0, serviceGlowColors[idx] || "rgba(255, 201, 40, 0.10)");
      floorBounce.addColorStop(0.5, "rgba(8, 19, 41, 0.05)");
      floorBounce.addColorStop(1, "rgba(5, 12, 24, 0)");
      ctx.fillStyle = floorBounce;
      ctx.beginPath();
      ctx.ellipse(centerX, shadowCenterY, drawW * 0.38, drawH * 0.07, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (idx === 0) {
        // LED BILLBOARD: Solid base shadow + 2 mounting support anchors + golden screen floor bounce
        const mainGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.42
        );
        mainGrad.addColorStop(0, "rgba(2, 6, 16, 0.95)");
        mainGrad.addColorStop(0.4, "rgba(4, 9, 22, 0.65)");
        mainGrad.addColorStop(0.8, "rgba(5, 12, 24, 0.18)");
        mainGrad.addColorStop(1, "rgba(5, 12, 24, 0)");
        ctx.fillStyle = mainGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.42, drawH * 0.075, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2 structural mounting legs
        const legY = shadowCenterY + drawH * 0.015;
        [drawX + drawW * 0.32, drawX + drawW * 0.68].forEach((lx) => {
          const legGrad = ctx.createRadialGradient(lx, legY, 0, lx, legY, drawW * 0.1);
          legGrad.addColorStop(0, "rgba(2, 5, 14, 0.9)");
          legGrad.addColorStop(1, "rgba(2, 5, 14, 0)");
          ctx.fillStyle = legGrad;
          ctx.beginPath();
          ctx.ellipse(lx, legY, drawW * 0.1, drawH * 0.035, 0, 0, Math.PI * 2);
          ctx.fill();
        });

        // Screen golden floor illumination
        const bounceGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY - drawH * 0.02,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.38
        );
        bounceGrad.addColorStop(0, "rgba(255, 201, 40, 0.20)");
        bounceGrad.addColorStop(0.5, "rgba(232, 184, 63, 0.08)");
        bounceGrad.addColorStop(1, "rgba(5, 12, 24, 0)");
        ctx.fillStyle = bounceGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.38, drawH * 0.09, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (idx === 1) {
        // MOBILE ADVERTISING VAN: Dual-axle front & rear wheel contact + underbody occlusion
        const underGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.45
        );
        underGrad.addColorStop(0, "rgba(2, 6, 16, 0.95)");
        underGrad.addColorStop(0.5, "rgba(3, 8, 20, 0.6)");
        underGrad.addColorStop(1, "rgba(5, 12, 24, 0)");
        ctx.fillStyle = underGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.45, drawH * 0.07, 0, 0, Math.PI * 2);
        ctx.fill();

        // Front & rear tire ground contact
        [drawX + drawW * 0.28, drawX + drawW * 0.72].forEach((tx) => {
          const tireGrad = ctx.createRadialGradient(
            tx,
            shadowCenterY + drawH * 0.01,
            0,
            tx,
            shadowCenterY + drawH * 0.01,
            drawW * 0.09
          );
          tireGrad.addColorStop(0, "rgba(1, 4, 10, 0.98)");
          tireGrad.addColorStop(0.6, "rgba(2, 6, 16, 0.7)");
          tireGrad.addColorStop(1, "rgba(2, 6, 16, 0)");
          ctx.fillStyle = tireGrad;
          ctx.beginPath();
          ctx.ellipse(tx, shadowCenterY + drawH * 0.01, drawW * 0.09, drawH * 0.035, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (idx === 2) {
        // TEA CUP: Circular presentation pedestal shadow
        const cupGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.26
        );
        cupGrad.addColorStop(0, "rgba(2, 6, 16, 0.96)");
        cupGrad.addColorStop(0.4, "rgba(4, 9, 22, 0.6)");
        cupGrad.addColorStop(1, "rgba(5, 12, 24, 0)");
        ctx.fillStyle = cupGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.26, drawH * 0.06, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (idx === 3) {
        // DIGITAL MARKETING: Smartphone base shadow + tech aura
        const phoneGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.28
        );
        phoneGrad.addColorStop(0, "rgba(2, 6, 16, 0.94)");
        phoneGrad.addColorStop(0.5, "rgba(4, 9, 22, 0.55)");
        phoneGrad.addColorStop(1, "rgba(5, 12, 24, 0)");
        ctx.fillStyle = phoneGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.28, drawH * 0.055, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (idx === 4) {
        // WEBSITE DEV: Laptop base shadow + keyboard bounce glow
        const lapGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.44
        );
        lapGrad.addColorStop(0, "rgba(2, 6, 16, 0.95)");
        lapGrad.addColorStop(0.5, "rgba(4, 9, 22, 0.55)");
        lapGrad.addColorStop(1, "rgba(5, 12, 24, 0)");
        ctx.fillStyle = lapGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.44, drawH * 0.065, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // AD FILM: Cinema tripod 3-point contact shadows
        [drawX + drawW * 0.26, centerX, drawX + drawW * 0.74].forEach((px) => {
          const pGrad = ctx.createRadialGradient(px, shadowCenterY, 0, px, shadowCenterY, drawW * 0.08);
          pGrad.addColorStop(0, "rgba(2, 6, 16, 0.92)");
          pGrad.addColorStop(1, "rgba(2, 6, 16, 0)");
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.ellipse(px, shadowCenterY, drawW * 0.08, drawH * 0.03, 0, 0, Math.PI * 2);
          ctx.fill();
        });
        const bodyGrad = ctx.createRadialGradient(
          centerX,
          shadowCenterY - drawH * 0.02,
          0,
          centerX,
          shadowCenterY,
          drawW * 0.35
        );
        bodyGrad.addColorStop(0, "rgba(2, 6, 16, 0.85)");
        bodyGrad.addColorStop(1, "rgba(2, 6, 16, 0)");
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.ellipse(centerX, shadowCenterY, drawW * 0.35, drawH * 0.06, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Frame-Synchronized Downward Floor Reflection (Luxury 3D studio reflection)
      ctx.save();
      ctx.translate(0, shadowCenterY * 2);
      ctx.scale(1, -1);

      const reflectionOpacity = isDesktop ? 0.14 : tuning.refAlpha;
      ctx.globalAlpha = opacity * reflectionOpacity;
      if (typeof ctx.filter === "string") {
        ctx.filter = isDesktop ? "none" : "blur(1.5px)";
      }
      ctx.drawImage(offscreen, drawX, drawY, drawW, drawH);

      // Progressive linear fade mask: smoothly dissolves reflection downward into midnight navy
      ctx.globalCompositeOperation = "destination-out";
      const refFade = ctx.createLinearGradient(
        0,
        shadowCenterY,
        0,
        shadowCenterY + drawH * (isDesktop ? 0.32 : tuning.refDepth)
      );
      refFade.addColorStop(0, "rgba(0, 0, 0, 0.02)");
      refFade.addColorStop(0.25, "rgba(0, 0, 0, 0.35)");
      refFade.addColorStop(0.70, "rgba(0, 0, 0, 0.80)");
      refFade.addColorStop(1.0, "rgba(0, 0, 0, 1.0)");
      ctx.fillStyle = refFade;
      ctx.fillRect(drawX - 20, shadowCenterY - 2, drawW + 40, drawH + 10);
      ctx.restore();

      // 5. Draw Main Crisp Product on top
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(offscreen, drawX, drawY, drawW, drawH);

      ctx.restore();
    };

    // Exclusively render the active service's product (strict 1:1 service-to-asset mapping)
    const stageP = Math.max(0, Math.min(1, localP));
    drawProductInstance(srvIndex, stageP, opacity, 1.0, driftX);

    ctx.restore();
  }, []);

  // Main canvas frame renderer routing to desktop or mobile canvas
  const renderCanvasFrame = useCallback((srvIndex, localP) => {
    if (typeof window === "undefined") return;
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      drawFrameToTarget(canvasRef.current, containerRef.current, srvIndex, localP, true);
    } else {
      drawFrameToTarget(mobileCanvasRef.current, mobileContainerRef.current, srvIndex, localP, false);
    }
  }, [drawFrameToTarget]);

  // Re-render immediately when newly loaded frames arrive so canvas never shows blanks
  useEffect(() => {
    const srv = SEQUENCE_SERVICES[activeServiceIndex];
    if (!srv) return;
    const unsub = sequencePreloader.subscribe(srv.id, () => {
      renderCanvasFrame(activeServiceIndex, serviceLocalProgress);
    });
    return unsub;
  }, [activeServiceIndex, serviceLocalProgress, renderCanvasFrame]);

  // Handle window resizing and orientation changes
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        containerSizeRef.current = { w: r.width, h: r.height };
      }
      if (mobileContainerRef.current) {
        const mr = mobileContainerRef.current.getBoundingClientRect();
        mobileContainerSizeRef.current = { w: mr.width, h: mr.height };
      }
      renderCanvasFrame(activeServiceIndex, serviceLocalProgress);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [renderCanvasFrame, activeServiceIndex, serviceLocalProgress]);

  // GSAP ScrollTrigger Master Timeline
  useEffect(() => {
    const pinSection = pinSectionRef.current;
    if (!pinSection) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const endDistance = isMobile ? "+=3600" : "+=5400";
    // Calibrated responsive scrub: eliminates sluggish float during fast scroll flings
    const scrubValue = isMobile ? 0.25 : 0.35;

    const trigger = ScrollTrigger.create({
      trigger: pinSection,
      start: "top top",
      end: endDistance, // Responsive scrub distance
      pin: true,
      scrub: scrubValue,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // 1. Opening Hero state (0.00 -> 0.04)
        setIsOpeningVisible(p < 0.04);

        // 2. Final Climax state (0.94 -> 1.00)
        setIsClimaxVisible(p >= 0.94);

        // 3. Map to active service
        let matchedServiceIdx = 0;
        let localP = 0;

        if (p < SERVICE_RANGES[0].start) {
          // Pre-service 1 entrance phase (lock to frame 1 of service 0)
          matchedServiceIdx = 0;
          localP = 0;
        } else if (p >= SERVICE_RANGES[5].end) {
          // Post-service 6 (climax phase)
          matchedServiceIdx = 5;
          localP = 1;
        } else {
          for (let i = 0; i < SERVICE_RANGES.length; i++) {
            const range = SERVICE_RANGES[i];
            if (p >= range.start && p < range.end) {
              matchedServiceIdx = i;
              localP = (p - range.start) / (range.end - range.start);
              break;
            }
          }
        }

        setActiveServiceIndex(matchedServiceIdx);
        setServiceLocalProgress(localP);

        // Draw active frame on animation canvas
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          renderCanvasFrame(matchedServiceIdx, localP);
        });

        // Fast-scroll defense: dynamically preload upcoming & previous services in direction of travel
        if (matchedServiceIdx < 5) {
          sequencePreloader.preloadSequencePriority(
            SEQUENCE_SERVICES[matchedServiceIdx + 1],
            "high"
          );
        }
        if (matchedServiceIdx > 0) {
          sequencePreloader.preloadSequencePriority(
            SEQUENCE_SERVICES[matchedServiceIdx - 1],
            "medium"
          );
        }
      },
    });

    // Initial render: Always draw Frame 1 of Service 01 immediately on mount!
    renderCanvasFrame(0, 0);

    return () => {
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [renderCanvasFrame]);

  // Auto-scroll mobile service dock so the active pill stays centered in view
  const lastActiveIndexRef = useRef(0);
  useEffect(() => {
    const btn = dockButtonRefs.current[activeServiceIndex];
    if (btn && dockScrollRef.current) {
      const dock = dockScrollRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const dockWidth = dock.offsetWidth;
      const isFastJump = Math.abs(activeServiceIndex - lastActiveIndexRef.current) > 1;
      lastActiveIndexRef.current = activeServiceIndex;
      dock.scrollTo({
        left: btnLeft - dockWidth / 2 + btnWidth / 2,
        behavior: isFastJump ? "auto" : "smooth",
      });
    }
  }, [activeServiceIndex]);

  // Jump smoothly to a specific service
  const jumpToService = (index) => {
    const pinSection = pinSectionRef.current;
    if (!pinSection) return;

    const range = SERVICE_RANGES[index];
    if (!range) return;

    const trigger = ScrollTrigger.getAll().find((st) => st.trigger === pinSection);
    if (trigger) {
      const targetProgress = range.start + 0.02;
      const targetScroll =
        trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Support direct touch swipes over 3D model on mobile to naturally advance or rewind services
  const touchStartY = useRef(0);
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };
  const handleTouchEnd = (e) => {
    if (!touchStartY.current || isOpeningVisible || isClimaxVisible) return;
    const endY = e.changedTouches?.[0]?.clientY ?? touchStartY.current;
    const deltaY = touchStartY.current - endY;
    if (Math.abs(deltaY) > 45) {
      if (deltaY > 0 && activeServiceIndex < 5) {
        // Swiped UP -> Advance to next service
        jumpToService(activeServiceIndex + 1);
      } else if (deltaY < 0 && activeServiceIndex > 0) {
        // Swiped DOWN -> Go back to previous service
        jumpToService(activeServiceIndex - 1);
      }
    }
  };

  // Single reliable source of truth: activeServiceIndex strictly governs all typography, dock, specs, and visual
  const currentService = SEQUENCE_SERVICES[activeServiceIndex] || SEQUENCE_SERVICES[0];
  const isBoundaryTransition = (serviceLocalProgress < 0.06 || serviceLocalProgress > 0.94) && activeServiceIndex < 5;
  const boundaryFade = serviceLocalProgress < 0.06
    ? serviceLocalProgress / 0.06
    : serviceLocalProgress > 0.94 && activeServiceIndex < 5
    ? (1.0 - serviceLocalProgress) / 0.06
    : 1;
  return (
    <div ref={pinSectionRef} className="relative w-full h-screen h-[100dvh] bg-navy-primary text-white overflow-hidden select-none">
      {/* Real-Time Three.js WebGL 3D Studio Environment */}
      <Studio3DEnvironment
        scrollProgress={scrollProgress}
        activeServiceIndex={activeServiceIndex}
        serviceLocalProgress={serviceLocalProgress}
        accentColor={currentService.accentColor || "#FFC928"}
        isOpeningVisible={isOpeningVisible}
      />

      {/* Atmospheric vignette layer matching seamless studio midnight navy */}
      {/* Continuous Seamless Studio Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#050c18]/30 z-0" />

      {/* ============================================================== */}
      {/* SCENE 01: OPENING HERO — BRAND REVEAL                          */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-transform duration-200 pointer-events-none"
        style={{
          opacity: scrollProgress < 0.02 ? 1 : Math.max(0, 1 - (scrollProgress - 0.02) / 0.02),
          transform: `translateY(${Math.min(40, scrollProgress * 600)}px)`,
          pointerEvents: scrollProgress < 0.035 ? "auto" : "none",
        }}
      >
        {/* Authentic Sri Simbha Lion Crest with Concentric Orbital Halo */}
        <div className="relative group mb-4 min-[380px]:mb-6 sm:mb-8">
          <div className="absolute -inset-6 rounded-full bg-gold-primary/20 blur-xl opacity-60" />
          <div
            className="absolute -inset-3 rounded-full border border-gold-primary/25 pointer-events-none animate-spin"
            style={{ animationDuration: "35s" }}
          />

          <div className="relative w-20 h-20 min-[380px]:w-24 min-[380px]:h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-navy-secondary/90 border border-gold-primary/40 shadow-[0_0_35px_rgba(232,184,63,0.25)] flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="Sri Simbha Ad Solutions Logo"
              className="w-full h-full object-contain rounded-xl"
              width={112}
              height={112}
            />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-navy-primary/95 border border-gold-primary/30 text-[9px] sm:text-[10px] font-mono tracking-widest text-gold-bright uppercase whitespace-nowrap shadow-md">
            EST. 2019 • VISAKHAPATNAM
          </div>
        </div>

        {/* Master Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3 min-[380px]:px-4 py-1.5 rounded-full bg-navy-secondary/60 border border-gold-primary/25 backdrop-blur-md mb-3.5 min-[380px]:mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span className="text-[10px] min-[380px]:text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-gold-bright uppercase">
            3D CINEMATIC ADVERTISING EXPERIENCE
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.14] sm:leading-[1.1] mb-2.5 sm:mb-4">
          We Don't Just Show Ads.
          <br />
          <span className="gold-gradient-text">We Command Attention.</span>
        </h1>

        {/* Supporting text */}
        <p className="text-xs min-[380px]:text-sm sm:text-base lg:text-lg text-content-secondary max-w-xl mx-auto leading-relaxed mb-4 sm:mb-6">
          Creative advertising and digital solutions that make your brand impossible to ignore.
        </p>

        {/* Scroll CTA indicator */}
        <div className="flex flex-col items-center gap-2 text-gold-bright">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll to Discover Services</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* SCENE 02: CONTINUOUS 6-SERVICE 3D ANIMATION & EDITORIAL HUD   */}
      {/* ============================================================== */}

      {/* --- DESKTOP VIEW (>= 1024px): Side-by-Side Product & Editorial Typography --- */}
      <div
        className="hidden lg:block absolute inset-0 z-10 pointer-events-none transition-opacity duration-150"
        style={{
          opacity: scrollProgress < 0.015 ? 0 : scrollProgress < 0.04 ? (scrollProgress - 0.015) / 0.025 : scrollProgress >= 0.94 ? 0 : 1,
        }}
      >
        {/* Dedicated Desktop Canvas Container */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Desktop Editorial Typography HUD (Zero Boxed Cards) */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-14 lg:pb-18 px-6 lg:px-10 xl:px-16">
          {/* Top minimal status indicator */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
            <span className="text-[11px] lg:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
              THE SIMBHA ADVERTISING UNIVERSE
            </span>
          </div>

          {/* Left Side HUD — Sleek Editorial Typography, Zero Overlap with Product */}
          <div
            className="w-full max-w-sm lg:max-w-md xl:max-w-lg pointer-events-auto flex flex-col justify-center my-auto transition-all duration-300"
            style={{
              opacity: isBoundaryTransition ? Math.max(0.45, boundaryFade) : 1,
              transform: isBoundaryTransition
                ? `translateY(${(1 - boundaryFade) * -4}px)`
                : "none",
            }}
          >
            <div className="relative pl-1">
              {/* Refined category index */}
              <div className="text-[10.5px] lg:text-[11px] font-mono tracking-widest text-gold-bright uppercase font-bold mb-1.5 lg:mb-2">
                {currentService.number} / 06 • {currentService.shortName || currentService.name}
              </div>

              {/* Clean Service Heading */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-1.5 lg:mb-2 drop-shadow-md">
                {currentService.name}
              </h1>

              {/* Tagline */}
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-gold-bright italic mb-2 lg:mb-2.5">
                "{currentService.tagline}"
              </p>

              {/* Editorial Description */}
              <p className="text-xs lg:text-sm xl:text-base text-gray-300 max-w-md mb-3.5 lg:mb-5 leading-relaxed font-normal line-clamp-3 2xl:line-clamp-none">
                {currentService.description}
              </p>

              {/* Sleek inline capabilities */}
              <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3.5 lg:mb-5">
                {currentService.specs?.slice(0, 4).map((sp, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <span className="text-[9px] font-mono text-gray-400 uppercase">{sp.label}:</span>
                    <span className="text-[10px] lg:text-[11px] font-bold text-white tracking-tight">{sp.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenQuote?.(currentService.name)}
                className="inline-flex items-center gap-2 px-4.5 lg:px-6 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-gold-bright to-gold-primary text-navy-primary text-xs lg:text-sm font-bold shadow-[0_4px_16px_rgba(232,184,63,0.35)] hover:shadow-[0_6px_22px_rgba(255,201,40,0.5)] hover:brightness-105 transition-all"
              >
                <span>Enquire About {currentService.shortName || currentService.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-4 lg:h-8" />
        </div>
      </div>

      {/* --- MOBILE VIEW (< 1024px): Dedicated Portrait Commercial Experience --- */}
      <div
        className="block lg:hidden absolute inset-0 z-10 pointer-events-none transition-opacity duration-150"
        style={{
          opacity: scrollProgress < 0.015 ? 0 : scrollProgress < 0.04 ? (scrollProgress - 0.015) / 0.025 : scrollProgress >= 0.94 ? 0 : 1,
        }}
      >
        <div className="w-full h-full flex flex-col justify-between pt-[72px] min-[380px]:pt-[78px] sm:pt-[84px] pb-[65px] sm:pb-[75px] px-3.5 sm:px-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto pointer-events-none">
          {/* 1. SERVICE INTRODUCTION (Eyebrow, Heading, Tagline, Complete Description) */}
          <div
            className="flex flex-col flex-shrink-0 pointer-events-auto transition-all duration-300"
            style={{
              opacity: isBoundaryTransition ? Math.max(0.45, boundaryFade) : 1,
              transform: isBoundaryTransition
                ? `translateY(${(1 - boundaryFade) * -4}px)`
                : "none",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-mono tracking-widest text-gold-bright uppercase font-bold">
                {currentService.number} / 06 • {currentService.shortName || currentService.name}
              </span>
            </div>

            <h2 className="text-[clamp(1.15rem,4.4vw,1.75rem)] font-extrabold text-white tracking-tight leading-[1.12]">
              {currentService.name}
            </h2>

            <p className="text-[clamp(0.75rem,2.4vw,0.88rem)] font-semibold text-gold-bright italic mt-0.5">
              "{currentService.tagline}"
            </p>

            <p className="text-[11px] min-[360px]:text-[11.5px] sm:text-xs text-gray-300 font-normal leading-relaxed mt-1 max-w-sm sm:max-w-lg line-clamp-2 min-[420px]:line-clamp-none">
              {currentService.description}
            </p>
          </div>

          {/* 2. DEDICATED PRODUCT ANIMATION CENTERPIECE (Directly below intro, zero empty gap) */}
          <div
            ref={mobileContainerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full flex-1 min-h-[150px] min-[380px]:min-h-[180px] sm:min-h-[220px] max-h-[350px] my-1 flex items-center justify-center pointer-events-auto touch-pan-y overflow-hidden cursor-grab active:cursor-grabbing"
            title="Swipe up or down to rotate 3D service models"
          >
            <canvas
              ref={mobileCanvasRef}
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>

          {/* 3. LOWER SECTION: Clean Two-Column Specification Grid & Prominent Enquiry CTA */}
          <div
            className="flex flex-col gap-2 flex-shrink-0 w-full pointer-events-auto transition-all duration-300"
            style={{
              opacity: isBoundaryTransition ? Math.max(0.45, boundaryFade) : 1,
              transform: isBoundaryTransition
                ? `translateY(${(1 - boundaryFade) * 4}px)`
                : "none",
            }}
          >
            {/* Clean Specification Grid: 2 columns on mobile, 4 columns on tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2.5 w-full">
              {currentService.specs?.slice(0, 4).map((sp, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-center px-2 min-[360px]:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#050c18]/90 border border-white/10 backdrop-blur-sm min-h-[38px] sm:min-h-[44px]"
                >
                  <span className="text-[8px] min-[360px]:text-[8.5px] sm:text-[9.5px] font-mono text-gray-400 uppercase tracking-wider truncate leading-tight mb-0.5">
                    {sp.label}
                  </span>
                  <span className="text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] font-bold text-white tracking-tight leading-tight whitespace-normal">
                    {sp.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA: Touch-friendly Full-Width Gold Pill */}
            <button
              onClick={() => onOpenQuote?.(currentService.name)}
              className="w-full py-2.5 sm:py-3 px-4 rounded-full bg-gradient-to-r from-gold-bright to-gold-primary text-navy-primary text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(232,184,63,0.35)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <span>Enquire About {currentService.shortName || currentService.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SERVICE SCROLL PROGRESS & PAGINATED STEPPER (OPTION A)         */}
      {/* ============================================================== */}
      <div
        className={`absolute bottom-2 sm:bottom-4 md:bottom-6 left-0 sm:left-1/2 sm:-translate-x-1/2 z-30 w-full sm:max-w-xl md:max-w-2xl px-3 sm:px-4 transition-all duration-500 pb-[env(safe-area-inset-bottom)] flex flex-col items-center gap-1.5 ${
          !isOpeningVisible && !isClimaxVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Modern Paginated Progress Bar with Interactive Steps */}
        <div
          ref={dockScrollRef}
          className="bg-[#050c18]/90 border border-white/12 rounded-full py-1.5 px-3.5 sm:px-4 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.45)] flex items-center gap-2.5 sm:gap-3"
        >
          {/* Subtle counter */}
          <div className="flex items-center gap-1 text-[10.5px] sm:text-xs font-mono font-medium text-gray-400 border-r border-white/10 pr-2.5 sm:pr-3">
            <span className="text-gold-bright font-bold">0{activeServiceIndex + 1}</span>
            <span className="text-gray-500">/</span>
            <span>06</span>
          </div>

          {/* Interactive Paginated Step Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SEQUENCE_SERVICES.map((srv, idx) => {
              const isActive = activeServiceIndex === idx;
              const isPassed = activeServiceIndex > idx;
              return (
                <button
                  key={srv.id}
                  ref={(el) => (dockButtonRefs.current[idx] = el)}
                  onClick={() => jumpToService(idx)}
                  className={`group relative h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "w-8 sm:w-10 bg-gradient-to-r from-gold-bright to-gold-primary shadow-[0_0_10px_rgba(255,201,40,0.6)]"
                      : isPassed
                      ? "w-2.5 sm:w-3 bg-white/40 hover:bg-white/70"
                      : "w-2 sm:w-2.5 bg-white/15 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to service ${idx + 1}: ${srv.name}`}
                  title={`${srv.number} • ${srv.shortName || srv.name}`}
                >
                  <span className="sr-only">{srv.name}</span>
                </button>
              );
            })}
          </div>

          {/* Always visible clear scroll cue */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-gray-300 pl-0.5 border-l border-white/10 pl-2.5">
            <span className="font-semibold text-gray-200">Scroll</span>
            <ChevronDown className="w-3.5 h-3.5 text-gold-bright animate-bounce" />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SCENE 03: FINAL BRAND REVEAL & CLIMAX                         */}
      {/* ============================================================== */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-out ${
          isClimaxVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
      >
        <div className="relative group mb-4 sm:mb-6">
          <div className="absolute -inset-10 rounded-full bg-gold-primary/30 blur-3xl opacity-80 animate-pulse" />
          <div
            className="absolute -inset-6 rounded-full border border-gold-primary/40 pointer-events-none animate-spin"
            style={{ animationDuration: "20s" }}
          />

          <div className="relative w-24 h-24 min-[380px]:w-28 min-[380px]:h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-gold-bright via-gold-primary to-navy-secondary shadow-[0_0_60px_rgba(232,184,63,0.4)] flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="Sri Simbha Ad Solutions Crest"
              className="w-full h-full object-cover rounded-[18px] sm:rounded-[22px]"
              width={144}
              height={144}
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-navy-secondary/80 border border-gold-primary/30 backdrop-blur-md mb-3.5 sm:mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span className="text-[10px] min-[380px]:text-xs font-mono font-semibold tracking-wider text-gold-bright uppercase">
            INTEGRATED MEDIA ECOSYSTEM
          </span>
        </div>

        <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight mb-2.5 sm:mb-4">
          One Vision. Six Powerful Ways to{" "}
          <span className="gold-gradient-text">Command Attention.</span>
        </h2>

        <p className="text-xs min-[380px]:text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-5 sm:mb-7 leading-relaxed font-normal">
          From high-impact roadside LED displays to digital campaigns and cinematic ad films,
          Sri Simbha transforms visibility into market dominance.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => onOpenQuote?.("All Services")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-gold-bright to-gold-primary text-navy-primary font-bold text-xs min-[380px]:text-sm sm:text-base shadow-[0_8px_30px_rgba(232,184,63,0.4)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Get a Free Quote
          </button>

          <a
            href="#work"
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-gold-primary/40 bg-navy-secondary/60 text-white font-semibold text-xs min-[380px]:text-sm hover:bg-navy-secondary hover:border-gold-bright active:scale-[0.98] transition-all"
          >
            Explore Full Portfolio ↓
          </a>
        </div>
      </div>
    </div>
  );
};

export default CinematicHeroScrollytelling;