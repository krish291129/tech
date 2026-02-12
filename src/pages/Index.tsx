import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import { ProjectsPreview, ContactPreview } from "@/components/HomeSections";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsPreview />
      <TestimonialsSection />
      <ContactPreview />
    </main>
  );
};

export default Index;
