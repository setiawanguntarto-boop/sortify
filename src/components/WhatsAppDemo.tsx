import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppDemo = () => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Try WhatsApp Bot Demo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience how easy it is to record and track waste contributions via WhatsApp
          </p>
        </div>
        
        <div className="max-w-sm mx-auto">
          <div className="bg-gray-800 rounded-[40px] p-3 shadow-2xl">
            <div className="bg-black rounded-[32px] overflow-hidden">
              <div className="flex flex-col h-[650px]" style={{ 
                backgroundColor: '#e5ddd5',
                backgroundImage: 'url(https://i.pinimg.com/originals/85/ec/df/85ecdf1c3642145b0cae2c85ce8a95c0.jpg)',
                backgroundSize: 'cover'
              }}>
                {/* Header */}
                <header className="bg-[#075e54] text-white p-3 flex items-center shadow-md z-10 flex-shrink-0">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <svg className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Sortify Bot</h3>
                    <p className="text-xs opacity-80">online</p>
                  </div>
                </header>

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                  <div className="flex">
                    <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-white">
                      <p className="text-sm">Halo! Ketik <strong>'halo'</strong> untuk memulai.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-[#dcf8c6]">
                      <p className="text-sm">halo</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-white">
                      <p className="text-sm">
                        Halo! Selamat datang di sistem input data Sortify.
                        <br /><br />
                        <strong>Menu Petugas:</strong><br />
                        1. Input Sampah<br />
                        2. Riwayat Input<br />
                        3. Daftar User Baru
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Footer */}
                <footer className="bg-gray-100 p-2 flex items-center flex-shrink-0">
                  <div className="flex-1 bg-white rounded-full p-2 flex items-center">
                    <input 
                      type="text" 
                      className="w-full bg-transparent outline-none px-2 text-sm" 
                      placeholder="Ketik pesan..."
                      disabled
                    />
                  </div>
                  <button className="w-11 h-11 ml-2 bg-[#128c7e] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Send className="w-5 h-5" />
                  </button>
                </footer>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Try Full Demo on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppDemo;
