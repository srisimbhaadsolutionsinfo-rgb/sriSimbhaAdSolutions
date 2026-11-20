import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/home.data";

/**
 * TestimonialsSection — Clean social proof cards for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Clean 2-column testimonial cards matching the agency redesign
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const TestimonialsSection = () => (
  <section className="relative bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden">
    {/* Subtle atmospheric ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-container w-full">
      <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3.5 backdrop-blur-md shadow-sm">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
            MARKET VALIDATION
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
          Trusted by <span className="gold-gradient-text">Regional Market Leaders</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed">
          Direct feedback from commercial founders and growth teams scaling with Sri Simbha advertising channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl border border-white/10 bg-navy-secondary/60 p-7 sm:p-9 backdrop-blur-md shadow-lg flex flex-col justify-between transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,184,63,0.12)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-gold-primary/5 rounded-full blur-2xl group-hover:bg-gold-primary/10 transition-all pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1.5 text-gold-bright">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-gold-primary/40 group-hover:text-gold-primary transition-colors" />
              </div>

              <figure>
                <blockquote className="text-base sm:text-lg font-normal italic leading-relaxed text-gray-200 mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-navy-primary border border-gold-primary/30 flex items-center justify-center font-bold text-gold-bright text-sm shadow-md">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm sm:text-base">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-400 block font-medium">
                      Verified Campaign Partner
                    </span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
