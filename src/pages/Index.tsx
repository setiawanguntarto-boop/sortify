import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import WhatsAppDemo from "@/components/WhatsAppDemo";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <WhatsAppDemo />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
