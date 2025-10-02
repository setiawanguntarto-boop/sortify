import { Target, Rocket } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Tentang Sortify
            </h2>
            <p className="text-lg text-muted-foreground">
              Mendorong gaya hidup berkelanjutan melalui pengelolaan sampah yang transparan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Visi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mendorong gaya hidup berkelanjutan dengan sistem pencatatan sampah yang transparan dan menciptakan nilai bagi semua pihak.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary/10 mb-6">
                <Rocket className="w-8 h-8 text-secondary" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Misi</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Membuat pemilahan sampah lebih mudah dan terukur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Memberikan insentif bagi rumah tangga yang berpartisipasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Menyajikan data akurat untuk mitra</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
