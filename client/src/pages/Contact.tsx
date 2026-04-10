'use client';
import React from 'react';
import Contact from './ContactUs';
import FAQs from './FAQs';
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>

        <RevealOnScroll>
          <FAQs />
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  );
}