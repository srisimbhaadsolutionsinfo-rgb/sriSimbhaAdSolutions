import { motion } from "framer-motion";

import {
  fadeUp,
  inViewOnce,
} from "../../../components/common/motion/motionVariants";
import { splitTitleDetail } from "../../../utils/helpers";

/** "Key Benefits" — the data stores each benefit as "Title: detail". */
const BenefitsGrid = ({ benefits }) => {
  if (!benefits?.length) return null;

  return (
    <motion.div
      className="mt-6 w-full max-w-container px-2 sm:px-4"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUp}
    >
      <h2 className="mb-6 text-center text-h2 font-semibold text-brand-700 dark:text-brand-400">
        Key Benefits
      </h2>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {benefits.map((benefit, index) => {
          const { title, detail } = splitTitleDetail(benefit);

          return (
            <motion.li
              key={title || index}
              className="card-surface flex flex-col gap-1 rounded-xl p-5"
              variants={fadeUp}
              custom={index}
            >
              <span className="text-base font-semibold text-[color:var(--color-text)] dark:text-brand-300 sm:text-lg">
                {title}
              </span>
              {detail ? (
                <span className="text-sm font-light leading-snug text-[color:var(--color-text-muted)] dark:text-gray-300 sm:text-base">
                  {detail}
                </span>
              ) : null}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default BenefitsGrid;
