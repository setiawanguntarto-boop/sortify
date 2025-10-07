import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import heroUserImage from "@/assets/hero-sortify-user-new.jpg";
const Hero = () => {
  return <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 gradient-subtle opacity-50 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Terhubung langsung dengan Bank Sampah Anda</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ubah Sampah Jadi{" "}
              <span className="text-primary">Poin</span>, Ubah Kebiasaan Jadi{" "}
              <span className="text-primary">Dampak</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">Kontribusi Anda tercatat dengan transparan. Cek poin dan riwayat Catat kontribusi Anda otomatis lewat WhatsApp. Dapatkan poin, pantau tabungan, dan bantu lingkungan tanpa repot.daur ulang Anda kapan saja.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cek-poin">
                <Button variant="hero" size="xl" className="group">
                  Cek Poin Saya
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/whatsapp-agent">
                <Button variant="outline" size="xl" className="group">
                  <Smartphone className="w-5 h-5" />
                  Coba Agent Whatsapp
                </Button>
              </Link>
            </div>
            
            
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroUserImage} alt="Orang menggunakan Sortify di smartphone setelah memilah sampah" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
            
            
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;