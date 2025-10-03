import iconRecorded from "@/assets/icon-recorded.png";
import iconStored from "@/assets/icon-stored.png";
import iconVisible from "@/assets/icon-visible.png";

const steps = [
  {
    number: "01",
    title: "Dicatat",
    description: "Petugas lapangan mencatat sampah via WhatsApp",
    icon: iconRecorded,
  },
  {
    number: "02",
    title: "Tersimpan",
    description: "Data tersimpan dan poin Anda bertambah otomatis",
    icon: iconStored,
  },
  {
    number: "03",
    title: "Terlihat",
    description: "Anda bisa lihat poin dan riwayat kapan saja",
    icon: iconVisible,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Cara Kerja
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pengelolaan sampah yang sederhana, transparan, dan efisien dalam tiga langkah
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 h-full">
                <div className="mb-6">
                  <img 
                    src={step.icon} 
                    alt={step.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                
                <div className="text-6xl font-bold text-primary/30 mb-4">
                  {step.number}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
