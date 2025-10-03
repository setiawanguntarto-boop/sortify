import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
