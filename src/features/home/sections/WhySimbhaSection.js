import { whySimbha } from "../data/home.data";

/**
 * WhySimbhaSection — Clean, professional value propositions for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 3-column cards matching the agency design language
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const WhySimbhaSection = () => (
  <section className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden">
    {/* Subtle atmospheric ambient glow */}
    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-container w-full">
      <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3.5 backdrop-blur-md shadow-sm">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
            WHY SRI SIMBHA
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
          Built for <span className="gold-gradient-text">Commercial Dominance</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
          Strategic arterial display placement, verified footfall analytics, and direct transparent execution that turns physical views into business revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {whySimbha.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="group relative rounded-3xl border border-white/10 bg-navy-secondary/60 p-7 sm:p-8 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,184,63,0.12)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 rounded-full blur-2xl group-hover:bg-gold-primary/10 transition-all pointer-events-none" />

              <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-primary/20 bg-navy-primary text-gold-primary group-hover:border-gold-primary group-hover:scale-105 group-hover:text-gold-bright transition-all shadow-md">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="relative z-10 text-lg sm:text-xl font-extrabold text-white mb-2.5 tracking-tight group-hover:text-gold-primary transition-colors">
                {item.title}
              </h3>

              <p className="relative z-10 text-sm leading-relaxed text-gray-300 font-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhySimbhaSection;
