import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

const Contact = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        icon={MessageCircle}
        subtitle="Reach Out"
        title="Let's Connect"
        description="Got an idea? We'd love to hear about it. Drop us a message and let's build something great together."
        gradient="radial-gradient(ellipse at 40% 50%, hsl(340 80% 15% / 0.5), transparent 50%), radial-gradient(ellipse at 80% 30%, hsl(183 100% 15% / 0.4), transparent 50%)"
        orbColors={["hsl(340, 80%, 55%)", "hsl(183, 100%, 50%)", "hsl(260, 80%, 60%)"]}
      />

      <div className="container mx-auto px-4 py-12">
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;
