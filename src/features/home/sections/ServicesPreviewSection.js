import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import ServiceCard from "../../services/components/ServiceCard";
import services from "../../../config/services.config";

/**
 * ServicesPreviewSection — Clean, professional home page services grid.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 6-service grid using modern ServiceCard components
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const ServicesPreviewSection = () => (
  <section
    id="services"
    aria-labelledby="services-preview-heading"
    className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden"
  >
    {/* Subtle atmospheric ambient glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-container w-full">
      <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3.5 backdrop-blur-md shadow-sm">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
            COMPLETE MEDIA ECOSYSTEM
          </span>
        </div>

        <h2
          id="services-preview-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3"
        >
          One Agency for <span className="gold-gradient-text">Every Screen & Space</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
          Outdoor LED billboards, dynamic mobile transit vans, high-frequency print, and AI-optimized digital campaigns engineered to dominate commercial attention.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {services.map((service, index) => (
          <li key={service.id} className="h-full">
            <ServiceCard service={service} index={index} />
          </li>
        ))}
      </ul>

      <div className="mt-10 sm:mt-12 flex justify-center">
        <Link
          to="/services"
          className="gold-btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-navy-primary shadow-lg hover:brightness-105 active:scale-[0.99] transition-all"
        >
          <span>Explore All 6 Channels in Detail</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesPreviewSection;
