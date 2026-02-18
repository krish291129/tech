import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";
import FAQs from "./pages/FAQs";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import SplashScreen from "./components/SplashScreen";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AuthPopup from "./components/AuthPopup";
import Chatbot from "./components/chatbot/Chatbot";

const queryClient = new QueryClient();

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
        <BrowserRouter>
          <ParticleBackground />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <FloatingWhatsApp />
          <Chatbot />
          <AuthPopup />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
