import { LandingNav } from "@/components/landing/landing-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSection } from "@/components/landing/problem-section"
import { SolutionSection } from "@/components/landing/solution-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FinalCtaSection } from "@/components/landing/final-cta-section"
import { LandingFooter } from "@/components/landing/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SocialSense.vn — Hiểu rõ mạng xã hội. Đăng đúng lúc. Tăng trưởng thật sự.",
  description:
    "SocialSense phân tích dữ liệu, gợi ý nội dung, và giúp bạn ra quyết định đăng bài thông minh hơn.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <TestimonialsSection />
        <div id="pricing">
          <PricingSection />
        </div>
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
