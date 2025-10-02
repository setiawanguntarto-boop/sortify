import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Siap Memulai?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Bergabunglah dengan ribuan pengguna yang membuat perbedaan melalui pengelolaan sampah transparan
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" className="group">
                  Cek Poin Saya
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl">
                  Hubungi Tim
                </Button>
              </div>
              
              <div className="pt-8 border-t border-border">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a 
                        href="mailto:setiawan@naraflow.id" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        setiawan@naraflow.id
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">WhatsApp</div>
                      <a 
                        href="https://wa.me/6287731771859" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        +62 877 3177 1859
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
