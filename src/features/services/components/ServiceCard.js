import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Visual 3D cinematic preview banners mapping to service IDs
const SERVICE_VISUAL_MAP = {
  led: "/assets/sequences/led/frame_001.jpg",
  "tea-cup": "/assets/sequences/teacup/frame_001.jpg",
  "digital-marketing": "/assets/sequences/digital/frame_001.jpg",
  "website-building": "/assets/sequences/website/frame_001.jpg",
  "ad-on-wheels": "/assets/sequences/van/frame_001.jpg",
  "ad-films": "/assets/sequences/film/frame_001.jpg",
};

/**
 * ServiceCard — High-end cinematic 3D service tile for Sri Simbha Ad Solutions.
 *
 * Implements:
 * - 3D model visual preview showcasing the exploded cinematic product stage
 * - Premium gold accents, glassmorphic dark container and glowing hover feedback
 * - Number badge, category icon, and directional affordance
 * - Pure link element with no nested interactive controls (WCAG compliant)
 */
const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const serviceNumber = String((index ?? 0) + 1).padStart(2, "0");
  const visualSrc = SERVICE_VISUAL_MAP[service.id];

  return (
    <Link
      to={service.path}
      aria-label={`${service.title} — learn more`}
      className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-navy-secondary/70 backdrop-blur-md overflow-hidden text-left transition-all duration-300 hover:border-gold-primary/50 hover:-translate-y-1.5 hover:shadow-[0_12px_35px_rgba(232,184,63,0.18)]"
    >
      {/* 3D Visual Preview Header */}
      {visualSrc ? (
        <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gradient-to-b from-[#081329] to-[#050c18] border-b border-white/5 flex items-center justify-center">
          <img
            src={visualSrc}
            alt={`${service.title} 3D model visualization`}
            className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
            loading="lazy"
          />
          {/* Subtle gradient vignette to blend into card body */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-secondary via-transparent to-transparent opacity-80" />

          {/* Top Meta Badges: Number on Left, Icon on Right */}
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-navy-primary/85 border border-gold-primary/30 backdrop-blur-md shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-wider text-gold-bright">
              {serviceNumber} / 06
            </span>
          </div>

          <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-navy-primary/90 border border-white/15 text-gold-primary transition-all duration-300 group-hover:border-gold-primary/50 group-hover:text-gold-bright group-hover:scale-105 shadow-md">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      ) : (
        /* Fallback Top Meta Row if no image */
        <div className="flex items-center justify-between p-5 pb-0">
          <span className="text-xs font-mono font-semibold tracking-wider text-gold-primary">
            {serviceNumber} / 06
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-primary border border-white/10 text-gold-primary transition-all duration-300 group-hover:border-gold-primary/40 group-hover:text-gold-bright">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Heading */}
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-gold-primary transition-colors flex items-center justify-between gap-2">
            <span>{service.title}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-gold-primary/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-primary"
              aria-hidden="true"
            />
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Bottom Action Affordance */}
        <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
            3D Showcase Ready
          </span>

          <span className="text-xs font-semibold text-gold-bright group-hover:text-white transition-colors flex items-center gap-1">
            <span>Explore Service</span>
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
