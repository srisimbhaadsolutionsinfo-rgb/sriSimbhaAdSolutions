import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { fadeUp } from "../../../components/common/motion/motionVariants";
import Button from "../../../components/common/Button/Button";
import { usePrefersReducedMotion } from "../../../hooks";
import { hero } from "../data/home.data";

/**
 * Should the background video play at all?
 *
 * The clip is a 944 KB autoplaying background loop. On a metered or slow
 * connection that is a real cost for a decorative effect, and the Network
 * Information API reports exactly that case:
 *  - `saveData`  — the visitor (or their OS) has asked to reduce data usage
 *  - `2g` / `slow-2g` — the connection cannot afford it
 *
 * In every one of those cases we skip the `<video>` entirely and show the
 * gradient backdrop, which was already there and already looks deliberate.
 * The API is Chromium-only, so everywhere else the video plays as before; this
 * is strictly a downgrade path, never an upgrade dependency.
 *
 * The answer is read in an effect rather than during render so it cannot cause
 * a hydration-style mismatch, and it never flips back on once decided — a
 * connection that improves mid-visit should not start a 944 KB download
 * unannounced.
 */
const shouldSkipVideo = () => {
  if (typeof navigator === "undefined") return false;

  const connection =
    navigator.connection ??
    navigator.mozConnection ??
    navigator.webkitConnection;

  if (!connection) return false;

  if (connection.saveData === true) return true;

  const type = connection.effectiveType;
  return type === "slow-2g" || type === "2g";
};

/**
 * Home hero.
 *
 * Video handling: `muted` + `playsInline` + `autoPlay` are required for
 * autoplay to work on iOS at all; the element additionally carries
 * `preload="metadata"` and a gradient backdrop so it never blocks first paint
 * or leaves a hole while buffering. For visitors who prefer reduced motion, and
 * for anyone on a metered or 2G connection, the clip is not rendered and the
 * gradient is shown instead.
 */
const HeroSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [skipVideo, setSkipVideo] = useState(false);

  useEffect(() => {
    setSkipVideo(shouldSkipVideo());
  }, []);

  const showVideo = !prefersReducedMotion && !skipVideo;

  return (
    <section
      className="relative flex h-viewport w-full items-center justify-center overflow-hidden text-center"
      aria-label="Introduction"
    >
      <div className={`absolute inset-0 z-0 ${hero.video.fallbackClassName}`}>
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            src={hero.video.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            // The video is decoration; the text below carries the message, so
            // it must never be announced or focusable.
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : null}
        <div
          aria-hidden="true"
          /*
           * Scrim behind the hero copy.
           *
           * The background is a blurred, brightly-lit video, so its average
           * luminance changes frame to frame and cannot be relied on. The
           * original answer was to wash the *entire* frame: `bg-white/30`,
           * raised to 45% when gold title text measured ~2.2:1 through it.
           *
           * That solves the contrast but costs the photograph. At 45% white
           * plus a 6px blur the footage — the single strongest brand asset on
           * the page — was reduced to a pale grey smear, and the hero read as a
           * flat coloured panel rather than a hero.
           *
           * Two changes instead of one blunt wash:
           *  - the full-frame wash drops to 18%, so the footage keeps its
           *    colour and contrast and still sits behind the type
           *  - a soft elliptical scrim, sized to the copy column and faded at
           *    its edges, restores the contrast locally. It is positioned and
           *    blurred rather than a hard-edged box, so it is not visible as a
           *    shape.
           *
           * The two are separate elements because the scrim has to track the
           * text column, which is `max-w-3xl` and centred — not the frame.
           *
           * Dark mode is unchanged (`bg-black/55`); it had no such problem,
           * because dark type over a dimmed video was already separable.
           *
           * The wash is now slightly stronger (20% -> 26%) and the radial scrim
           * reaches further, because both were tuned when the hero ended at the
           * tagline. With the two buttons added below the copy the text block is
           * taller, and on a phone the block fills most of the width, so the old
           * 65%x58% ellipse fell away exactly where the headline sat — at 390px
           * the gradient title and the grey headline were reading against bare
           * video, which is where this was measured as unreadable.
           */
          className="absolute inset-0 bg-white/[0.26] backdrop-blur-[3px] dark:bg-black/55 dark:backdrop-blur-[6px]"
        />
        <div
          aria-hidden="true"
          /*
           * The localised scrim.
           *
           * Sized to the copy block (`70%` wide, `62%` tall) rather than to the
           * frame, and opaque at the core, so the copy always has a predictable
           * background no matter what the video is doing behind it. The fade to
           * zero at the edge is what keeps the footage visible — the guarantee
           * applies only where there is type.
           */
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_62%_at_50%_47%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.85)_40%,rgba(255,255,255,0.45)_66%,rgba(255,255,255,0)_84%)] dark:bg-none"
        />
      </div>

      <motion.div
        className="relative z-20 max-w-3xl px-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <motion.h1
          /*
           * The light-mode ramp starts at `brand-700`, not `brand-600`.
           *
           * `brand-600` (#d97706) is only ~3.1:1 against the light hero scrim,
           * and this is display-size text where the large-text threshold is 3:1 —
           * so the first word of the heading sat right on the limit, over a
           * moving background. Starting at `brand-700` (~5.0:1) keeps the same
           * amber-to-charcoal sweep but clears AA outright.
           *
           * `drop-shadow` adds separation where the video is bright and busy,
           * without the cost of another scrim layer: it follows the glyphs, so it
           * never reads as a shape behind the text the way a box does. Dark mode
           * drops it — the type there is light-on-dark and already separated.
           */
          className="bg-gradient-to-r bg-clip-text text-display font-bold text-transparent from-brand-700 via-brand-800 to-gray-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.55)] dark:from-brand-300 dark:via-brand-400 dark:to-brand-200 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {hero.title}
        </motion.h1>

        <motion.p
          className="mt-6 font-medium text-gray-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] dark:text-gray-100 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
          variants={fadeUp}
          custom={1}
        >
          <span className="block text-h1 font-bold text-gray-900 dark:text-white">
            {hero.headline}
          </span>
          {/* brand-700 rather than brand-600: on the light hero wash,
              brand-600 measured ~3.5:1 and brand-700 ~4.9:1. */}
          <span className="mt-2 block text-h2 font-bold text-brand-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] dark:text-brand-400 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            {hero.subHeadline}
          </span>
        </motion.p>

        {/*
          The two hero actions.

          `custom={2}` continues the parent's stagger (0ms headline, 60ms this
          pair) so they arrive with the copy rather than popping in after it.
          `MotionConfig reducedMotion="user"` turns the offset and the fade
          off for visitors who ask for reduced motion; the buttons still render,
          they simply arrive instantly — nothing here gates content behind an
          animation.

          Wrapped rather than spread onto the row so the row is one flex line
          that can wrap to a column on narrow screens, keeping both targets at
          least 44px tall.
        */}
        <motion.div
          className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          variants={fadeUp}
          custom={2}
        >
          <Button
            to={hero.actions.primary.to}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {hero.actions.primary.label}
          </Button>
          <Button
            to={hero.actions.secondary.to}
            variant="outline"
            size="lg"
            className="w-full border-2 border-white/70 bg-white/10 text-gray-900 backdrop-blur-sm hover:bg-white hover:text-brand-800 sm:w-auto dark:border-brand-400/60 dark:bg-transparent dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-gray-900"
          >
            {hero.actions.secondary.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
