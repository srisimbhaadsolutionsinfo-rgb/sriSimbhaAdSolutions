import { useId, useState } from "react";
import { Plus, MessageSquare } from "lucide-react";

import StructuredData from "../../../components/common/StructuredData/StructuredData";
import { buildFaqSchema } from "../../../utils/structuredData";
import { faqs } from "../../../data/faq.data";
import { buildWhatsAppUrl } from "../../../config/site.config";
import { cx } from "../../../utils/helpers";

/**
 * FaqSection — Clean two-column FAQ section.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Sticky editorial column on the left and accessible accordion items on the right
 * - Elimination of unwanted decorative badges and heavy blur layers
 */
const FaqSection = () => {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);
  const baseId = useId();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-navy-secondary/40 text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 border-t border-white/5 overflow-hidden"
    >
      <StructuredData data={buildFaqSchema(faqs)} />

      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Quick WhatsApp Question Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-secondary/80 border border-gold-primary/30 mb-3.5 backdrop-blur-md shadow-sm">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-bright uppercase">
                FREQUENTLY ASKED
              </span>
            </div>

            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3"
            >
              Clear Answers. <span className="gold-gradient-text">Zero Guesswork.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-normal leading-relaxed mb-6">
              Everything you need to know about screen locations, pricing structure, campaign turnaround, and audience reporting.
            </p>

            <div className="rounded-3xl border border-gold-primary/20 bg-gradient-to-b from-navy-primary/90 to-navy-secondary/80 p-6 sm:p-7 backdrop-blur-md shadow-xl">
              <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
                Have a Custom Campaign Requirement?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed mb-5">
                Our media directors are available directly on WhatsApp to share custom rate cards and specific junction availability.
              </p>
              <a
                href={buildWhatsAppUrl("Hi, I have a question regarding campaign placement options.")}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn-primary w-full py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 font-bold text-navy-primary text-xs sm:text-sm shadow-lg hover:brightness-105 active:scale-[0.99] transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 text-navy-primary" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7">
            <ul className="space-y-3.5">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                const panelId = `${baseId}-${faq.id}-panel`;
                const buttonId = `${baseId}-${faq.id}-button`;

                return (
                  <li
                    key={faq.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-navy-primary/80 backdrop-blur-md transition-all duration-200 hover:border-gold-primary/30 shadow-md"
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-white hover:text-gold-primary transition-colors cursor-pointer"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all ${isOpen ? "border-gold-primary bg-gold-primary text-navy-primary" : "border-white/10 bg-navy-secondary text-gold-primary"}`}>
                          <Plus
                            className={cx(
                              "h-4 w-4 transition-transform duration-200",
                              isOpen && "rotate-45"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="px-4 pb-5 pt-0 sm:px-5 sm:pb-6 text-xs sm:text-sm text-gray-300 font-normal leading-relaxed border-t border-white/5 mt-1"
                      >
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
