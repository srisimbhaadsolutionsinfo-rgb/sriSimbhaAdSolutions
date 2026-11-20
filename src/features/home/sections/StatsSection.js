import { useEffect, useRef, useState } from "react";
import { Monitor, Users, Award, Activity } from "lucide-react";
import { companyStats } from "../../../data/company.data";
import { usePrefersReducedMotion } from "../../../hooks";

const statIcons = {
  screens: Monitor,
  clients: Users,
  years: Award,
  reach: Activity,
};

const statDetails = {
  screens: "Prime arterial LED junctions & high-traffic display networks",
  clients: "Regional enterprises, retail brands, and commercial founders",
  years: "Deep local footprint and execution across Visakhapatnam",
  reach: "Real-time content scheduling with high-reliability uptime",
};

/**
 * StatsSection — Apple-inspired precision metrics grid.
 *
 * Implements:
 * - Natural, comfortable typography following design tokens (no oversized odd fonts)
 * - Individual frosted glass bento cards matching Apple's modular design language
 * - Smooth accessible count-up animation respecting prefers-reduced-motion
 * - Clear visual hierarchy: icon badge, gold-gradient metric, title-case label, and context
 */
const StatsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [values, setValues] = useState(() =>
    companyStats.map((stat) => (prefersReducedMotion ? stat.value : 0))
  );

  const sectionRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setValues(companyStats.map((stat) => stat.value));
      return undefined;
    }

    const node = sectionRef.current;
    if (!node || hasRun.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        hasRun.current = true;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setValues(companyStats.map((stat) => Math.round(stat.value * eased)));

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Company statistics"
      className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-container w-full">
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3.5 backdrop-blur-md shadow-sm">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
              MEASURABLE REGIONAL IMPACT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Proven Scale in <span className="gold-gradient-text">Commercial Reach</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
            Tangible infrastructure and verified campaign delivery across Visakhapatnam and coastal Andhra Pradesh.
          </p>
        </div>

        {/* 4 Apple-Style Modular Bento Cards */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {companyStats.map((stat, index) => {
            const Icon = statIcons[stat.id] || Monitor;

            return (
              <div
                key={stat.id}
                className="group relative rounded-3xl border border-white/10 bg-navy-secondary/60 p-6 sm:p-7 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,184,63,0.12)] flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-gold-primary/5 rounded-full blur-2xl group-hover:bg-gold-primary/10 transition-all pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-primary/20 bg-navy-primary text-gold-primary group-hover:border-gold-primary/40 group-hover:scale-105 group-hover:text-gold-bright transition-all shadow-md">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-mono font-extrabold tracking-widest text-gold-bright uppercase px-2.5 py-1 rounded-full bg-navy-primary/80 border border-white/10 shadow-inner">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative z-10">
                  <dd className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 font-sans">
                    <span className="gold-gradient-text">
                      {values[index]}
                      {stat.suffix}
                    </span>
                  </dd>
                  <dt className="text-base sm:text-lg font-bold text-white tracking-tight mb-1.5">
                    {stat.label}
                  </dt>
                  <p className="text-xs leading-relaxed text-gray-300 font-normal">
                    {statDetails[stat.id]}
                  </p>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

export default StatsSection;
