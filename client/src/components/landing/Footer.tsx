/**
 * ============================================================
 * © 2026 VoiceX - A Danaltic Product. All rights reserved.
 * Original Author: Danalitic Engineering Team
 * Website: https://danalitic.in
 * ============================================================
 */
import { Link } from "wouter";
import { Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";
import { useBranding } from "@/components/BrandingProvider";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const productLinks = [
  { href: "/features", label: "Features" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
];

const resourceLinks = [
  { href: "/blog", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function Footer() {
  const { branding } = useBranding();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const socialLinks = [
    branding.social_twitter_url ? { href: branding.social_twitter_url, label: "Twitter", icon: Twitter } : null,
    branding.social_linkedin_url ? { href: branding.social_linkedin_url, label: "LinkedIn", icon: Linkedin } : null,
    branding.social_github_url ? { href: branding.social_github_url, label: "GitHub", icon: Github } : null,
  ].filter((link): link is { href: string; label: string; icon: typeof Twitter } => link !== null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive our latest updates.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-100 py-16 px-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand Section */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter flex items-center">
              <span className="text-black">
                {branding.app_name?.split(' ')[0] || "Voice"}
              </span>
              <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent pr-1">
                {branding.app_name?.split(' ')[1] || "X"}
              </span>
            </h1>
          </Link>
          <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
            {branding.app_tagline || "AI Voice Calling Agents with 24/7 Automation Support"}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-black transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resource Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-black transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h4 className="font-semibold mb-4 text-gray-900">Contact</h4>
          <div className="space-y-3">
            <a
              href={`mailto:support@${branding.app_name?.toLowerCase().replace(/\s+/g, '') || 'voicex'}.com`}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              contact@voicexai.app
            </a>
            {/*<div className="flex items-start gap-2 text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>San Francisco, CA</span>
            </div>*/}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-900 text-sm">
          © {new Date().getFullYear()} {branding.app_name || "VoiceX"}. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-black">Privacy</Link>
          <Link href="/terms" className="hover:text-black">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;