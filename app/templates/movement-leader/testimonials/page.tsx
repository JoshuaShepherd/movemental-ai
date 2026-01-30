"use client";

import { useState } from "react";
import {
  TestimonialsQuoteHero,
  TestimonialsSplitTweets,
  TestimonialsMasonryGrid,
  TestimonialsCarouselHero,
  TestimonialsElegantSerif,
  TestimonialsDarkBlockquote,
  TestimonialsGeometricCarousel,
  TestimonialsSplitCta,
  TestimonialsDramaticDark,
  TestimonialsImageOverlay,
  TestimonialsGridCards,
  TestimonialsInstructorDark,
  TestimonialsTrustLogos,
  TestimonialsTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { TestimonialsVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<TestimonialsVariant, React.ComponentType> = {
  "testimonials-quote-hero": TestimonialsQuoteHero,
  "testimonials-split-tweets": TestimonialsSplitTweets,
  "testimonials-masonry-grid": TestimonialsMasonryGrid,
  "testimonials-carousel-hero": TestimonialsCarouselHero,
  "testimonials-elegant-serif": TestimonialsElegantSerif,
  "testimonials-dark-blockquote": TestimonialsDarkBlockquote,
  "testimonials-geometric-carousel": TestimonialsGeometricCarousel,
  "testimonials-split-cta": TestimonialsSplitCta,
  "testimonials-dramatic-dark": TestimonialsDramaticDark,
  "testimonials-image-overlay": TestimonialsImageOverlay,
  "testimonials-grid-cards": TestimonialsGridCards,
  "testimonials-instructor-dark": TestimonialsInstructorDark,
  "testimonials-trust-logos": TestimonialsTrustLogos,
};

export default function TestimonialsTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<TestimonialsVariant>("testimonials-quote-hero");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <TestimonialsTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
