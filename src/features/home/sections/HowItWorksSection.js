import { howItWorks } from "../data/home.data";

/**
 * HowItWorksSection — Clean, streamlined 3-step campaign onboarding.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 3-column layout matching the agency redesign
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const HowItWorksSection = () => (
  <section className="relative bg-navy-secondary/40 text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden">
    {/* Subtle atmospheric ambient glow */}
    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-container w-full">
      <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3.5 backdrop-blur-md shadow-sm">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
            DEPLOYMENT WORKFLOW
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
          From Brief to <span className="gold-gradient-text">Live Impact in 3 Steps</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
          A friction-free process engineered to get your brand message onto high-traffic screens and surfaces quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {howItWorks.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="group relative rounded-3xl border border-white/10 bg-navy-primary/80 p-7 sm:p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,184,63,0.12)] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-primary/20 bg-navy-secondary text-gold-primary group-hover:border-gold-primary group-hover:scale-105 group-hover:text-gold-bright transition-all shadow-md">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-extrabold text-gold-bright tracking-wider px-3 py-1 rounded-full bg-navy-secondary/90 border border-gold-primary/30">
                  STEP 0{index + 1}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2.5 tracking-tight group-hover:text-gold-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 font-normal">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
