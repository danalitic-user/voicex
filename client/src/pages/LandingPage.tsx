/**
 * ============================================================
 * LandingPage - awaz.ai Inspired Design
 * Main landing page with all sections
 * ============================================================
 */
import { SEOHead } from "@/components/landing/SEOHead";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import TaskAutomation from "@/components/landing/Automate";
import UseCases from "@/components/landing/UseCases";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { FeaturesShowcase } from "@/components/landing/FeaturesShowcase";
import IntegrationTimeline from "@/components/landing/IntegrationAnimation";
import WhyVoiceX from "@/components/landing/WhyVoicex";
import ContactPage from "@/components/landing/Contact";
import { ContactSection } from "@/components/landing/ContactSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { useBranding } from "@/components/BrandingProvider";
import { useSeoSettings } from "@/hooks/useSeoSettings";
import CoreCapabilities from "@/components/landing/CoreCapabilities";

export default function LandingPage() {
  const { branding } = useBranding();
  const { data: seoSettings } = useSeoSettings();

  const defaultKeywords = [
    "AI voice agents",
    "automated calling",
    "lead qualification",
    "AI phone agents",
    "call automation",
    "voice AI",
    "outbound calling",
    "customer service AI",
    "ElevenLabs",
    "Twilio integration"
  ];

  const seoTitle = seoSettings?.defaultTitle || "AI Voice Agents for Automated Calling";
  const seoDescription = seoSettings?.defaultDescription || branding.app_tagline || "Transform your call operations with AI-powered voice agents. Automate outbound calls, qualify leads, schedule appointments, and provide 24/7 customer support.";
  const seoKeywords = (seoSettings?.defaultKeywords && seoSettings.defaultKeywords.length > 0)
    ? seoSettings.defaultKeywords
    : defaultKeywords;
  const seoOgImage = seoSettings?.defaultOgImage || undefined;
  const seoCanonicalUrl = seoSettings?.canonicalBaseUrl || undefined;

  return (
    <div className="min-h-screen bg-navy-900" data-testid="landing-page">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={seoCanonicalUrl}
        ogImage={seoOgImage}
        ogSiteName={branding.app_name}
        keywords={seoKeywords}
        twitterSite={seoSettings?.twitterHandle || undefined}
        twitterCreator={seoSettings?.twitterHandle || undefined}
        googleVerification={seoSettings?.googleVerification || undefined}
        bingVerification={seoSettings?.bingVerification || undefined}
        facebookAppId={seoSettings?.facebookAppId || undefined}
        structuredDataOrg={seoSettings?.structuredDataOrg}
        structuredDataFaq={seoSettings?.structuredDataFaq}
        structuredDataProduct={seoSettings?.structuredDataProduct}
      />

      <Navbar />

      <main className="min-h-screen bg-white">
        <HeroSection />

        <section id="features">
          <CoreCapabilities />
        </section>

        <section id="automation">
          <TaskAutomation />
        </section>

        <section id="technology">
          <UseCases />
        </section>

        <section >
          <IntegrationTimeline />
        </section>

        <section id="integrations">
          <WhyVoiceX />
        </section>

        <section id="pricing">
          <ContactPage />
        </section>
      </main>

      <Footer />
    </div>
  );
}
