import { MapPin, Users } from "lucide-react";

import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import Seo from "../../components/common/Seo/Seo";
import StructuredData from "../../components/common/StructuredData/StructuredData";
import CtaSection from "../../features/home/sections/CtaSection";
import {
  milestones,
  serviceAreas,
  values,
  whyChooseUs,
} from "../../data/company.data";
import { aboutPage } from "../../features/about/data/about.data";
import { buildLocalBusinessSchema } from "../../utils/structuredData";

/**
 * About route screen — Clean, professional agency about page for Sri Simbha.
 *
 * Implements:
 * - Natural typography and balanced spacing without oversized odd fonts
 * - Two-column principles (Vision & Mission)
 * - Four-column milestone timeline and core values
 * - Commercial advantages and geographical footprint
 * - Full token conformance (pt-header, mt-section, zero min-h-viewport or hardcoded margins)
 */
const About = () => {
  const TeamIcon = aboutPage.team.icon || Users;

  return (
    <>
      <Seo
        title={aboutPage.metaTitle}
        description={aboutPage.intro}
        path="/about"
      />
      <StructuredData data={buildLocalBusinessSchema()} />

      <section className="relative flex flex-col items-center bg-navy-primary text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-12 sm:pb-16 pt-header">
        <div className="w-full max-w-container mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-5 sm:mb-6">
            <Breadcrumbs items={aboutPage.breadcrumbs} />
          </div>

          {/* 1. CLEAN EDITORIAL HERO WITH 3D CREST STAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-10 border-b border-white/10">
            {/* Left: Heading, Core Statement & Stats */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="text-xs font-mono font-semibold tracking-wider text-gold-primary uppercase block mb-1.5">
                ESTABLISHED 2019 • VISAKHAPATNAM
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
                About <span className="gold-gradient-text">Sri Simbha</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-6">
                {aboutPage.intro}
              </p>

              <div className="rounded-2xl border border-gold-primary/20 bg-gradient-to-r from-navy-secondary/90 to-[#071124] p-4 sm:p-5 mb-6 shadow-lg backdrop-blur-sm">
                <p className="text-xs sm:text-sm font-medium text-gold-bright italic leading-relaxed">
                  "We don't merely place advertisements. We transform physical journeys and digital touchpoints into commercial attention."
                </p>
              </div>

              {/* Compact Agency Facts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-navy-secondary/70 p-4">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-gold-primary">100+</span>
                  <span className="text-xs text-gray-400 font-medium">Prime Display Assets</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-navy-secondary/70 p-4">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-gold-primary">Est. 2019</span>
                  <span className="text-xs text-gray-400 font-medium">Visakhapatnam HQ</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story + 3D Crest Badge */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4 text-sm sm:text-base text-gray-300 font-normal leading-relaxed p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-navy-secondary/60 to-[#050c18] backdrop-blur-md shadow-xl">
              {aboutPage.story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 2. VISION AND MISSION */}
          <div className="relative z-10 mt-section w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {aboutPage.principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={principle.id}
                    className="rounded-2xl border border-white/10 bg-navy-secondary/60 p-6 sm:p-7 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-gold-primary/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        {principle.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-300 font-normal leading-relaxed">
                      {principle.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. CORE PRINCIPLES & ADVANTAGES */}
          <div className="relative z-10 mt-section w-full">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Why Brands Choose <span className="text-gold-primary">Sri Simbha</span>
              </h2>
              <p className="text-sm text-gray-300 font-normal">
                Direct media ownership, transparent terms, and complete campaign execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.id}
                    className="group rounded-2xl border border-white/10 bg-navy-secondary/60 p-5 sm:p-6 backdrop-blur-sm text-left transition-all duration-300 hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary group-hover:border-gold-primary/40 group-hover:text-gold-bright transition-colors">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                      {value.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. TEAM LEADERSHIP & SERVICE COVERAGE */}
          <div className="relative z-10 mt-section w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Leadership Desk */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-navy-secondary/60 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-primary text-gold-primary">
                    <TeamIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {aboutPage.team.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-300 font-normal leading-relaxed">
                  {aboutPage.team.body}
                </p>
              </div>

              {/* Service Areas */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-navy-secondary/60 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-center">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-primary mb-3 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>Where We Operate</span>
                </h3>
                <ul className="flex flex-wrap gap-2 mb-3">
                  {serviceAreas.map((area) => (
                    <li key={area}>
                      <span className="inline-block rounded-lg bg-navy-primary/90 border border-white/10 px-3 py-1 text-xs text-gray-200 font-mono">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400">
                  Digital marketing, web development, and ad films are delivered remotely across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Work with a team that answers"
        body="No sales desk, no ticket queue. Send us your requirements and we will tell you honestly whether advertising is the right next step for you."
      />
    </>
  );
};

export default About;
