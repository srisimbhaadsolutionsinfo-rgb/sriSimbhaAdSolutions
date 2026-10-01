import { motion } from "framer-motion";

import {
  fadeUp,
  inViewOnce,
  stagger,
} from "../../../components/common/motion/motionVariants";
import { testimonials } from "../data/home.data";

/** Social proof, rendered as a real `<figure>`/`<blockquote>` pair. */
const TestimonialsSection = () => (
  <section className="bg-gradient-to-r from-white to-gray-100 section-y dark:from-slate-900 dark:to-slate-950">
    <motion.h2
      className="mb-14 text-center text-h2 font-bold text-gray-900 dark:text-brand-300 sm:text-4xl"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      What Clients Say
    </motion.h2>

    <motion.ul
      className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-2"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {testimonials.map((item, index) => (
        <motion.li
          key={item.id}
          className="rounded-2xl border border-gray-200 bg-[color:var(--color-surface)] p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)] dark:border-white/10 dark:bg-white/10"
          variants={fadeUp}
          custom={index}
        >
          <figure>
            <blockquote className="text-lg italic leading-relaxed text-gray-800 dark:text-gray-300">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-bold tracking-wide text-brand-700 dark:text-brand-400">
              — {item.name}
            </figcaption>
          </figure>
        </motion.li>
      ))}
    </motion.ul>
  </section>
);

export default TestimonialsSection;
