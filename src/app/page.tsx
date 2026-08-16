'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import SelectedWork from '@/components/SelectedWork';
import Toolbox from '@/components/Toolbox';
import Experience from '@/components/Experience';
import Process from '@/components/Process';
import WhyWorkWithMe from '@/components/WhyWorkWithMe';
import ProjectProof from '@/components/ProjectProof';
import Services from '@/components/Services';
import AboutMe from '@/components/AboutMe';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark noise-overlay">
      <CustomCursor />
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Introduction />
        <SelectedWork />
        <Toolbox />
        <Experience />
        <Process />
        <WhyWorkWithMe />
        <ProjectProof />
        <Services />
        <AboutMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
