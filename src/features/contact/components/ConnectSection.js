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
  "flex items-center gap-2 rounded-pill surface-control px-4 py-2 font-medium text-[color:var(--color-text)] transition hover:opacity-80 dark:bg-white dark:text-black";

/**
 * Pre-footer "connect" block.
 *
 * Every value here used to be hardcoded and duplicated across the footer,
 * contact page and floating button. It is now rendered from
 * `config/site.config.js` and `features/contact/data/connect.data.js`.
 *
 * Accessibility: the logo is a heading, the social row is a labelled `<nav>`,
 * each capability list is a real unordered list, and every external link
 * carries `rel="noopener noreferrer"`.
 */
const ConnectSection = () => {
  const ProjectIcon = projectPrompt.icon;

  return (
    <section
      aria-label="Get in touch"
      className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-6 section-y-sm text-[color:var(--color-text)] transition-colors duration-500 dark:border-gray-800 dark:bg-[#0F0F0F] dark:text-white sm:px-12 lg:px-20"
    >
      <div className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-[color:var(--color-border)] pb-6 sm:flex-row sm:gap-0 dark:border-gray-700">
        <h2 className="text-h2 font-bold">{siteConfig.shortName}</h2>

        <nav aria-label="Social media">
          <ul className="flex items-center gap-1 text-lg">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.id];
              if (!Icon) return null;

              return (
                <li key={social.id} className="flex items-center">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    // The icons rendered at 18x18, below the WCAG 2.2 minimum
                    // target size. `tap-expand` grows the hit area to 44px with
                    // a pseudo-element, so the visual gap between icons stays
                    // as designed.
                    className={`tap-expand rounded p-2 transition ${socialHoverColor[social.id] || ""}`}
                    aria-label={`${siteConfig.name} on ${social.label}`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mb-16 flex flex-col justify-between gap-10 lg:flex-row">
        <div className="w-full p-2 transition lg:max-w-sm">
          <div className="mb-4 flex items-center gap-3">
            <ProjectIcon
              className={`text-xl ${projectPrompt.iconClassName}`}
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold">{projectPrompt.title}</h3>
          </div>
          <p className="mb-4 italic text-[color:var(--color-text-muted)] dark:text-gray-400">
            {projectPrompt.subtitle}
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={buildMailTo()}
              title={siteConfig.contact.email}
              className={`${contactRowClass} truncate`}
            >
              <FaEnvelope className="text-sm" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
            <a href={buildTelUrl()} className={contactRowClass}>
              <FaPhoneAlt className="text-sm" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        {capabilities.map((capability) => {
          const Icon = capability.icon;

          return (
            <div
              key={capability.id}
              className="w-full p-2 transition lg:max-w-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon
                  className={`text-xl ${capability.iconClassName}`}
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold">{capability.title}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[color:var(--color-text-muted)] dark:text-gray-300">
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="grid gap-10 border-t border-[color:var(--color-border)] pt-10 text-sm text-[color:var(--color-text-muted)] sm:grid-cols-2 lg:grid-cols-3 dark:border-gray-700 dark:text-gray-400">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
            Connect
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                className="tap-expand inline-block hover:text-brand-500"
                href={buildMailTo()}
              >
                Email: {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                className="tap-expand inline-block hover:text-brand-500"
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
          <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
            Company
          </h3>
          <ul className="space-y-1">
            {footerNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  className="tap-expand inline-block py-1 hover:text-brand-500"
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default ConnectSection;
