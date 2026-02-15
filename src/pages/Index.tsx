import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import { ProjectsPreview, ContactPreview } from "@/components/HomeSections";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQs from "./FAQs";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsPreview />
      <TestimonialsSection />
      <ContactPreview />
      <FAQs/>
    </main>
  );
};

export default Index;