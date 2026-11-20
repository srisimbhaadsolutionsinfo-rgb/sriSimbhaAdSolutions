import { Mail, Phone, MapPin } from "lucide-react";

import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import { buildLocalBusinessSchema } from "../../utils/structuredData";
import siteConfig from "../../config/site.config";
import EnquiryForm from "../../features/contact/components/EnquiryForm";
import { contactPage } from "../../features/contact/data/contact.data";

/**
 * Contact route screen — Simple, clean, professional redesign for Sri Simbha Ad Solutions.
 *
 * Implements:
 * - Clean editorial hero: "Contact Us" with short supporting text
 * - Balanced two-column desktop layout (35% contact details, 65% enquiry form)
 * - Essential contact info only: Email, Phone/WhatsApp, Verified Location with map link
 * - Verified business availability message
 * - Compact height eliminating unnecessary vertical gaps and nested cards
 * - Single-column responsive layout for mobile screens
 */
const Contact = () => {
  return (
    // `pt-header` clears the global fixed header properly per design token rules.
    <section className="relative min-h-[calc(100vh-var(--header-height))] bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-header pb-16 lg:pb-20">
      <Seo
        title={contactPage.metaTitle}
        description={contactPage.intro}
        path="/contact"
      />
      <StructuredData data={buildLocalBusinessSchema()} />

      <div className="w-full max-w-container mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={contactPage.breadcrumbs} className="mb-6 sm:mb-8" />

        {/* 2. CLEAN APPLE-INSPIRED CONTACT HERO */}
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3 backdrop-blur-md">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
              DIRECT AGENCY COMMUNICATIONS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Contact <span className="gold-gradient-text">Us</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Have a project in mind? Tell us what you need. Our team will help you find the right advertising solution.
          </p>
        </div>

        {/* 3. TWO-COLUMN LAYOUT (35% Left Contact Info, 65% Right Enquiry Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN: Essential Contact Information */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col">
            <div className="flex flex-col gap-5 p-6 rounded-3xl border border-white/10 bg-navy-secondary/60 backdrop-blur-md shadow-lg">
              {/* Email */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-start gap-4 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary group-hover:border-gold-primary/40 group-hover:text-gold-bright transition-all shadow-md">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Email
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-gold-primary transition-colors break-all">
                    {siteConfig.contact.email}
                  </span>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="group flex items-start gap-4 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary group-hover:border-gold-primary/40 group-hover:text-gold-bright transition-all shadow-md">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-gold-primary transition-colors">
                    {siteConfig.contact.phone}
                  </span>
                </div>
              </a>

              {/* Office Location */}
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary group-hover:border-gold-primary/40 group-hover:text-gold-bright transition-all shadow-md">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Office Location
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-gold-primary transition-colors">
                    {siteConfig.contact.address}
                  </span>
                </div>
              </a>

              {/* Availability Notice */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Enquiry Form */}
          <div className="lg:col-span-8 xl:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
