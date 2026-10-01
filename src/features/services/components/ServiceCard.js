import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import {
  cardVariants,
  inViewOnce,
} from "../../../components/common/motion/motionVariants";

/**
 * A single service tile on the Services grid.
 *
 * The whole tile is one link (rather than a `<Link>` wrapping a clickable
 * `<div>`), it exposes `aria-label` so the icon does not leak into the
 * accessible name, and it highlights on focus as well as hover.
 */
const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link
        to={service.path}
        aria-label={`${service.title} — learn more`}
        className="card-surface group relative block h-full overflow-hidden rounded-2xl p-6 text-center sm:p-8"
      >
        <div className="mb-5 flex justify-center">
          {/*
           * The icon disc went through two broken states.
           *
           * Original: `from-brand-300 to-orange-400` with a `text-white` glyph
           * — #fff on #fde68a is ~1.2:1, so the mark was invisible. Filling the
           * disc with saturated amber and darkening the glyph was no better
           * (brand-800 on brand-600 = 2.23:1), and six large amber discs per
           * page is the "yellow everywhere" the design is trying to avoid.
           *
           * It is now a pale brand tint with a deep amber glyph — 4.83:1, and
           * the brand reads as an accent rather than as six orange blobs.
           * Dark mode keeps the saturated disc it always had, which suits a
           * dark surface.
           */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-200 transition-transform duration-300 group-hover:scale-105 dark:from-brand-400 dark:bg-gradient-to-br dark:to-orange-500 dark:ring-white/10 sm:h-20 sm:w-20">
            {/* The bob is a CSS `transform` animation (`animate-icon-float`).
                As a framer-motion `repeat: Infinity` loop this ran one
                JavaScript style write per card per frame — six of them
                simultaneously on this page — to move a decorative icon. */}
            <span className="animate-icon-float flex">
              <Icon
                className="h-7 w-7 text-brand-700 dark:text-gray-900 sm:h-9 sm:w-9"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        {/*
         * brand-600 as a heading measured 3.19:1 — legal for large text only,
         * and `text-h3` starts at 18px, which is under the 18.66px bold
         * threshold. brand-700 (5.02:1) is the first step that clears AA at
         * every size in the scale, so it is the light-mode heading colour.
         */}
        <h2 className="mb-2 flex items-center justify-center gap-2 text-h3 font-semibold text-brand-700 dark:text-brand-400">
          {service.title}
          <ExternalLink
            className="h-5 w-5 shrink-0 text-brand-700 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-brand-400 sm:h-6 sm:w-6"
            aria-hidden="true"
          />
        </h2>

        <p className="text-body text-[color:var(--color-text-muted)] dark:text-gray-300">
          {service.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
