import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import services from "../../config/services.config";
import siteConfig from "../../config/site.config";
import { buildServiceListSchema } from "../../utils/structuredData";
import ServiceCard from "../../features/services/components/ServiceCard";

export const servicesBreadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

/**
 * Services route screen — Clean, professional agency services page for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Six-service responsive grid with consistent card heights
 * - Compact campaign enquiry band below the services
 * - Seamless visual parity with Contact Us (deep navy, refined gold accents, zero card clutter)
 */
const Services = () => (
  <div className="relative min-h-[calc(100vh-var(--header-height))] bg-navy-primary text-white pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
    <Seo
      title="Advertising Services in Visakhapatnam | Sri Simbha Ad Solutions"
      description="LED display ads, tea cup printing, digital marketing, website building, ads on wheels and ad film production. One Visakhapatnam agency for every advertising channel."
      path="/services"
    />
    <StructuredData data={buildServiceListSchema()} />

    <div className="mx-auto max-w-container w-full">
      {/* Breadcrumb Navigation */}
      <div className="mb-5 sm:mb-6">
        <Breadcrumbs items={servicesBreadcrumbs} />
      </div>

      {/* Hero Section with Apple-Style Subdued Atmosphere */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14 pb-8 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
              SIX SPECIALIZED MEDIA CHANNELS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Our <span className="gold-gradient-text">Services</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
            High-impact advertising solutions engineered to command attention and deliver measurable reach across outdoor display networks, transit media, and digital channels.
          </p>
        </div>

        <Link
          to="/contact"
          className="gold-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-navy-primary shadow-lg hover:brightness-105 active:scale-[0.99] transition-all self-start md:self-auto shrink-0 w-full sm:w-auto"
        >
          <span>Contact Us Today</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of 6 Services */}
      <ul
        aria-label="All services"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full mb-10 lg:mb-12"
      >
        {services.map((service, index) => (
          <li key={service.id} className="h-full">
            <ServiceCard service={service} index={index} />
          </li>
        ))}
      </ul>

      {/* Compact Bottom Campaign Enquiry Strip */}
      <div className="relative w-full rounded-3xl border border-gold-primary/20 bg-gradient-to-r from-navy-secondary/90 via-[#0a1630] to-navy-secondary/90 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase block mb-1">
              CUSTOM MEDIA STRATEGY
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">
              Need a Custom Campaign Plan?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
              From prime highway LED billboards to dynamic mobile van displays and targeted digital marketing, our team will help you craft the right media mix for your goals and budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/contact"
              className="gold-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-navy-primary shadow-lg hover:brightness-105 active:scale-[0.99] transition-all text-center w-full sm:w-auto"
            >
              <span>Send an Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs sm:text-sm font-semibold hover:bg-emerald-900/40 hover:border-emerald-400 transition-all text-center w-full sm:w-auto"
            >
              <FaWhatsapp className="text-base text-emerald-400" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Services;
