import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import siteConfig, {
  buildMailTo,
  buildTelUrl,
} from "../../../config/site.config";
import { footerNavigation } from "../../../config/navigation.config";
import {
  capabilities,
  projectPrompt,
  socialHoverColor,
  socialIcons,
  socialLinks,
} from "../data/connect.data";

const contactRowClass =
  "flex items-center gap-2 rounded-xl border border-white/10 bg-navy-primary/80 px-4 py-2.5 text-sm font-medium text-white transition hover:border-gold-primary/40 hover:text-gold-primary shadow-sm";

/**
 * Pre-footer "connect" block.
 *
 * Implements clean typography, gold accents, and WCAG compliance.
 */
const ConnectSection = () => {
  const ProjectIcon = projectPrompt.icon;

  return (
    <section
      aria-label="Get in touch"
      className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-container w-full">
        <div className="mb-10 flex flex-col items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:gap-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-2.5 backdrop-blur-md shadow-sm">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
                DIRECT REGIONAL REACH
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {siteConfig.shortName} <span className="gold-gradient-text">Media Network</span>
            </h2>
          </div>

          <nav aria-label="Social media">
            <ul className="flex items-center gap-1.5 text-base">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.id];
                if (!Icon) return null;

                return (
                  <li key={social.id} className="flex items-center">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`tap-expand rounded-xl p-2.5 border border-white/10 bg-navy-secondary/60 text-gray-300 hover:text-gold-bright hover:border-gold-primary/40 transition-all ${socialHoverColor[social.id] || ""}`}
                      aria-label={`${siteConfig.name} on ${social.label}`}
                    >
                      <Icon aria-hidden="true" className="w-4 h-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="rounded-3xl border border-white/10 bg-navy-secondary/60 p-7 sm:p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-gold-primary/40">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-primary/20 bg-navy-primary text-gold-primary">
                <ProjectIcon
                  className={`text-base text-gold-primary ${projectPrompt.iconClassName}`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-white">{projectPrompt.title}</h3>
            </div>
            <p className="mb-5 text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
              {projectPrompt.subtitle}
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={buildMailTo()}
                title={siteConfig.contact.email}
                className={`${contactRowClass} truncate`}
              >
                <FaEnvelope className="text-xs text-gold-primary shrink-0" aria-hidden="true" />
                <span className="truncate">{siteConfig.contact.email}</span>
              </a>
              <a href={buildTelUrl()} className={contactRowClass}>
                <FaPhoneAlt className="text-xs text-gold-primary shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <div
                key={capability.id}
                className="rounded-3xl border border-white/10 bg-navy-secondary/60 p-7 sm:p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-gold-primary/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-primary/20 bg-navy-primary text-gold-primary">
                    <Icon
                      className={`text-base text-gold-primary ${capability.iconClassName}`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white">{capability.title}</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 border-t border-white/10 pt-6 text-xs sm:text-sm text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-bold text-white">
              Connect
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  className="tap-expand inline-block hover:text-gold-primary transition"
                  href={buildMailTo()}
                >
                  Email: {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  className="tap-expand inline-block hover:text-gold-primary transition"
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h3 className="mb-2 text-sm font-bold text-white">
              Company
            </h3>
            <ul className="space-y-1">
              {footerNavigation.map((item) => (
                <li key={item.id}>
                  <Link
                    className="tap-expand inline-block py-0.5 hover:text-gold-primary transition"
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
