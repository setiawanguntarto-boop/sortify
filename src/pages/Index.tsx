import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatsAppDemo from "@/components/WhatsAppDemo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhatsAppDemo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
