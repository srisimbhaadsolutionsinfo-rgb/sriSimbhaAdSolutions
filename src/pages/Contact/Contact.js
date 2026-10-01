import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import DecorativeBlobs from "../../components/common/DecorativeBlobs/DecorativeBlobs";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import {
  fadeUpLarge,
  inViewOnce,
} from "../../components/common/motion/motionVariants";
import { buildLocalBusinessSchema } from "../../utils/structuredData";
import { serviceAreas } from "../../data/company.data";
import EnquiryForm from "../../features/contact/components/EnquiryForm";
import {
  contactChannels,
  contactPage,
} from "../../features/contact/data/contact.data";

/**
 * Contact route screen.
 *
 * Three channels are presented as accessible cards, followed by an enquiry form
 * that composes the message into a pre-filled WhatsApp or e-mail. There is no
 * backend, so the form deliberately posts nowhere — see `EnquiryForm` for why
 * that is a real destination rather than a stub.
 */
const Contact = () => (
  // `pt-header` for the same reason as About: the hardcoded `pt-20` (80px)
  // under-cleared the 83px fixed header at every width from 640px up, putting
  // the breadcrumb 3px behind it. This page is the only other one affected.
  <section className="relative flex min-h-viewport flex-col items-center overflow-hidden bg-[color:var(--color-surface)] px-4 pb-10 pt-header text-[color:var(--color-text)] dark:bg-surface-dark dark:text-gray-100 sm:px-6">
    <Seo
      title={contactPage.metaTitle}
      description={contactPage.intro}
      path="/contact"
    />
    <StructuredData data={buildLocalBusinessSchema()} />

    <DecorativeBlobs />

    <div className="relative z-10 w-full max-w-container">
      <Breadcrumbs items={contactPage.breadcrumbs} className="mb-8" />
    </div>

    <motion.div
      className="relative z-10 max-w-4xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUpLarge}
      custom={0}
    >
      <h1 className="mb-6 text-h1 font-bold text-brand-700 dark:text-brand-400">
        {contactPage.title}
      </h1>
      <p className="measure mx-auto text-lead font-light text-[color:var(--color-text-muted)] dark:text-gray-300">
        {contactPage.intro}
      </p>
    </motion.div>

    <motion.ul
      className="relative z-10 mt-12 grid w-full max-w-container grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUpLarge}
      custom={2}
    >
      {contactChannels.map((channel, index) => {
        const Icon = channel.icon;

        return (
          <motion.li key={channel.id} variants={fadeUpLarge} custom={index + 2}>
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="card-surface block cursor-pointer rounded-xl p-6 text-center sm:p-8"
              whileHover={{ scale: 1.02 }}
            >
              {/*
               * The disc was `from-brand-400 to-orange-500` with a `text-white`
               * glyph — the same 1.2:1 pairing that made the service-card icons
               * invisible. It now uses the pale brand tint with a `brand-700`
               * glyph (4.83:1), consistent with `ServiceCard`.
               */}
              <span className="mb-5 flex justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-200 sm:h-16 sm:w-16 dark:from-brand-400 dark:bg-gradient-to-br dark:to-orange-500 dark:ring-white/10">
                  <Icon
                    className="h-6 w-6 text-brand-700 dark:text-gray-900 sm:h-7 sm:w-7"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <h2 className="text-h3 font-semibold text-brand-700 dark:text-brand-400">
                {channel.label}
              </h2>
              <p className="mt-2 break-words text-sm font-light text-[color:var(--color-text-muted)] dark:text-gray-300 sm:text-base md:text-lg">
                {channel.value}
              </p>
            </a>
          </motion.li>
        );
      })}
    </motion.ul>

    <motion.div
      className="relative z-10 mt-16 w-full max-w-3xl px-4 sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUpLarge}
    >
      <EnquiryForm />
    </motion.div>

    <motion.div
      className="relative z-10 mt-14 w-full max-w-3xl px-4 text-center sm:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUpLarge}
    >
      <h2 className="mb-4 text-xl font-semibold text-[color:var(--color-text)] dark:text-white">
        Areas we cover
      </h2>
      <ul className="flex flex-wrap justify-center gap-2">
        {serviceAreas.map((area) => (
          <li key={area}>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              <MapPin size={13} aria-hidden="true" />
              {area}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  </section>
);

export default Contact;
