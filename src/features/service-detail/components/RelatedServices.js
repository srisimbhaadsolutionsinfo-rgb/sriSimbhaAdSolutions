import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import services from "../../../config/services.config";

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
 * RelatedServices — Clean "Other services" strip shown at the bottom of a service page.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Visual 3D cinematic preview thumbnails for each service
 * - Clean responsive cards matching the agency redesign
 */
const RelatedServices = ({ currentId }) => {
  const related = services.filter((service) => service.id !== currentId);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-services-heading"
      className="mx-auto w-full max-w-container px-2 pb-12 sm:px-4"
    >
      <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
        <h2
          id="related-services-heading"
          className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5"
        >
          Other <span className="text-gold-primary">Services</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-normal">
          Explore all our physical and digital advertising channels across Andhra Pradesh.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((service) => {
          const Icon = service.icon;
          const visualSrc = SERVICE_VISUAL_MAP[service.id];

          return (
            <li key={service.id}>
              <Link
                to={service.path}
                className="group flex flex-col sm:flex-row h-full items-start gap-3.5 rounded-2xl border border-white/10 bg-navy-secondary/60 p-4 sm:p-5 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* 3D Visual thumbnail */}
                {visualSrc ? (
                  <div className="w-full sm:w-24 h-28 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#081329] to-[#050c18] border border-white/10 flex items-center justify-center p-1.5 shadow-inner">
                    <img
                      src={visualSrc}
                      alt={`${service.title} preview`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary transition-all duration-300 group-hover:border-gold-primary/40"
                  >
                    <Icon size={20} />
                  </div>
                )}

                <div className="min-w-0 flex-1 flex flex-col justify-between h-full">
                  <div>
                    <span className="flex items-center gap-1.5 text-base font-bold text-white group-hover:text-gold-primary transition-colors">
                      <span>{service.title}</span>
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-gold-primary/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-primary"
                      />
                    </span>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gray-300 font-normal line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <span className="mt-2.5 text-[11px] font-semibold text-gold-bright flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>View 3D Solution</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RelatedServices;
